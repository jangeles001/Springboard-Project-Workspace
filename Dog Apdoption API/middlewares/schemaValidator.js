const { z, ZodError } = require("zod");

function validate(schema) {
  return (req, res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((e) => e.message),
        });
      }

      // fallback for unexpected errors
      return res.status(500).json({
        error: "Server error",
        details: error.message,
      });
    }
  };
}

module.exports = validate;
