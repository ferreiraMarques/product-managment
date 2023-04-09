import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { Store } from './stores/entities/store.entity';
import { Product } from './products/entities/product.entity';
import { StoresController } from './stores/stores.controller';
import { ProductsController } from './products/products.controller';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: "mysql://d528sbzt3wx0xtnlb2z8:pscale_pw_oaD2rj93KUkjltmzCo4cbPYJmeuTRNTlJ4UVaffC4Ln@aws.connect.psdb.cloud/araza?ssl={rejectUnauthorized:true}",
      entities: [User, Store, Product],
      synchronize: false,
      logging: false,
      ssl: { rejectUnauthorized: true },
    }),
    StoresModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(StoresController, ProductsController);
  }
}
