const { z } = require("zod");

const newUserZodSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { newUserZodSchema };
