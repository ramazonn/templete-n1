import { Module } from "@nestjs/common";
import { JwtStrategy } from "./user/JwtStrategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExecuterEntity } from "src/core/entity/executer.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ExecuterEntity])],
	providers: [JwtStrategy],
})
export class AuthModule {}
