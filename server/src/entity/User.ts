import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'followers', type: 'varchar', array: true, nullable: true })
  followers: string[];
}
