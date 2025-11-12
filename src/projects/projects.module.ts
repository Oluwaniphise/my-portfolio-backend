import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ConfigModule } from '@nestjs/config';
import { ProjectsRepository } from './projects.repository';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ConfigModule],
  controllers: [ProjectsController],

  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}
