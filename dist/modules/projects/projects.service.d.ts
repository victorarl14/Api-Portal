import { Repository } from 'typeorm';
import { Project, Technology } from '../../entities';
export declare class ProjectsService {
    private projectRepository;
    private technologyRepository;
    constructor(projectRepository: Repository<Project>, technologyRepository: Repository<Technology>);
    findAll(): Promise<Project[]>;
    findFeatured(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    create(createProjectDto: any): Promise<Project>;
    update(id: string, updateProjectDto: any): Promise<Project>;
    remove(id: string): Promise<void>;
}
