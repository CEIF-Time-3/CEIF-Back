// src/address/domain/utils/cep.util.ts
export class CepUtils {
  static sanitize(cep: string): string {
    if (!cep) return '';
    return cep.replace(/\D/g, '');
  }

  static isValid(cep: string): boolean {
    const cleanCep = this.sanitize(cep);

    return /^\d{8}$/.test(cleanCep);
  }
}