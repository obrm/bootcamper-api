// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      // Convert the 30 days in the config t0 30 days in milliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Send secure cookie in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // It's up to the client-side to decide how to handle the token
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

export default sendTokenResponse;