import { rolRepo } from '../repositories/rolRepo.js'; export const rolService = { async all(){ return rolRepo.getAll(); } };
