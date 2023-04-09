import { Test, TestingModule } from '@nestjs/testing';
import { ProductMapper } from '../mapper/product.mapper';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';

describe('ProductMapper', () => {
  let productMapper: ProductMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMapper],
    }).compile();

    productMapper = module.get<ProductMapper>(ProductMapper);
  });

  describe('dtoToEntity', () => {
    it('should return a Store entity with the same properties as the StoreDto', () => {
      const dto: ProductDto = {
        name: 'Test Store',
        description: 'Description',
        price: 10,
        stock: 5,
        storeId: 1,
      };
      const expectedProduct: Product = new Product(
        dto.name,
        dto.price,
        dto.description,
        dto.stock,
      );

      const result = productMapper.dtoToEntity(dto);

      expect(result).toEqual(expectedProduct);
    });
  });
});
