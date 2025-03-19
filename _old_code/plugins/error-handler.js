export default ({ app, error }) => {
  app.nuxt.error = (err) => {
    const statusCode = err.statusCode || (err.response && err.response.status) || 500;
    if (statusCode === 500) {
      return true;
    }
    return error(err);
  };
};
