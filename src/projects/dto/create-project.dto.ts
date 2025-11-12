import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 250)
  description: string;

  @IsString()
  @IsOptional()
  demoLink: string;

  @IsString()
  @IsOptional()
  githubLink: string;

  @IsOptional()
  @IsArray({
    message: 'Technologies must be an array of strings.',
  })
  technologies: string[];

  @IsString()
  @IsOptional()
  thumbnailUrl: string;
}
