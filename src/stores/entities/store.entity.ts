import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  address: string;

  @Column({
    unique: true
  })
  phone: string;

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  constructor(name: string, address: string, phone: string) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}
