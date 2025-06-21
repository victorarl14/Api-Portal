import { Repository } from 'typeorm';
import { Technology, Project } from '../entities';
export declare class SeedService {
    private technologyRepository;
    private projectRepository;
    constructor(technologyRepository: Repository<Technology>, projectRepository: Repository<Project>);
    private seedTechnologies;
    private seedProjects;
    private cleanDatabase;
    runSeed(): Promise<void>;
}
