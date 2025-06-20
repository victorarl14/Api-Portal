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
        const technologies = [
            {
                name: 'HTML5',
                icon_class: 'fab fa-html5',
                category: entities_1.TechnologyCategory.FRONTEND,
                proficiency_level: entities_1.ProficiencyLevel.EXPERT,
            },
            {
                name: 'CSS3',
                icon_class: 'fab fa-css3-alt',
                category: entities_1.TechnologyCategory.FRONTEND,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
            },
            {
                name: 'JavaScript',
                icon_class: 'fab fa-js-square',
                category: entities_1.TechnologyCategory.FRONTEND,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
            },
            {
                name: 'React',
                icon_class: 'fab fa-react',
                category: entities_1.TechnologyCategory.FRONTEND,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
            },
            {
                name: 'TypeScript',
                icon_class: 'fab fa-js-square',
                category: entities_1.TechnologyCategory.FRONTEND,
                proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE,
            },
            {
                name: 'Node.js',
                icon_class: 'fab fa-node-js',
                category: entities_1.TechnologyCategory.BACKEND,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
            },
            {
                name: 'Python',
                icon_class: 'fab fa-python',
                category: entities_1.TechnologyCategory.BACKEND,
                proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE,
            },
            {
                name: 'PostgreSQL',
                icon_class: 'fas fa-database',
                category: entities_1.TechnologyCategory.DATABASE,
                proficiency_level: entities_1.ProficiencyLevel.INTERMEDIATE,
            },
            {
                name: 'Git',
                icon_class: 'fab fa-git-alt',
                category: entities_1.TechnologyCategory.DEVOPS,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
            },
            {
                name: 'GitHub',
                icon_class: 'fab fa-github',
                category: entities_1.TechnologyCategory.DEVOPS,
                proficiency_level: entities_1.ProficiencyLevel.ADVANCED,
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