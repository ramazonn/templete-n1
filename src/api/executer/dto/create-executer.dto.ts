import { Roles } from "src/common/database/Enums";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IsPhoneNumber } from "src/common/decorator/is-phone-number";

export class CreateExecuterDto {
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
	@IsString()
	username!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}

export class CreateExecuterDtoWithRole extends CreateExecuterDto {
	@IsNotEmpty()
	@IsEnum(Roles)
	role!: Roles;
}
