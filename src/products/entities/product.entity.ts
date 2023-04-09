import { Store } from '../../stores/entities/store.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  description: string;

  @Column()
  stock: number;

  @ManyToOne(() => Store, (store) => store.products)
  store: Store;

  constructor(name: string, price: number, description: string, stock: number) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
  }
}
