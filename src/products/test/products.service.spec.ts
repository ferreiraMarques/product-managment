import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from '../../stores/stores.service';
import { ProductMapper } from '../mapper/product.mapper';
import { ProductsService } from '../products.service';
import { ProductDto } from '../dto/product.dto';
import { TypeOrmSQLITETestingModule } from '../../../test/helpers/typeorm-sqlite';
import { StoreMapper } from '../../stores/mapper/store.mapper';
import { StoreDto } from '../../stores/dto/store.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let storesService: StoresService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ProductsService, StoresService, ProductMapper, StoreMapper],
      imports: [...TypeOrmSQLITETestingModule()],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    storesService = module.get<StoresService>(StoresService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new product and associate it with a store', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };

      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      await storesService.create(storeDto);

      const result = await service.create(productDto);

      expect(result).toEqual({ id: 1, ...productDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };

      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      await storesService.create(storeDto);

      await service.create(productDto);

      const result = await service.findAll();

      expect(result).toBeInstanceOf(Array);
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

      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };

      await storesService.create(storeDto);
      await service.create(productDto);

      const result = await service.findOne(1);

      expect(result.id).toEqual(product.id);
      expect(result.name).toEqual(product.name);
    });
  });

  describe('update', () => {
    it('should update an existing product and return the updated product', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };

      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const saveStore = await storesService.create(storeDto);

      await service.create(productDto);

      const product = { id: 1, ...productDto, saveStore };

      const result = await service.update(1, productDto);

      expect(result.id).toEqual(product.id);
    });
  });

  describe('remove', () => {
    it('should remove an existing product', async () => {
      const productDto: ProductDto = {
        name: 'test',
        price: 10,
        description: 'descripcion',
        stock: 1,
        storeId: 1,
      };

      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const saveStore = await storesService.create(storeDto);

      await service.create(productDto);

      const result = await service.remove(1);

      expect(result).toBeUndefined();
    });
  });
});
