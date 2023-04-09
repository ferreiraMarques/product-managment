import { Test, TestingModule } from '@nestjs/testing';
import { StoreDto } from '../dto/store.dto';
import { Store } from '../entities/store.entity';
import { StoreMapper } from '../mapper/store.mapper';

describe('StoreMapper', () => {
  let storeMapper: StoreMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreMapper],
    }).compile();

    storeMapper = module.get<StoreMapper>(StoreMapper);
  });

  describe('dtoToEntity', () => {
    it('should return a Store entity with the same properties as the StoreDto', () => {
      const storeDto: StoreDto = {
        name: 'Test Store',
        address: '123 Test St',
        phone: '123-456-7890',
      };
      const expectedStore: Store = new Store(
        storeDto.name,
        storeDto.address,
        storeDto.phone,
      );

      const result = storeMapper.dtoToEntity(storeDto);

      expect(result).toEqual(expectedStore);
    });
  });
});
