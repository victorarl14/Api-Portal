export declare enum TechnologyCategory {
    FRONTEND = "frontend",
    BACKEND = "backend",
    DATABASE = "database",
    DEVOPS = "devops",
    OTHER = "other"
}
export declare enum ProficiencyLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert"
}
export declare class Technology {
    id: string;
    name: string;
    icon_class: string;
    category: TechnologyCategory;
    proficiency_level: ProficiencyLevel;
    created_at: Date;
    projects: any[];
}
