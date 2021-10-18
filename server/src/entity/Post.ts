import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: '255', default: null })
  title: string;

  @Column({ name: 'photo_url', type: 'varchar', length: '255' })
  photoUrl: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'created_at',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  createdAt: number;

  // @Column({ type: 'int', default: 0 })
  // likes: number;

  // NÄr marcus är klar med ai är de bara att ta bort komentaren under, så kan vi sortera efter färg
  //   @Column({ type: 'varchar', length: '255', default: null })
  //   color: string;
}
