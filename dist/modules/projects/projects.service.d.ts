import { Repository } from 'typeorm';
import { Project, Technology } from '../../entities';
import { ProjectResponseDto } from './project.dto';
export declare class ProjectsService {
    private projectRepository;
    private technologyRepository;
    constructor(projectRepository: Repository<Project>, technologyRepository: Repository<Technology>);
    findAll(): Promise<Project[]>;
    findFeatured(): Promise<ProjectResponseDto[]>;
    findOne(id: string): Promise<Project>;
    create(createProjectDto: any): Promise<Project>;
    update(id: string, updateProjectDto: any): Promise<Project>;
    remove(id: string): Promise<void>;
}
