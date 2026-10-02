export interface IProductDTO {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  description: string | null;
  available: boolean;
  ingredients: string | null;
}
