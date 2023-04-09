import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from 'src/stores/stores.module';
import { ProductMapper } from './mapper/product.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    StoresModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductMapper]
})
export class ProductsModule {}
