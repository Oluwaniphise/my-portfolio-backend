import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The short, unique title of the project.',
    example: 'Portfolio Redesign',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'A brief description of the project.',
    example: 'A responsive web application built with NestJS and React.',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  description: string;

  @ApiProperty({
    description: 'URL to the live demo of the project (Optional).',
    example: 'https://live-demo.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  demoLink?: string;

  @ApiProperty({
    description: "URL to the project's GitHub repository (Optional).",
    example: 'https://github.com/my-user/project',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  githubLink?: string;

  @ApiProperty({
    description: 'An array of technologies or skills used.',
    example: ['NestJS', 'TypeORM', 'PostgreSQL', 'Tailwind CSS'],
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  technologies: string[];

  @ApiProperty({
    description: 'The URL or path to the project thumbnail image.',
    example: 'uploads/thumbnails/1a3b5c7d9e.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}
