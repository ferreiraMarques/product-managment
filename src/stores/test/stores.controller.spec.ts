import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from '../stores.controller';
import { StoresService } from '../stores.service';
import { Store } from '../entities/store.entity';
import { StoreDto } from '../dto/store.dto';
import { StoreMapper } from '../mapper/store.mapper';

jest.mock('../stores.service.ts');

let storesController: StoresController;
let storesService: StoresService;

describe('StoresController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [StoresService, StoreMapper],
    }).compile();

    storesController = module.get<StoresController>(StoresController);
    storesService = module.get<StoresService>(StoresService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call storesService.create and return the created store', async () => {
      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const createdStore: Store = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
        id: 1,
        products: null,
      };

      const result = await storesController.create(storeDto);

      expect(storesService.create).toHaveBeenCalledWith(storeDto);
      expect(result).toEqual(createdStore);
    });
  });

  describe('findAll', () => {
    it('should call storesService.findAll and return an array of stores', async () => {
      const stores = [
        {
          name: 'test local',
          address: 'direccion local test',
          phone: '+584126029910',
          id: 1,
          products: null,
        },
        {
          name: 'test local',
          address: 'direccion local test',
          phone: '+584126029910',
          id: 2,
          products: null,
        },
      ];

      const result = await storesController.findAll();

      expect(storesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(stores);
    });
  });

  describe('findOne', () => {
    it('should call storesService.findOne and return the specified store', async () => {
      const store = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
        id: 1,
        products: null,
      };

      const result = await storesController.findOne('1');

      expect(storesService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(store);
    });
  });

  describe('update', () => {
    it('should call storesService.update and return the updated store', async () => {
      const storeDto: StoreDto = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
      };

      const updatedStore = {
        name: 'test local',
        address: 'direccion local test',
        phone: '+584126029910',
        id: 1,
        products: null,
      };

      const result = await storesController.update('1', storeDto);

      expect(storesService.update).toHaveBeenCalledWith(1, storeDto);
      expect(result).toEqual(updatedStore);
    });
  });

  describe('remove', () => {
    it('should call storesService.remove and return the removed store', async () => {
      const result = await storesController.remove('1');

      expect(storesService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(undefined);
    });
  });
});
