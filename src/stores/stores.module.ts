import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreMapper } from './mapper/store.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]), 
  ],
  controllers: [StoresController],
  providers: [StoresService, StoreMapper],
  exports: [StoresService],
})
export class StoresModule {}
