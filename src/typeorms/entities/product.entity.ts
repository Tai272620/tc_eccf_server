import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import ProductPicturesEntity from "./productPicture.entity";

@Entity()
class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    name!: string

    @OneToMany(() => ProductPicturesEntity, (picture) => picture.product)
    pictures!: ProductPicturesEntity[]
}

export default Products