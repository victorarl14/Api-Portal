declare class TechnologyDto {
    id: string;
    name: string;
    icon_class: string;
}
export declare class ProjectResponseDto {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    github_url: string;
    live_url: string;
    technologies: TechnologyDto[];
}
export {};
