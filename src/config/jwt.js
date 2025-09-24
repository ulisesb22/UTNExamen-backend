export const jwtConfig = Object.freeze({
  secret: process.env.JWT_SECRET || 'dev-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
});
