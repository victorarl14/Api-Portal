import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, Technology } from '../../entities';
import { ProjectResponseDto } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['technologies'],
      order: { created_at: 'DESC' },
    });
  }

  async findFeatured(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.find({
      where: { is_featured: true },
      relations: ['technologies'],
      order: { 
        created_at: 'DESC' 
      },
    });

    // Mapeo manual a DTO para romper las referencias circulares
    return projects.map(project => {
      const { technologies, ...rest } = project;
      return {
        ...rest,
        technologies: technologies.map(tech => ({
          id: tech.id,
          name: tech.name,
          icon_class: tech.icon_class,
        })),
      };
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['technologies'],
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return project;
  }

  async create(createProjectDto: any): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project) as unknown as Promise<Project>;
  }

  async update(id: string, updateProjectDto: any): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project) as unknown as Promise<Project>;
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }
} 