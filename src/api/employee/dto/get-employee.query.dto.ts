import { IsOptional, IsUUID } from "class-validator";
import { FilterDto } from "src/common/dto/filter.dto";

export class GetEmployeeQuery extends FilterDto {
	@IsUUID()
	@IsOptional()
	fabric_id!: string;
}
