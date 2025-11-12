import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactMessage } from './contact.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactMessage]),

    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere
      envFilePath: '.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: configService.get<string>('GMAIL_USERNAME'),
            pass: configService.get<string>('GMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@yourportfolio.com>',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
