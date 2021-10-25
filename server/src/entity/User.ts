import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', type: 'varchar', length: '255' })
  name: string;

  @Column({ name: 'user_email', type: 'varchar', length: '255' })
  email: string;

  @Column({ name: 'user_password', type: 'varchar', length: '255' })
  password: string;

  @Column({ name: 'user_bio', type: 'varchar', length: '255', nullable: true })
  bio: string;

  @Column({ name: 'followers', type: 'varchar', array: true, nullable: true })
  followers: string[];

  @OneToMany(
    type => Post,
    post => post.user,
    {
      cascade: true,
      lazy: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  posts: Promise<Post[]>;
}
