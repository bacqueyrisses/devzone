import db from "../models/index.datamapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import config from "../config/token.config.js";
import { Error409 } from "../utils/errors/index.util.js";
import { transporter } from "../services/index.service.js";
import axios from "axios";

const authController = {
  signup: async function (request, response, next) {
    const wannabeUser = request.body;
    wannabeUser.active = false;
    wannabeUser.type = "server";

    try {
      // Check if username/email already exists
      const checkUser = await db.user.getBy({
        username: wannabeUser.username?.toLowerCase(),
        email: wannabeUser.email?.toLowerCase(),
      });

      if (checkUser?.email === wannabeUser?.email)
        return next(new Error409("This email is already in use."));
      if (checkUser?.username === wannabeUser?.username)
        return next(new Error409("This username is already in use."));

      // Hash user password
      wannabeUser.password = await bcrypt.hash(wannabeUser.password, 12);
      delete wannabeUser.confirmedPassword;
      console.log(wannabeUser);
      // Create new user
      let newUser;
      try {
        newUser = await db.user.create(wannabeUser);
        if (!newUser) return next(new Error("User creation failed."));
      } catch (error) {
        console.log(error);
        next(error);
      }

      // Create Token & Send email confirmation
      const emailToken = String(crypto.randomUUID());
      await db.token.createEmail({ userId: newUser.id, emailToken });

      const link = `http:/${request.get(
        "host"
      )}/email/verify?token=${emailToken}`;
      const mailData = {
        from: "devzoneapplication@gmail.com",
        to: newUser.email,
        subject: "Welcome to DevZone!",
        html: `<b>Hey there! Click on this <a href='${link}'>link</a> to confirm your email.</b>`,
      };

      try {
        await transporter.sendMail(mailData);
      } catch (error) {
        error.message = "Registered successfully but email couldn't be sent.";
        error.type = "nodemailer";
        return next(error);
      }

      response.status(201).json("Registration and email sent successfully.");
    } catch (error) {
      next(error);
    }
  },

  login: async function (request, response, next) {
    const { username, email, password } = request.body;
    try {
      // Check if user exists
      const user = await db.user.getBy({
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
      });

      if (!user) return next("Your email/username or password is not correct.");
      if (!user.password)
        return next("Your email/username or password is not correct.");

      // Check if password is correct
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return next("Your email/username or password is not correct.");

      // Check if credentials are valid
      const checkUser = await db.user.checkPassword({
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
        password: user.password,
      });
      if (!checkUser)
        return next("Your email/username or password is not correct.");
      if (!checkUser.active) return next("Please confirm your email.");

      // Create JWT Token
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        config.accessToken.secret,
        {
          algorithm: config.accessToken.algorithm,
          expiresIn: config.accessToken.expiresIn || 1000,
          subject: user.id.toString(),
        }
      );

      // Create JWT Refresh Token
      const refreshToken = crypto.randomBytes(128).toString("base64");

      await db.token.createRefresh({
        userId: user.id,
        jwtRefreshToken: refreshToken,
        expiration: Date.now() + config.refreshToken.expiresIn,
      });

      // Send JTW Token, RefreshToken and user to client
      delete user.password;
      return response.json({
        token: {
          accessToken,
          tokenType: config.accessToken.type,
          accessTokenExpiresIn: config.accessToken.expiresIn,
          refreshToken,
          refreshTokenExpiresIn: config.refreshToken.expiresIn,
        },
        user: user,
      });
    } catch (error) {
      return next();
    }
  },

  github: async function (request, response, next) {
    const { code, redirectUri } = request.body;
    const githubTokenBaseUrl = "https://github.com/login/oauth/access_token";
    const githubGetTokenUrl = `${githubTokenBaseUrl}?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.GITHUB_OAUTH_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectUri}`;

    try {
      const getTokenResponse = await axios.post(githubGetTokenUrl, null, {
        headers: {
          Accept: "application/json",
        },
      });

      const { access_token: githubToken } = getTokenResponse.data;

      if (!githubToken) return next("auhtGithub: No githubToken");

      const getUserResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      });
      const {
        login: username,
        name: firstname,
        avatar_url: avatar,
      } = getUserResponse.data;

      if (!username) return next("auhtGithub: No username found");

      const getUserEmailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
          },
        }
      );
      const { email } = getUserEmailResponse.data.find((data) => data.primary);

      if (!email) return next("auhtGithub: No email found");

      const registeredUser = await db.user.getBy({ email });

      const user = {
        type: "github",
        active: true,
        githubUsername: username,
        username,
        firstname,
        email,
      };

      const usernameTaken = await db.user.getBy({ username });

      if (registeredUser) {
        try {
          if (usernameTaken) user.username = registeredUser.username;

          const { id: userId } = registeredUser;

          await db.user.update(user, userId);

          const userHasAvatar = await db.avatar.getBy({ userId });

          userHasAvatar
            ? await db.avatar.updateExternal(avatar, userId)
            : await db.avatar.createExternal(avatar, userId);

          const registeredUserTokens = await db.token.getToken(userId);

          const updatedRegisteredUser = await db.user.get(userId);

          return response.json({
            ...updatedRegisteredUser,
            githubToken,
            refreshToken: registeredUserTokens.jwtRefreshToken,
          });
        } catch (error) {
          return next(error);
        }
      }

      try {
        if (usernameTaken)
          user.username = `${username}_${crypto.randomInt(10000, 99999)}`;

        const { id: userId } = await db.user.create(user);

        await db.avatar.createExternal(avatar, userId);

        const accessToken = jwt.sign(
          { id: userId, username: user.username },
          config.accessToken.secret,
          {
            algorithm: config.accessToken.algorithm,
            expiresIn: config.accessToken.expiresIn || 1000,
            subject: userId.toString(),
          }
        );

        const refreshToken = crypto.randomBytes(128).toString("base64");

        await db.token.createRefreshExternal({
          userId,
          jwtRefreshToken: refreshToken,
          expiration: Date.now() + config.refreshToken.expiresIn,
        });

        const newRegisteredUser = await db.user.get(userId);

        return response.json({
          ...newRegisteredUser,
          githubToken,
          accessToken,
          refreshToken,
        });
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      error.message = "Couldn't authentificate with Github";
      return next(error);
    }
  },
};

export default authController;
