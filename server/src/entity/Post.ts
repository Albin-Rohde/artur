import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column({ type: 'varchar', length: '255' })
  photo_url: string;

  @Column({ type: 'varchar', length: '255' })
  description: string;

  @Column({ type: 'varchar', length: '255' })
  created_at: string;

  @Column({ type: 'varchar', length: '255', default: null })
  color: string;
}
