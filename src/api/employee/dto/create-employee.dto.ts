import { SalaryType } from "src/common/database/Enums";
import { IsPhoneNumber } from "src/common/decorator/is-phone-number";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateEmployeeDto {
	@IsNotEmpty()
	@IsString()
	first_name!: string;

	@IsNotEmpty()
	@IsString()
	last_name!: string;

	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phone_number!: string;

	@IsNotEmpty()
	@IsEnum(SalaryType)
	salary_type!: SalaryType;

	@ValidateIf((o) => o.salary_type === SalaryType.FIXED)
	@IsNotEmpty({ message: "Salary is required when salary_type is fixed" })
	@IsNumber({}, { message: "Salary must be a number" })
	salary: number = 0;

	@IsNotEmpty()
	@IsString()
	position!: string;

	@IsNotEmpty()
	@IsString()
	address!: string;

	@IsNotEmpty()
	@IsNumber()
	birth_date!: number;

	@IsNotEmpty()
	@IsNumber()
	date_of_join!: number;

	@IsNotEmpty()
	@IsUUID()
	fabric_id!: string;
}
