import { sendResponse } from "../utils/ResponseHandler.js";

export const ValidateChapter = (schema) => {
  return async (req, res, next) => {
    try {
      const validationContext = { method: req.method };
      if (schema.params) {
        await schema.params.validateAsync(req.params, {
          context: validationContext,
        });
      }
      if (schema.query) {
        await schema.query.validateAsync(req.query, {
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
      const fieldName = error.details[0]?.context?.key || "";
      const errorMessage = fieldName
        ? `Validation failed. "${fieldName}" is required`
        : "Validation failed";
      return sendResponse(res, {
        status: false,
        code: 400,
        message: errorMessage,
      });
    }
  };
};
