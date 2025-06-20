import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologyCategory } from '../../entities';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  async findAll() {
    return this.technologiesService.findAll();
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: TechnologyCategory) {
    return this.technologiesService.findByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.technologiesService.findOne(id);
  }

  @Post()
  async create(@Body() createTechnologyDto: any) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTechnologyDto: any) {
    return this.technologiesService.update(id, updateTechnologyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.technologiesService.remove(id);
  }
} 