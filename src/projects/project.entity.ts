import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    length: 250,
    unique: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  demoLink: string;

  @Column({
    nullable: true,
  })
  githubLink: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  technologies: string[];

  @Column({
    nullable: true,
  })
  thumbnailUrl: string;
}
