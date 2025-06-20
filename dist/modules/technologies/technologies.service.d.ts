import { Repository } from 'typeorm';
import { Technology, TechnologyCategory } from '../../entities';
export declare class TechnologiesService {
    private technologyRepository;
    constructor(technologyRepository: Repository<Technology>);
    findAll(): Promise<Technology[]>;
    findByCategory(category: TechnologyCategory): Promise<Technology[]>;
    findOne(id: string): Promise<Technology>;
    create(createTechnologyDto: any): Promise<Technology>;
    update(id: string, updateTechnologyDto: any): Promise<Technology>;
    remove(id: string): Promise<void>;
}
