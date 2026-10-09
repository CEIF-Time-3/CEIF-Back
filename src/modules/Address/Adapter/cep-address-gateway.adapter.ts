
export interface ExternalAddressEntity {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export abstract class AddressGateway {
  abstract findByCep(cleanCep: string): Promise<ExternalAddressEntity | null>;
}