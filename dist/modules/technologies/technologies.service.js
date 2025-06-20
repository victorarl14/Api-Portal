"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../entities");
let TechnologiesService = class TechnologiesService {
    technologyRepository;
    constructor(technologyRepository) {
        this.technologyRepository = technologyRepository;
    }
    async findAll() {
        return this.technologyRepository.find({
            order: { name: 'ASC' },
        });
    }
    async findByCategory(category) {
        return this.technologyRepository.find({
            where: { category },
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const technology = await this.technologyRepository.findOne({
            where: { id },
        });
        if (!technology) {
            throw new common_1.NotFoundException('Tecnología no encontrada');
        }
        return technology;
    }
    async create(createTechnologyDto) {
        const technology = this.technologyRepository.create(createTechnologyDto);
        return this.technologyRepository.save(technology);
    }
    async update(id, updateTechnologyDto) {
        const technology = await this.findOne(id);
        Object.assign(technology, updateTechnologyDto);
        return this.technologyRepository.save(technology);
    }
    async remove(id) {
        const technology = await this.findOne(id);
        await this.technologyRepository.remove(technology);
    }
};
exports.TechnologiesService = TechnologiesService;
exports.TechnologiesService = TechnologiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Technology)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TechnologiesService);
//# sourceMappingURL=technologies.service.js.map