import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { Product } from '../../src/products/entities/product.entity';
import { Store } from '../../src/stores/entities/store.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    name: 'default',
    database: ':memory:',
    dropSchema: true,
    entities: [User, Product, Store],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User, Product, Store]),
];

export class Seed2617378125500 implements MigrationInterface {
  name = 'Seed2617378125500';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        email: 'johndoe@example.com',
        password: await bcrypt.hash('password', 10),
        username: 'johndoe',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE users`);
  }
}
