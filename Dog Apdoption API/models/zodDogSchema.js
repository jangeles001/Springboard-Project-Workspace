const { z } = require("zod");

const newDogZodSchema = z.object({
  name: z.string().min(1, "First name is required"),
  description: z.string().min(1, "Last name is required"),
});

module.exports = { newDogZodSchema };
