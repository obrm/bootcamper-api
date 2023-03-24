import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (error, req, res, next) => {
  let err = { ...error };

  err.message = error.message;

  console.log(error.stack.red);

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `Resource with id that ends with '${error.value.slice(-6)}' was not found`;
    err = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const field_value = err.message.match(/key:\s*\{(?:.*\s*)?"(.*)"/i)[1];
    const message = `Duplicate key entered: ${field_value}`;
    err = new ErrorResponse(message, 400);
  }  

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    err = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;