"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let SeedService = class SeedService {
    technologyRepository;
    projectRepository;
    constructor(technologyRepository, projectRepository) {
        this.technologyRepository = technologyRepository;
        this.projectRepository = projectRepository;
    }
    async seedTechnologies() {
        const technologiesData = [
            { name: 'HTML5', icon_class: 'html-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.EXPERT },
            { name: 'CSS3', icon_class: 'css-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'JavaScript', icon_class: 'javascript-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'React', icon_class: 'react-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'Flutter', icon_class: 'flutter-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'Dart', icon_class: 'dart-icon.png', category: entities_1.TechnologyCategory.FRONTEND, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'Python', icon_class: 'python-icon.png', category: entities_1.TechnologyCategory.BACKEND, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'Django', icon_class: 'django-icon.png', category: entities_1.TechnologyCategory.BACKEND, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'Firebase', icon_class: 'firebase-icon.png', category: entities_1.TechnologyCategory.BACKEND, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'PostgreSQL', icon_class: 'postgres-icon.png', category: entities_1.TechnologyCategory.DATABASE, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'MySQL', icon_class: 'mysql-icon.png', category: entities_1.TechnologyCategory.DATABASE, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'Odoo', icon_class: 'odoo-icon.png', category: entities_1.TechnologyCategory.OTHER, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'Koha', icon_class: 'koha-icon.png', category: entities_1.TechnologyCategory.OTHER, proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE },
            { name: 'C++', icon_class: 'c++-icon.png', category: entities_1.TechnologyCategory.OTHER, proficiency_level: entities_1.ProficiencyLevel.BEGINNER },
            { name: 'Git', icon_class: 'git-icon.png', category: entities_1.TechnologyCategory.DEVOPS, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
            { name: 'GitHub', icon_class: 'github-icon.png', category: entities_1.TechnologyCategory.DEVOPS, proficiency_level: entities_1.ProficiencyLevel.ADVANCED },
        ];
        for (const tech of technologiesData) {
            const existing = await this.technologyRepository.findOne({ where: { name: tech.name } });
            if (!existing) {
                await this.technologyRepository.save(this.technologyRepository.create(tech));
            }
            else {
                await this.technologyRepository.update(existing.id, { icon_class: tech.icon_class });
            }
        }
        console.log('✅ Tecnologías sembradas y actualizadas');
    }
    async seedProjects() {
        const [react, python, django, postgres, flutter, dart, firebase, odoo, javascript] = await Promise.all([
            this.technologyRepository.findOne({ where: { name: 'React' } }),
            this.technologyRepository.findOne({ where: { name: 'Python' } }),
            this.technologyRepository.findOne({ where: { name: 'Django' } }),
            this.technologyRepository.findOne({ where: { name: 'PostgreSQL' } }),
            this.technologyRepository.findOne({ where: { name: 'Flutter' } }),
            this.technologyRepository.findOne({ where: { name: 'Dart' } }),
            this.technologyRepository.findOne({ where: { name: 'Firebase' } }),
            this.technologyRepository.findOne({ where: { name: 'Odoo' } }),
            this.technologyRepository.findOne({ where: { name: 'JavaScript' } }),
        ]);
        const projectsData = [
            {
                title: '#VACA MEDIÁTICA',
                description: 'Plataforma de Donaciones para el periodismo Venezolano.',
                image_url: '/images/projects/vacamediatica-project.png',
                github_url: '',
                live_url: 'https://vacamediatica.odoo.com/',
                is_featured: true,
                technologies: [odoo, python, javascript],
            },
            {
                title: 'ChatBot Xyra',
                description: 'Modelo AI basado en contextualizar documentos.',
                image_url: '/images/projects/chatbot-xyra-project.png',
                github_url: 'https://github.com/victorarl14/chatbot-langchain.git',
                live_url: 'https://colab.research.google.com/drive/1JaX8__AiwfSMf0NeWM2wpyZEDUDfyYk1#scrollTo=lqCLAccIxEd4',
                is_featured: true,
                technologies: [python],
            },
            {
                title: 'Renovación de Certificados de Nacimiento',
                description: 'Aplicación Web para la renovación de certificados de nacimiento.',
                image_url: '/images/projects/birth-certificate.png',
                github_url: 'https://github.com/victorarl14/certificados_nacimiento.git',
                is_featured: true,
                technologies: [flutter, dart, firebase],
            },
            {
                title: 'Proyecto Genérico 1',
                description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
                image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+1',
                is_featured: false,
                technologies: [react],
            },
            {
                title: 'Proyecto Genérico 2',
                description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
                image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+2',
                is_featured: false,
                technologies: [python, django],
            },
            {
                title: 'Proyecto Genérico 3',
                description: 'Descripción de un proyecto genérico para rellenar el portafolio.',
                image_url: 'https://via.placeholder.com/400x200.png?text=Proyecto+3',
                is_featured: false,
                technologies: [flutter, firebase],
            },
            {
                title: 'Reconocimiento de secuencia de poses de Yoga',
                description: 'Modelo de IA para detectar y validar secuencias de posturas de yoga en tiempo real.',
                image_url: '/images/projects/yoga-pose-secuence.png',
                live_url: 'https://colab.research.google.com/drive/11GtPf3fZD_c0JKY-pHvmrjO95yHjVAEc?usp=sharing',
                is_featured: true,
                technologies: [python],
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
    async cleanDatabase() {
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
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Technology)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map