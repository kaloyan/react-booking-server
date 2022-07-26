// Error handler middleware

const err = (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    seccess: false,
    message: message,
    status: status,
    stack: err.stack,
  });
};

exports.err = err;
