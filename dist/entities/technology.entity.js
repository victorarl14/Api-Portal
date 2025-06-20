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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Technology = exports.ProficiencyLevel = exports.TechnologyCategory = void 0;
const typeorm_1 = require("typeorm");
var TechnologyCategory;
(function (TechnologyCategory) {
    TechnologyCategory["FRONTEND"] = "frontend";
    TechnologyCategory["BACKEND"] = "backend";
    TechnologyCategory["DATABASE"] = "database";
    TechnologyCategory["DEVOPS"] = "devops";
    TechnologyCategory["OTHER"] = "other";
})(TechnologyCategory || (exports.TechnologyCategory = TechnologyCategory = {}));
var ProficiencyLevel;
(function (ProficiencyLevel) {
    ProficiencyLevel["BEGINNER"] = "beginner";
    ProficiencyLevel["INTERMEDIATE"] = "intermediate";
    ProficiencyLevel["ADVANCED"] = "advanced";
    ProficiencyLevel["EXPERT"] = "expert";
})(ProficiencyLevel || (exports.ProficiencyLevel = ProficiencyLevel = {}));
let Technology = class Technology {
    id;
    name;
    icon_class;
    category;
    proficiency_level;
    created_at;
    projects;
};
exports.Technology = Technology;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Technology.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Technology.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Technology.prototype, "icon_class", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TechnologyCategory, default: TechnologyCategory.OTHER }),
    __metadata("design:type", String)
], Technology.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProficiencyLevel, default: ProficiencyLevel.INTERMEDIATE }),
    __metadata("design:type", String)
], Technology.prototype, "proficiency_level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Technology.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('Project', 'technologies'),
    __metadata("design:type", Array)
], Technology.prototype, "projects", void 0);
exports.Technology = Technology = __decorate([
    (0, typeorm_1.Entity)('technologies')
], Technology);
//# sourceMappingURL=technology.entity.js.map