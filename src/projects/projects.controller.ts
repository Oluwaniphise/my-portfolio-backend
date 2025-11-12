import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { UpdateProjectDto } from './dto/update-project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProject() {
    return this.projectsService.getAllProjects();
  }

  @Post()
  createTask(@Body() CreateProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(CreateProjectDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.projectsService.deleteProject(id);
  }
}
