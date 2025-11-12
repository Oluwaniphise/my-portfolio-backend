import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { UpdateProjectDto } from './dto/update-project-dto';

@Injectable()
export class ProjectsService {
  constructor(private projectRepository: ProjectsRepository) {}

  async getTaskById(id: string): Promise<Project> {
    const found = await this.projectRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return found;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto);
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectRepository.updateProject(id, updateProjectDto);
    // try {
    //   return await this.projectsRepository.updateProject(id, updateProjectDto);
    // } catch (error) {
    //   if (error.message.includes('not found')) {
    //     throw new NotFoundException(`Project with ID ${id} not found.`);
    //   }
    //   throw error;
    // }
  }
}
