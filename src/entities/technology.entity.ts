import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';

export enum TechnologyCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DATABASE = 'database',
  DEVOPS = 'devops',
  OTHER = 'other',
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  icon_class: string;

  @Column({ type: 'enum', enum: TechnologyCategory, default: TechnologyCategory.OTHER })
  category: TechnologyCategory;

  @Column({ type: 'enum', enum: ProficiencyLevel, default: ProficiencyLevel.INTERMEDIATE })
  proficiency_level: ProficiencyLevel;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany('Project', 'technologies')
  projects: any[];
} 