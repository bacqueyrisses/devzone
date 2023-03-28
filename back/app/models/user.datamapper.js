import { client } from "../services/index.service.js";

const userDatamapper = {
  getAll: async function () {
    const sql = `SELECT u.id, u.email, u.firstname, u.lastname, u.username, u.active, u.website, u."githubUsername", A.url as avatar,
    t.id as toolId, t.name as toolName, t.description as toolDescription, t.icon as toolIcon, t."order" as toolOrder, 
    t.link as toolLink, t."categoryId" as toolCategoryId FROM "User" u LEFT JOIN "ToolsOnUsers" tou ON tou."userId" = u.id 
    LEFT JOIN "Tool" t ON t.id = tou."toolId" LEFT JOIN "Avatar" A on U.id = A."userId"; `;

    const results = await client.query(sql);
    return results.rows;
  },

  get: async function (id) {
    const sql = `SELECT U.*, A.url as avatar FROM "User" U
    LEFT JOIN "Avatar" A on U.id = A."userId"
    WHERE U.id = $1`;

    const result = await client.query(sql, [id]);
    return result.rows[0];
  },

  getBy: async function ({ email, username, firstname, lastname }) {
    const sql = `SELECT * FROM "User" WHERE email = $1 OR username = $2 OR firstname = $3 OR lastname = $4`;
    const values = [email, username, firstname, lastname];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  create: async function ({
    email,
    password,
    firstname,
    lastname,
    username,
    active,
    type,
    githubUsername,
  }) {
    const sql = `INSERT INTO "User" (email, firstname, lastname, username, password, active, type, "githubUsername") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email`;
    const values = [
      email,
      firstname,
      lastname,
      username,
      password,
      active,
      type,
      githubUsername,
    ];
    const result = await client.query(sql, values);
    return result.rows[0];
  },

  checkPassword: async function ({
    username = null,
    email = null,
    password = null,
  }) {
    const sql = `SELECT * FROM "User" WHERE username = $1 OR email = $2 AND password = $3`;
    const values = [username, email, password];

    const result = await client.query(sql, values);
    return result.rows[0];
  },

  update: async function (
    {
      email,
      password,
      firstname,
      lastname,
      username,
      active,
      website,
      type,
      githubUsername,
    },
    id
  ) {
    const sql = `UPDATE "User" SET email = $1, password = $2, firstname = $3, lastname = $4, username = $5, active = $6, website = $7, type = $8, "githubUsername" = $9 WHERE id = $10`;
    const values = [
      email,
      password,
      firstname,
      lastname,
      username,
      active,
      website,
      type,
      githubUsername,
      id,
    ];

    const result = await client.query(sql, values);
    return result.rowCount;
  },

  updateTool: async function ({ userId, toolId }) {
    const sql = `INSERT INTO public."ToolsOnUsers" ("userId", "toolId") VALUES ($1, $2);
    `;
    const values = [userId, toolId];
    const result = await client.query(sql, values);
    return result.rows[0];
  },

  delete: async function (id) {
    const sql = `DELETE FROM "User" WHERE id = $1`;
    const values = [id];

    const result = await client.query(sql, values);
    return result.rowCount;
  },
};

export default userDatamapper;
