import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column({ length: 255 })
  subject: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  receivedAt: Date;

  @Column({ default: false })
  emailSent: boolean;
}
