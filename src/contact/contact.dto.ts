import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactFormDto {
  @ApiProperty({
    description: 'The full name of the sender.',
    example: 'Jane Doe',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "The sender's email address.",
    example: 'jane.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The subject of the message.',
    example: 'Inquiry about Web Development Services',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  subject: string;

  @ApiProperty({
    description: 'The body of the message.',
    example: 'I saw your portfolio and was very impressed...',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
