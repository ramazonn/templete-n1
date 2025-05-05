import { LoginDto } from "./dto/login.dto";
import { Roles } from "src/common/database/Enums";
import { ExecuterService } from "./executer.service";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CreateExecuterDtoWithRole } from "./dto/create-executer.dto";
import { CurrentExecuter } from "src/common/decorator/current-executer";
import { ICurrentExecuter } from "src/common/interface/current-executer.interface";
import { CurrentLanguage } from "src/common/decorator/current-language";

@Controller("/admin")
export class ExecuterController {
	constructor(private readonly executerService: ExecuterService) {}

	@Post("/login")
	async adminLogin(@CurrentLanguage() lang: string, @Body() loginDto: LoginDto) {
		return await this.executerService.adminLogin(loginDto, lang);
	}

	@Post("/refresh")
	async refreshToken(
		@CurrentLanguage() lang: string,
		@Body("refresh_token") refreshToken: string,
	) {
		return await this.executerService.refreshToken(refreshToken, lang);
	}

	@Post("/default")
	async createDefaultExecuter(
		@CurrentLanguage() lang: string,
		@Body() createSuperExecuterDto: CreateExecuterDtoWithRole,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.executerService.createExecuter(createSuperExecuterDto, lang, executer);
	}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN)
	@Post()
	async createExecuter(
		@CurrentLanguage() lang: string,
		@Body() createSuperExecuterDto: CreateExecuterDtoWithRole,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.executerService.createExecuter(createSuperExecuterDto, lang, executer);
	}
}
