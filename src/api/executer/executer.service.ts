import { config } from "src/config";
import { DeepPartial } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { Injectable } from "@nestjs/common";
import { AuthPayload } from "src/common/type";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorizationError } from "../auth/exception";
import { LoginResponse } from "./dto/login-response.dto";
import { UpdateExecuterDto } from "./dto/update-executer.dto";
import { ExecuterEntity } from "src/core/entity/executer.entity";
import { BaseService } from "src/infrastructure/lib/baseService";
import { BcryptEncryption } from "src/infrastructure/lib/bcrypt";
import { ExecuterNotFound } from "./exception/executer-not-found";
import { ExecuterRepository } from "src/core/repository/executer.repository";
import { responseByLang } from "src/infrastructure/lib/prompts/successResponsePrompt";
import { CreateExecuterDto, CreateExecuterDtoWithRole } from "./dto/create-executer.dto";
import { UsernameOrPasswordIncorrect } from "./exception/username-or-password-incorrect.exception.ts";

@Injectable()
export class ExecuterService extends BaseService<
	CreateExecuterDto,
	DeepPartial<ExecuterEntity>,
	ExecuterEntity
> {
	constructor(
		@InjectRepository(ExecuterEntity) repository: ExecuterRepository,
		private jwtService: JwtService,
	) {
		super(repository, "Executers");
	}

	async adminLogin(dto: LoginDto, lang: string) {
		const { data: executer } = await this.findOneBy(lang, {
			where: { username: dto.username, is_deleted: false },
		});
		if (!executer) throw new UsernameOrPasswordIncorrect();

		const compare_password = await BcryptEncryption.compare(dto.password, executer.password);
		if (!compare_password) throw new UsernameOrPasswordIncorrect();

		let payload: AuthPayload = {
			id: executer.id,
			role: executer.role,
		};

		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: config.ACCESS_TOKEN_LIFE_TIME,
		});
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: config.REFRESH_TOKEN_LIFE_TIME,
		});

		const loginResponse: LoginResponse = {
			id: executer.id,
			role: executer.role,
			first_name: executer.first_name,
			last_name: executer.last_name,
			phone_number: executer.phone_number,
			accessToken,
			refreshToken,
		};
		return { status: 200, data: loginResponse, message: "Успешно!" };
	}

	async refreshToken(token: string, lang: string) {
		try {
			const payload = this.jwtService.verify(token);

			const { data: executer } = await this.findOneBy(lang, {
				where: { id: payload.id },
			});
			if (!executer) throw new AuthorizationError();

			const newPayload = { id: executer.id, role: executer.role };
			const accessToken = await this.jwtService.signAsync(newPayload, {
				expiresIn: config.ACCESS_TOKEN_LIFE_TIME,
			});
			const refreshToken = await this.jwtService.signAsync(newPayload, {
				expiresIn: config.REFRESH_TOKEN_LIFE_TIME,
			});

			const refreshTokenResponse: LoginResponse = {
				id: executer.id,
				role: executer.role,
				first_name: executer.first_name,
				last_name: executer.last_name,
				phone_number: executer.phone_number,
				accessToken,
				refreshToken,
			};
			return { status: 200, data: refreshTokenResponse, message: "Успешно!" };
		} catch (error) {
			throw new AuthorizationError();
		}
	}

	async createExecuter(dto: CreateExecuterDtoWithRole, lang: string, executer: ExecuterEntity) {
		const hashshedPassword = await BcryptEncryption.encrypt(dto.password);

		const newExecuter = this.getRepository.create({
			first_name: dto.first_name,
			last_name: dto.last_name,
			phone_number: dto.phone_number,
			role: dto.role,
			username: dto.username,
			password: hashshedPassword,
			created_by: executer,
		});
		await this.getRepository.save(newExecuter);

		const message = responseByLang("create", lang);
		return { data: newExecuter, status_code: 201, message };
	}

	async updateExecuter(
		id: string,
		dto: UpdateExecuterDto,
		lang: string,
		executer: ExecuterEntity,
	) {
		const { data: foundExecuter } = await this.findOneById(id);
		if (!foundExecuter) {
			throw new ExecuterNotFound();
		}
		if (dto.password) {
			dto.password = await BcryptEncryption.encrypt(dto.password);
		}
		this.getRepository.update(id, {
			...dto,
			updated_by: executer,
			updated_at: Date.now(),
		});
		const message = responseByLang("update", lang);
		return { data: {}, status_code: 200, message };
	}
}
