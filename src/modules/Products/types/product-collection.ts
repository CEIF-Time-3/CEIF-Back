import { IIterator } from '../../../shared/types/iterator.js';

export interface IProductCollection<T> {
  createIterator(): IIterator<T>;
}
