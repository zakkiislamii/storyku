export function validateApiKey(req, res, next) {
  if (req.headers["x-api-key"] !== process.env.API_KEY) {
    res.status(401).json({
      success: false,
      message: "Invalid API Key ",
    });
    return;
  }
  next();
}
