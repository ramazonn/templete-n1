import { Reflector } from "@nestjs/core";
import { Roles } from "src/common/database/Enums";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ICurrentExecuter } from "src/common/interface/current-executer.interface";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<Roles[]>("roles", context.getHandler());

		if (!roles) {
			return true;
		}

		const request: Express.Request = context.switchToHttp().getRequest();
		const user = request.user as ICurrentExecuter;
		return roles.includes(user.role);
	}
}
