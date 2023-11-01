import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/paginationDto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    // ? Patron Repositorio
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    //? TODO hacer un procedimiento para sacar esa logica de actualizar y crear
    /*createCategoryDto.products.map((idProduct) => {
      console.log(idProduct);
      if (!isValidObjectId(idProduct)) {
        throw new BadRequestException(`the value is not a valid id`);
      }
    });*/
    createCategoryDto.status = true;
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 1 } = paginationDto;
    const pagination = (offset - 1) * limit;
    const termino = paginationDto.term;
    const regex = new RegExp(termino, 'i');

    const [total, categories] = await Promise.all([
      this.categoryModel.countDocuments(),
      this.categoryModel
        .find()
        .limit(limit)
        .skip(pagination)
        .select('-__v')
        .populate('products', 'name brand img')
        .or([{ title: regex }]),
      //.where({ name: termino.toLocaleLowerCase().trim() }),
    ]);
    const totalpages = Math.ceil((total * 1) / limit);
    const paginating = {
      before: offset - 1,
      current: offset,
      after: offset + 1,
      total,
      totalpages,
    };
    return { categories, paginating };
  }

  async findOne(id: string) {
    let category: Category;

    if (!category && isValidObjectId(id)) {
      category = await this.categoryModel
        .findById(id)
        .populate('products', 'name brand img');
    }

    if (!category) {
      throw new NotFoundException(
        `Product with id, name: ${id} it's not in the bd`,
      );
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category: Category;
    try {
      category = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        {
          new: true,
        },
      );
      return category;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    let category: Category;
    try {
      category = await this.categoryModel.findByIdAndUpdate(
        id,
        { status: false },
        {
          new: true,
        },
      );
      return category;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    console.log(error);
    //console.log(error.index, error.code, error.keyPattern);
    if (error.code === '11000') {
      throw new BadRequestException(
        `user created ${JSON.stringify(error.keyPattern)}`,
      );
    }
    //this.logger.error(error);
    throw new BadRequestException(
      `user created ${JSON.stringify(error.keyValue)}`,
    );
  }
}
