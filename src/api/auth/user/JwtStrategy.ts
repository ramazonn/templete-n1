import { config } from "src/config";
import { Injectable } from "@nestjs/common";
import { AuthPayload } from "src/common/type";
import { AuthorizationError } from "../exception";
import { Roles } from "src/common/database/Enums";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ExecuterEntity } from "src/core/entity/executer.entity";
import { ExecuterRepository } from "src/core/repository/executer.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(@InjectRepository(ExecuterEntity) private executerRepository: ExecuterRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_SECRET_KEY,
		});
	}

	async validate(payload: AuthPayload) {
		let executer: ExecuterEntity | null = null;

		// if roles that don't work in some part of the project, check all app roles should be included here
		if (payload.role === Roles.SUPER_ADMIN) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.BICHUVCHI) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.SEWER) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.IRONER) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.CLEANER) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.CONTROLLER) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		} else if (payload.role === Roles.ACCOUNTANT) {
			executer = await this.executerRepository.findOne({
				where: {
					id: payload.id,
					role: payload.role,
					is_active: true,
				},
				relations: {},
			});
		}

		if (!executer) {
			throw new AuthorizationError();
		}

		return executer;
	}
}
