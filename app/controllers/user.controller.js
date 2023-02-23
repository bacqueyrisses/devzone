import db from "../models/index.datamapper.js";

const userController = {
  getAll: async function (request, response, next) {
    try {
      const users = await db.user.getAll();
      response.json(users);
    } catch (error) {
      next(error);
    }
  },

  get: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await db.user.get(id);
      response.json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async function (request, response, next) {
    const { id } = request.params;
    const { email, password, username } = request.body;

    const user = db.user.get(id);
    if (!user) return next(new Error("404"));

    if (email) user.email = email;
    if (password) user.password = password;

    try {
      const user = await db.user.create(user);

      response.json({ user });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (request, response, next) {
    const { id } = request.params;

    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      response.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;