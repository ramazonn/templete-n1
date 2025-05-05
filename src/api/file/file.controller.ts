import fs from "fs";
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	UseGuards,
	Query,
} from "@nestjs/common";
import { join } from "path";
import { FileService } from "./file.service";
import { Roles } from "src/common/database/Enums";
import { RolesGuard } from "../auth/roles/RoleGuard";
import { JwtAuthGuard } from "../auth/user/AuthGuard";
import { CreateFileDto } from "./dto/create-file.dto";
import { FileEntity } from "src/core/entity/file.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { RolesDecorator } from "../auth/roles/RolesDecorator";
import { FileRequiredException } from "./exception/file.exception";
import { multerImageUpload } from "src/infrastructure/lib/fileService";
import { CurrentLanguage } from "src/common/decorator/current-language";

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller("file")
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@RolesDecorator(Roles.SUPER_ADMIN)
	@Post()
	@UseInterceptors(FileInterceptor("file", multerImageUpload))
	async create(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
		if (!file) {
			throw new FileRequiredException();
		}
		const newFile = new FileEntity();

		newFile.file_name = createFileDto.fileName || file.originalname;
		newFile.path = `${file.filename}`;
		newFile.mime_type = file.mimetype;
		newFile.size = file.size;

		const data = await this.fileService.getRepository.save(newFile);
		return { data, status: 201, message: "File successfully created" };
	}

	// @UseGuards(JwtAuthGuard, RolesGuard)
	// @RolesDecorator(Roles.SUPER_ADMIN)
	@Get()
	findAll(@CurrentLanguage() lang: string, @Query() dto: PaginationDto) {
		return this.fileService.findAllWithPagination(lang, {
			take: dto.page_size,
			skip: dto.page,
		});
	}

	@RolesDecorator(Roles.SUPER_ADMIN)
	@Get(":id")
	async findOne(@Param("id") id: string) {
		const lang = "en";
		return await this.fileService.findOneById(lang, id);
	}

	@RolesDecorator(Roles.SUPER_ADMIN)
	@Delete(":id")
	async delete(@Param("id") id: string) {
		const lang = "en";
		const { data: founFile } = await this.findOne(id);
		const filePath = join(__dirname, "../../../../uploads", founFile.path);
		// Check if the file exists
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}

		return await this.fileService.deleteFile(id, lang);
	}
}
