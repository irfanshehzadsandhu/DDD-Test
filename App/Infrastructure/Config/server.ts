export default {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
