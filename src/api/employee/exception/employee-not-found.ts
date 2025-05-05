import { HttpException } from "@nestjs/common";
import { getErrorMessage } from "src/infrastructure/lib/prompts/errorPrompt";

export class EmployeeNotFound extends HttpException {
	// constructor() {
	// 	super(JSON.stringify(getErrorMessage("application", "employee_not_found")), 404);
	// }
}
