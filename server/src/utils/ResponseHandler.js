export const sendResponse = (
  res,
  { status = true, code = 200, message, data = null, error = null }
) => {
  const response = {
    status: status ? "success" : "error",
    code: code,
    message: message,
  };

  if (status && data) {
    response.data = data;
  }

  if (!status && error) {
    response.error = error;
  }

  return res.status(code).json(response);
};
