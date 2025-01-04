export const sendResponse = (
  res,
  { status = 200, success = true, message, data = null, error = null }
) => {
  return res.status(status).json({
    status: success ? "success" : "error",
    message,
    ...(data && { data }),
    ...(error && { error }),
  });
};
