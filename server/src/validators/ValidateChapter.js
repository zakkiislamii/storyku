export const ValidateChapter = (schema) => {
  return async (req, res, next) => {
    try {
      const validationContext = { method: req.method };

      if (schema.params) {
        await schema.params.validateAsync(req.params, {
          context: validationContext,
        });
      }

      if (schema.body && ["POST", "PUT"].includes(req.method)) {
        await schema.body.validateAsync(req.body, {
          context: validationContext,
          stripUnknown: true,
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: error.details.map((detail) => detail.message),
      });
    }
  };
};
