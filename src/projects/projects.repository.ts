import { DataSource, Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project-dto';

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.create(createProjectDto);

    await this.save(project);
    return project;
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOneBy({ id });

    if (!project) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    this.merge(project, updateProjectDto);

    await this.save(project);

    return project;
  }
}
