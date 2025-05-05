import { IsOptional, IsString, IsNumber } from "class-validator";

export class CreateFileDto {
	@IsOptional()
	@IsString()
	fileName!: string;

	@IsOptional()
	@IsString()
	path!: string;

	@IsOptional()
	@IsNumber({})
	size!: number;

	@IsOptional()
	@IsString()
	mimeType!: string;
}

export class CreateFileApiDto {
	@IsOptional()
	file!: Express.Multer.File;
}
