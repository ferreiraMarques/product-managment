import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { StoresService } from '../stores/stores.service';
import { ProductMapper } from './mapper/product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly storeService: StoresService,
    private readonly productMapper: ProductMapper,
  ) {}

  async create(dto: ProductDto) {
    const { storeId } = dto;

    const store = await this.storeService.findOne(storeId);
    const product = await this.productsRepository.save(dto);

    await this.storeService.addProduct(product, store);

    return product;
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (product === null) throw new NotFoundException("Product Not Found");

    return product;
  }

  async update(id: number, dto: ProductDto) {
    await this.findOne(id);

    const store = await this.storeService.findOne(dto.storeId);
    const productDto = this.productMapper.dtoToEntity(dto);
    productDto.id = id;
    productDto.store = store;

    await this.productsRepository.update(id, productDto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.productsRepository.delete(id);
  }
}
