import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    // We can access the token from the header with req.headers.authorization
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Format it - remove Bearer from string - turn into array and return the second index
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    // 401 - not authorized
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
