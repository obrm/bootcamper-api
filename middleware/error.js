import ErrorResponse from './../utils/errorResponse.js';

const errorHandler = (error, req, res, next) => {
  let err = { ...error };

  err.message = error.message;

  console.log(error.stack.red);

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `Resource with id that ends with '${error.value.slice(-6)}' was not found`;
    err = new ErrorResponse(message, 404);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;