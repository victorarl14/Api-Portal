import { SeedService } from './seed.service';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    runSeed(): Promise<{
        message: string;
    }>;
}
