import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology, TechnologyCategory } from '../../entities';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async findAll(): Promise<Technology[]> {
    return this.technologyRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findByCategory(category: TechnologyCategory): Promise<Technology[]> {
    return this.technologyRepository.find({
      where: { category },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Technology> {
    const technology = await this.technologyRepository.findOne({
      where: { id },
    });

    if (!technology) {
      throw new NotFoundException('Tecnología no encontrada');
    }

    return technology;
  }

  async create(createTechnologyDto: any): Promise<Technology> {
    const technology = this.technologyRepository.create(createTechnologyDto);
    return this.technologyRepository.save(technology) as unknown as Promise<Technology>;
  }

  async update(id: string, updateTechnologyDto: any): Promise<Technology> {
    const technology = await this.findOne(id);
    Object.assign(technology, updateTechnologyDto);
    return this.technologyRepository.save(technology) as unknown as Promise<Technology>;
  }

  async remove(id: string): Promise<void> {
    const technology = await this.findOne(id);
    await this.technologyRepository.remove(technology);
  }
} 