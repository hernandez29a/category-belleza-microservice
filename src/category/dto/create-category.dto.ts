import { Product } from '../entities';

export class CreateCategoryDto {
  title: string;
  status: boolean;
  products: Product[];
}
