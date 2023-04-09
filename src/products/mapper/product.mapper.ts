import { Injectable } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductMapper {
  dtoToEntity(dto: ProductDto): Product {
    return new Product(dto.name, dto.price, dto.description, dto.stock);
  }
}
