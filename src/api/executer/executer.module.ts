import { config } from "src/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExecuterService } from "./executer.service";
import { ExecuterController } from "./executer.controller";
import { ExecuterEntity } from "src/core/entity/executer.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([ExecuterEntity]),
		JwtModule.register({
			global: true,
			secret: config.JWT_SECRET_KEY || "secret",
		}),
	],
	controllers: [ExecuterController],
	providers: [ExecuterService],
	exports: [ExecuterService],
})
export class ExecuterModule {}
