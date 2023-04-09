import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { StoreMapper } from './mapper/store.mapper';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private productsRepository: Repository<Store>,
    private storeMapper: StoreMapper,
  ) {}

  async create(dto: StoreDto): Promise<Store> {
    try {
      return await this.productsRepository.save(dto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Company already registered');
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      relations: ['products'],
      where: {
        id,
      },
    });

    if (product === null) throw new NotFoundException('Store Not Found');

    return product;
  }

  async update(id: number, dto: StoreDto) {
    await this.findOne(id);

    const storeDto = await this.storeMapper.dtoToEntity(dto);
    storeDto.id = id;

    try {
      await this.productsRepository.update(id, storeDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          'Data entered is already registered with another company',
        );
      }

      throw new InternalServerErrorException();
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productsRepository.delete(id);
  }

  async addProduct(product: Product, store: Store) {
    if (!store.products) {
      store.products = [product];
    } else {
      store.products.push(product);
    }

    await this.productsRepository.save(store);
  }
}
