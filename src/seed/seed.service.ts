import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Technology, TechnologyCategory, ProficiencyLevel, Project } from '../entities';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  private async seedTechnologies() {
    const technologiesData = [
      // Frontend
      { name: 'HTML5', icon_class: 'html-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.EXPERT },
      { name: 'CSS3', icon_class: 'css-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'JavaScript', icon_class: 'javascript-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'React', icon_class: 'react-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'Flutter', icon_class: 'flutter-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      { name: 'Dart', icon_class: 'dart-icon.png', category: TechnologyCategory.FRONTEND, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      // Backend
      { name: 'Python', icon_class: 'python-icon.png', category: TechnologyCategory.BACKEND, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'Django', icon_class: 'django-icon.png', category: TechnologyCategory.BACKEND, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'Firebase', icon_class: 'firebase-icon.png', category: TechnologyCategory.BACKEND, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      // Database
      { name: 'PostgreSQL', icon_class: 'postgres-icon.png', category: TechnologyCategory.DATABASE, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      { name: 'MySQL', icon_class: 'mysql-icon.png', category: TechnologyCategory.DATABASE, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      // Other
      { name: 'Odoo', icon_class: 'odoo-icon.png', category: TechnologyCategory.OTHER, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      { name: 'Koha', icon_class: 'koha-icon.png', category: TechnologyCategory.OTHER, proficiency_level: ProficiencyLevel.INTERMEDIATE },
      { name: 'C++', icon_class: 'c++-icon.png', category: TechnologyCategory.OTHER, proficiency_level: ProficiencyLevel.BEGINNER },
      // DevOps
      { name: 'Git', icon_class: 'git-icon.png', category: TechnologyCategory.DEVOPS, proficiency_level: ProficiencyLevel.ADVANCED },
      { name: 'GitHub', icon_class: 'github-icon.png', category: TechnologyCategory.DEVOPS, proficiency_level: ProficiencyLevel.ADVANCED },
    ];

    for (const tech of technologiesData) {
      const existing = await this.technologyRepository.findOne({ where: { name: tech.name } });
      if (!existing) {
        await this.technologyRepository.save(this.technologyRepository.create(tech));
      } else {
        // Si ya existe, lo actualizamos con el nombre del icono correcto
        await this.technologyRepository.update(existing.id, { icon_class: tech.icon_class });
      }
    }
    console.log('✅ Tecnologías sembradas y actualizadas');
  }

  private async seedProjects() {
    // Primero, obtén las tecnologías de la BD para poder asignarlas
    const [
      react, python, django, postgres, flutter, dart, firebase, odoo, javascript
    ] = await Promise.all([
        this.technologyRepository.findOne({where: {name: 'React'}}),
        this.technologyRepository.findOne({where: {name: 'Python'}}),
        this.technologyRepository.findOne({where: {name: 'Django'}}),
        this.technologyRepository.findOne({where: {name: 'PostgreSQL'}}),
        this.technologyRepository.findOne({where: {name: 'Flutter'}}),
        this.technologyRepository.findOne({where: {name: 'Dart'}}),
        this.technologyRepository.findOne({where: {name: 'Firebase'}}),
        this.technologyRepository.findOne({where: {name: 'Odoo'}}),
        this.technologyRepository.findOne({where: {name: 'JavaScript'}}),
    ]);

    const projectsData = [
      {
        title: '#VACA MEDIÁTICA',
        description: 'Plataforma de Donaciones para el periodismo Venezolano.',
        image_url: null, // No tienes la imagen aún, lo ponemos como null.
        github_url: 'https://github.com/tu-usuario/vaca-mediatica',
        live_url: 'https://vaca-mediatica.com',
        is_featured: true,
        technologies: [odoo, python, javascript],
      },
      {
        title: 'ChatBot Xyra',
        description: 'Modelo AI basado en contextualizar documentos.',
        image_url: null, // No tienes la imagen aún, lo ponemos como null.
        github_url: 'https://github.com/tu-usuario/chatbot-xyra',
        is_featured: true,
        technologies: [python],
      },
      {
        title: 'Renovación de Certificados de Nacimiento',
        description: 'Aplicación Web para la renovación de certificados de nacimiento.',
        image_url: null, // No tienes la imagen aún, lo ponemos como null.
        live_url: 'https://renovacion-certificados.com',
        is_featured: true,
        technologies: [flutter, dart, firebase],
      },
      {
        title: 'Proyecto Genérico 1',
        description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
        image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+1', // Usamos un placeholder
        is_featured: false,
        technologies: [react],
      },
       {
        title: 'Proyecto Genérico 2',
        description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
        image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+2', // Usamos un placeholder
        is_featured: false,
        technologies: [python, django],
      },
       {
        title: 'Proyecto Genérico 3',
        description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
        image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+3', // Usamos un placeholder
        is_featured: false,
        technologies: [flutter, firebase],
      },
    ];

    for (const projectData of projectsData) {
      const existing = await this.projectRepository.findOne({ where: { title: projectData.title } });
      if (!existing) {
        const newProject = this.projectRepository.create(projectData);
        await this.projectRepository.save(newProject);
      }
    }
     console.log('✅ Proyectos sembrados');
  }
  
  private async cleanDatabase() {
    // Desactivar temporalmente las restricciones de clave externa para permitir la eliminación en cascada
    await this.projectRepository.query('TRUNCATE TABLE "project_technology" RESTART IDENTITY CASCADE');
    await this.projectRepository.query('TRUNCATE TABLE "projects" RESTART IDENTITY CASCADE');
    await this.technologyRepository.query('TRUNCATE TABLE "technologies" RESTART IDENTITY CASCADE');
    console.log('🧹 Base de datos limpiada');
  }

  async runSeed() {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    await this.cleanDatabase();
    await this.seedTechnologies();
    await this.seedProjects();
    
    console.log('🎉 Seed completado exitosamente!');
  }
} 