import express from "express";
import { avatarController as avatar } from "../controllers/index.controller.js";
import { validateAvatar as validate } from "../middlewares/validators/index.validator.js";
import {
  auth,
  imageUpload as upload,
} from "../middlewares/index.middleware.js";

const router = express.Router();

// POST Routes
router.post(
  "/avatar/user/:id",
  auth,
  validate,
  upload.single("avatar"),
  avatar.upload
);

// PATCH Routes
router.patch(
  "/avatar/user/:id",
  auth,
  validate,
  upload.single("avatar"),
  avatar.update
);

// DELETE Routes
router.delete("/avatar/user/:id", auth, validate, avatar.delete);

export default router;
