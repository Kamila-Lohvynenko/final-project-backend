export const notFoundMiddleware = (req, res) => {
  res.status(404).send({ status: 404, message: 'Route not found' });
};
