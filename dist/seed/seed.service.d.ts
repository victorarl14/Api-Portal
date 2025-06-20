import { Repository } from 'typeorm';
import { Technology, Project } from '../entities';
export declare class SeedService {
    private technologyRepository;
    private projectRepository;
    constructor(technologyRepository: Repository<Technology>, projectRepository: Repository<Project>);
    seedTechnologies(): Promise<void>;
    seedProjects(): Promise<void>;
    runSeed(): Promise<void>;
}
