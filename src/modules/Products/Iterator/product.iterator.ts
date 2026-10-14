import { IIterator } from '../../../shared/types/iterator.js';
import { IProductDTO } from '../DTO/product-dto.js';

export class ProductIterator implements IIterator<IProductDTO> {
  private collection: IProductDTO[];
  private position: number = 0;

  constructor(collection: IProductDTO[]) {
    this.collection = collection;
  }

  hasNext(): boolean {
    return this.position < this.collection.length;
  }

  next(): IProductDTO {
    const product = this.collection[this.position];
    this.position += 1;
    return product;
  }
}
