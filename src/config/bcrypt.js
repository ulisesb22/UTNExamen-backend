export const bcryptConfig = Object.freeze({
  rounds: Number(process.env.BCRYPT_ROUNDS || 10),
});
