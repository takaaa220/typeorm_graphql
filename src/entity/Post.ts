import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(
    _type => User,
    user => user.posts,
    {
      nullable: false,
    }
  )
  user: User;

  @ManyToMany(
    _type => Tag,
    tag => tag.posts
  )
  @JoinTable()
  tags: Tag[];
}
