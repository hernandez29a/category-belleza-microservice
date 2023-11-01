import { Controller, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryMSG } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/paginationDto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern(CategoryMSG.CREATE)
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @MessagePattern(CategoryMSG.FIND_ALL)
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @MessagePattern(CategoryMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.categoryService.findOne(id);
  }

  @MessagePattern(CategoryMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.categoryService.update(payload.id, payload.updateCategoryDto);
  }

  @MessagePattern(CategoryMSG.DELETE)
  remove(@Payload() id: string) {
    return this.categoryService.remove(id);
  }

  // TODO agregar productos a una categoria especifica
  @MessagePattern(CategoryMSG.ADD_PRODUCT)
  addProduct(@Payload() id: string, products: string[]) {
    return { id, products };
  }
}
