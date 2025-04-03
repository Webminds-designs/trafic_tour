// middlewares/errorHandler.js
const generateErrorCode = () => `ERR-${Date.now()}`;

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`); // Log detailed error on the server

  res.status(err.status || 500).json({
    success: false,
    message: "An unexpected error occurred. Please try again later.", // Generic message for the client
    errorCode: generateErrorCode(), // Unique error reference
  });
};
