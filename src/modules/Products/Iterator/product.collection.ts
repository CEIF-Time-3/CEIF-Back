import { IIterator } from '../../../shared/types/iterator.js';
import { IProductDTO } from '../DTO/product-dto.js';
import { IProductCollection } from '../types/product-collection.js';
import { ProductIterator } from './product.iterator.js';

export class ProductCollection implements IProductCollection<IProductDTO> {
  private items: IProductDTO[] = [];

  constructor(items: IProductDTO[]) {
    this.items = items;
  }

  createIterator(): IIterator<IProductDTO> {
    return new ProductIterator(this.items);
  }
}
