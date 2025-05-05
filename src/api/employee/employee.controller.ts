import {
	Controller,
	Post,
	Body,
	UseGuards,
	Delete,
	Put,
	Get,
	ParseUUIDPipe,
	Param,
	Query,
} from "@nestjs/common";
import { Roles } from "src/common/database/Enums";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { EmployeeService } from "./employee.service";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { FindOptionsWhereProperty, ILike } from "typeorm";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { GetEmployeeQuery } from "./dto/get-employee.query.dto";
import { EmployeeEntity } from "src/core/entity/employee.entity";
import { CurrentLanguage } from "src/common/decorator/current-language";
import { CurrentExecuter } from "src/common/decorator/current-executer";
import { ICurrentExecuter } from "src/common/interface/current-executer.interface";

@Controller("/employees")
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN, Roles.ACCOUNTANT)
	@Get()
	async getAll(@Query() query: GetEmployeeQuery, @CurrentLanguage() lang: string) {
		let whereCondition: FindOptionsWhereProperty<EmployeeEntity> = [{ is_deleted: false }];
		if (query.search) {
			whereCondition = [
				{
					is_deleted: false,
					first_name: ILike(`%${query.search}%`),
				},
				{
					is_deleted: false,
					phone_number: ILike(`%${query.search}%`),
				},
				{
					is_deleted: false,
					last_name: ILike(`%${query.search}%`),
				},
				{
					is_deleted: false,
					position: ILike(`%${query.search}%`),
				},
			];
		}
		if (query.fabric_id) {
			whereCondition = whereCondition.map((e) => {
				return { ...e, fabric: { id: query.fabric_id } };
			});
		}

		return await this.employeeService.findAllWithPagination(lang, {
			where: whereCondition,
			skip: query.page,
			take: query.page_size,
		});
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN, Roles.ACCOUNTANT)
	@Get("/:id")
	async getOne(
		@CurrentLanguage() lang: string,
		@Param("id", ParseUUIDPipe) id: string,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.employeeService.findOneById(id, lang, {
			where: { is_deleted: false },
		});
	}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN, Roles.ACCOUNTANT)
	@Post()
	async create(
		@CurrentLanguage() lang: string,
		@Body() dto: CreateEmployeeDto,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.employeeService.createEmployee(dto, lang, executer);
	}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN, Roles.ACCOUNTANT)
	@Put("/:id")
	async update(
		@CurrentLanguage() lang: string,
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UpdateEmployeeDto,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.employeeService.updateEmployee(id, dto, lang, executer);
	}
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN, Roles.ACCOUNTANT)
	@Delete("/:id")
	async delete(
		@CurrentLanguage() lang: string,
		@Param("id", ParseUUIDPipe) id: string,
		@CurrentExecuter() executer: ICurrentExecuter,
	) {
		return await this.employeeService.deleteEmployee(id, lang, executer);
	}
}
