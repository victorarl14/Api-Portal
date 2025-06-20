import { TechnologiesService } from './technologies.service';
import { TechnologyCategory } from '../../entities';
export declare class TechnologiesController {
    private readonly technologiesService;
    constructor(technologiesService: TechnologiesService);
    findAll(): Promise<import("../../entities").Technology[]>;
    findByCategory(category: TechnologyCategory): Promise<import("../../entities").Technology[]>;
    findOne(id: string): Promise<import("../../entities").Technology>;
    create(createTechnologyDto: any): Promise<import("../../entities").Technology>;
    update(id: string, updateTechnologyDto: any): Promise<import("../../entities").Technology>;
    remove(id: string): Promise<void>;
}
