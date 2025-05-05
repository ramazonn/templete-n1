import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
	@IsOptional()
	@IsNumber({}, { message: "page должно быть числом" })
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsNumber({}, { message: "page_size должно быть числом" })
	@Type(() => Number)
	page_size: number = 10;
}
