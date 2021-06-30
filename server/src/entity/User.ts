import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: '255' })
  user_name: string;

  @Column({ type: 'varchar', length: '255' })
  user_email: string;

  @Column({ type: 'varchar', length: '255' })
  user_password: string;

}
