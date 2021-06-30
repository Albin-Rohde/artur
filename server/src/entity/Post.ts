import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column({ type: 'varchar', length: '255', default: null })
  color: string;
  @Column({ name: 'photo_url', type: 'varchar', length: '255' })
  photo_url: string;

  @Column({ name: 'description', type: 'varchar', length: '255' })
  description: string;

  @Column({ name: 'created_at', type: 'varchar', length: '255' })
  createdAt: string;

  @Column({ type: 'int', default: 0 })
  likes: number;

  // NÄr marcus är klar med ai är de bara att ta bort komentaren under, så kan vi sortera efter färg
  //   @Column({ type: 'varchar', length: '255', default: null })
  //   color: string;
}
