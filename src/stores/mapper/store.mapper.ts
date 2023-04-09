import { Injectable } from '@nestjs/common';
import { StoreDto } from '../dto/store.dto';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreMapper {
  dtoToEntity(dto: StoreDto): Store {
    return new Store(dto.name, dto.address, dto.phone);
  }
}
