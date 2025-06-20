import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology, TechnologyCategory, ProficiencyLevel, Project } from '../entities';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async seedTechnologies() {
    const technologies = [
      {
        name: 'HTML5',
        icon_class: 'fab fa-html5',
        category: TechnologyCategory.FRONTEND,
        proficiency_level: ProficiencyLevel.EXPERT,
      },
      {
        name: 'CSS3',
        icon_class: 'fab fa-css3-alt',
        category: TechnologyCategory.FRONTEND,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
      {
        name: 'JavaScript',
        icon_class: 'fab fa-js-square',
        category: TechnologyCategory.FRONTEND,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
      {
        name: 'React',
        icon_class: 'fab fa-react',
        category: TechnologyCategory.FRONTEND,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
      {
        name: 'TypeScript',
        icon_class: 'fab fa-js-square',
        category: TechnologyCategory.FRONTEND,
        proficiency_level: ProficiencyLevel.INTERMEDIATE,
      },
      {
        name: 'Node.js',
        icon_class: 'fab fa-node-js',
        category: TechnologyCategory.BACKEND,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
      {
        name: 'Python',
        icon_class: 'fab fa-python',
        category: TechnologyCategory.BACKEND,
        proficiency_level: ProficiencyLevel.INTERMEDIATE,
      },
      {
        name: 'PostgreSQL',
        icon_class: 'fas fa-database',
        category: TechnologyCategory.DATABASE,
        proficiency_level: ProficiencyLevel.INTERMEDIATE,
      },
      {
        name: 'Git',
        icon_class: 'fab fa-git-alt',
        category: TechnologyCategory.DEVOPS,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
      {
        name: 'GitHub',
        icon_class: 'fab fa-github',
        category: TechnologyCategory.DEVOPS,
        proficiency_level: ProficiencyLevel.ADVANCED,
      },
    ];

    for (const tech of technologies) {
      const existing = await this.technologyRepository.findOne({
        where: { name: tech.name },
      });
      if (!existing) {
        await this.technologyRepository.save(tech);
      }
    }
  }

  async seedProjects() {
    const projects = [
      {
        title: 'Portfolio Personal',
        description: 'Portfolio web desarrollado con React y TypeScript, mostrando mis proyectos y habilidades técnicas.',
        image_url: 'https://via.placeholder.com/400x300',
        github_url: 'https://github.com/tu-usuario/portfolio',
        live_url: 'https://tu-portfolio.com',
        is_featured: true,
      },
      {
        title: 'API REST con NestJS',
        description: 'API RESTful desarrollada con NestJS y PostgreSQL, implementando autenticación JWT y CRUD completo.',
        image_url: 'https://via.placeholder.com/400x300',
        github_url: 'https://github.com/tu-usuario/api-nestjs',
        live_url: 'https://tu-api.com',
        is_featured: true,
      },
      {
        title: 'Sistema de Gestión',
        description: 'Sistema web completo para gestión de proyectos con frontend en React y backend en Node.js.',
        image_url: 'https://via.placeholder.com/400x300',
        github_url: 'https://github.com/tu-usuario/sistema-gestion',
        live_url: 'https://sistema-gestion.com',
        is_featured: false,
      },
    ];

    for (const project of projects) {
      const existing = await this.projectRepository.findOne({
        where: { title: project.title },
      });
      if (!existing) {
        await this.projectRepository.save(project);
      }
    }
  }

  async runSeed() {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    await this.seedTechnologies();
    console.log('✅ Tecnologías sembradas');
    
    await this.seedProjects();
    console.log('✅ Proyectos sembrados');
    
    console.log('🎉 Seed completado exitosamente!');
  }
} 