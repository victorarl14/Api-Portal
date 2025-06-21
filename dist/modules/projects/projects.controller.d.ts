import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<import("../../entities").Project[]>;
    findFeatured(): Promise<import("./project.dto").ProjectResponseDto[]>;
    findOne(id: string): Promise<import("../../entities").Project>;
    create(createProjectDto: any): Promise<import("../../entities").Project>;
    update(id: string, updateProjectDto: any): Promise<import("../../entities").Project>;
    remove(id: string): Promise<void>;
}
