import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { FileEntity } from "src/core/entity/file.entity";

@Module({
	imports: [TypeOrmModule.forFeature([FileEntity])],
	controllers: [FileController],
	providers: [FileService],
})
export class FileModule {}
