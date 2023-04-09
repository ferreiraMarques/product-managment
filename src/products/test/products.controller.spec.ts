import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { ProductDto } from '../dto/product.dto';
import { ProductMapper } from '../mapper/product.mapper';

jest.mock('../products.service.ts');

let controller: ProductsController;
let productsService: ProductsService;

describe('ProductsController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ProductMapper],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return the newly created product', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };
      const createdProduct = { id: 1, ...productDto };
      const result = await controller.create(productDto);

      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          name: 'test',
          price: 10,
          description: 'descripcion',
          stock: 1,
          storeId: 1,
          id: 1,
        },
        {
          name: 'test 1',
          price: 10,
          description: 'descripcion 1',
          stock: 1,
          storeId: 1,
          id: 2,
        },
      ];

      const result = await controller.findAll();

      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product with the specified id', async () => {
      const product = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
        id: 1,
      };

      const result = await controller.findOne('1');

      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should return the updated product', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };
      const updatedProduct = { id: 1, ...productDto };

      const result = await controller.update('1', productDto);

      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should return undefined when the product is deleted', async () => {
      const result = await controller.remove('1');

      expect(result).toBeUndefined();
    });
  });
});
