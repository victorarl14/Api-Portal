import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { Technology, Project } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Technology, Project])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {} 