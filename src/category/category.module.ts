import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { Product } from './entities';
import { ProductSchema } from './entities/product.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () =>
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          CategorySchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: Product.name,
        useFactory: () => ProductSchema,
      },
    ]),
  ],
})
export class CategoryModule {}
