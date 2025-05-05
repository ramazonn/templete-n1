import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class FilterDto extends PaginationDto {
	@IsOptional()
	@IsString({ message: 'search должно быть строкой' })
	@Type(() => String)
	search!: string;
}
