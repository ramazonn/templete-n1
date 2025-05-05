import { InjectRepository } from "@nestjs/typeorm";
import { SalaryType } from "src/common/database/Enums";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeeEntity } from "src/core/entity/employee.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "src/infrastructure/lib/baseService";
import { EmployeeRepository } from "src/core/repository/employee.repository";
import { ICurrentExecuter } from "src/common/interface/current-executer.interface";
import { responseByLang } from "src/infrastructure/lib/prompts/successResponsePrompt";

@Injectable()
export class EmployeeService extends BaseService<
	CreateEmployeeDto,
	UpdateEmployeeDto,
	EmployeeEntity
> {
	constructor(@InjectRepository(EmployeeEntity) repository: EmployeeRepository) {
		super(repository, "Employee");
	}
	async createEmployee(dto: CreateEmployeeDto, lang: string, executer: ICurrentExecuter) {
		if (dto.salary_type == SalaryType.FIXED && !dto.salary) {
			throw new BadRequestException();
		}
		const newEmployee = new EmployeeEntity();
		newEmployee.first_name = dto.first_name;
		newEmployee.last_name = dto.last_name;
		newEmployee.phone_number = dto.phone_number;
		newEmployee.address = dto.address;
		newEmployee.position = dto.position;
		newEmployee.birth_date = dto.birth_date;
		newEmployee.date_of_join = dto.date_of_join;
		newEmployee.salary_type = dto.salary_type;
		newEmployee.salary = newEmployee.salary_type == SalaryType.FIXED ? dto.salary : 0;
		if (dto.salary_type == SalaryType.FIXED) {
			newEmployee.salary = dto.salary;
		}
		await this.getRepository.save(newEmployee);

		const message = responseByLang("create", lang);
		return { data: newEmployee, status_code: 201, message };
	}
	async updateEmployee(
		id: string,
		dto: UpdateEmployeeDto,
		lang: string,
		executer: ICurrentExecuter,
	) {
		let { data: foundEmployee } = await this.findOneById(id, lang, {});
		if (dto.salary_type == SalaryType.FIXED && !dto.salary) {
			throw new BadRequestException();
		}
		foundEmployee.first_name = dto.first_name ?? foundEmployee.first_name;
		foundEmployee.last_name = dto.last_name ?? foundEmployee.last_name;
		foundEmployee.phone_number = dto.phone_number ?? foundEmployee.phone_number;
		foundEmployee.salary_type = dto.salary_type ?? foundEmployee.salary_type;
		foundEmployee.salary = foundEmployee.salary_type == SalaryType.FIXED ? dto.salary ?? 0 : 0;
		foundEmployee.position = dto.position ?? foundEmployee.position;
		foundEmployee.address = dto.address ?? foundEmployee.address;
		foundEmployee.birth_date = dto.birth_date ?? foundEmployee.birth_date;
		foundEmployee.date_of_join = dto.date_of_join ?? foundEmployee.date_of_join;

		await this.getRepository.save(foundEmployee);
		const message = responseByLang("update", lang);
		return { data: {}, status_code: 201, message };
	}
	async deleteEmployee(id: string, lang: string, executer: ICurrentExecuter) {
		const { data: foundEmployee } = await this.findOneById(id, lang, {
			relations: {},
		});
		await this.delete(id, lang, executer);

		const message = responseByLang("delete", lang);
		return { data: {}, status_code: 201, message };
	}
}
