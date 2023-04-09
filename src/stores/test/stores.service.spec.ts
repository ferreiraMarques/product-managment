import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StoresService } from '../stores.service';
import { StoreMapper } from '../mapper/store.mapper';
import { StoreDto } from '../dto/store.dto';
import { TypeOrmSQLITETestingModule } from '../../../test/helpers/typeorm-sqlite';

describe('StoresService', () => {
  let storesService: StoresService;
  let storeMapper: StoreMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresService, StoreMapper],
      imports: [...TypeOrmSQLITETestingModule()],
    }).compile();

    storesService = module.get<StoresService>(StoresService);
    storeMapper = module.get<StoreMapper>(StoreMapper);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call repository.save with the StoreDto and return the created store', async () => {
      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const createdStore = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
        id: 1,
      };

      const result = await storesService.create(storeDto);
      expect(result).toEqual(createdStore);
    });
  });

  describe('findAll', () => {
    it('should call repository.find and return an array of stores', async () => {
      const stores = [
        {
          id: 1,
          name: 'test local',
          address: 'direccion local test',
          phone: '+584126029910',
        },
        {
          id: 2,
          name: 'test local 1',
          address: 'direccion local test 1',
          phone: '+584126029914',
        },
      ];

      await storesService.create({
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      });

      await storesService.create({
        name: 'test local 1',
        address: 'direccion local test 1',
        phone: '+584126029914',
      });

      const result = await storesService.findAll();
      expect(result).toEqual(stores);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne with the id and return the store with products', async () => {
      const store = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
        id: 1,
        products: [],
      };

      await storesService.create({
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      });

      const result = await storesService.findOne(1);

      expect(result).toEqual(store);
    });

    it('should throw NotFoundException if the store is not found', async () => {
      await expect(storesService.findOne(100)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should call findOne, storeMapper.dtoToEntity, repository.update, and findOne again, and return the updated store', async () => {
      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const store = {
        name: 'test local 5',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      await storesService.create(storeDto);

      const updatedStore = store;

      const result = await storesService.update(1, updatedStore);

      expect(result.id).toEqual(1);
      expect(result.name).toEqual('test local 5');
    });
  });

  describe('remove', () => {
    it('should call repository.delete with the id', async () => {
      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      await storesService.create(storeDto);

      const response = await storesService.remove(1);

      expect(response).toEqual(undefined);
    });

    it('should throw NotFoundException if the store is not found', async () => {
      await expect(storesService.update(1, {} as StoreDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
