import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import ProductEntity from "./product.entity";

@Entity()
class ProductPictures {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    url!: string

    @Column()
    productId!: number

    @ManyToOne(() => ProductEntity, (product) => product.pictures)
    product!: ProductEntity
}

export default ProductPictures