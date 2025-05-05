import { Roles } from "src/common/database/Enums";

export interface LoginResponse {
	id: string;
	role: Roles;
	first_name: string;
	last_name: string;
	phone_number: string;
	accessToken: string;
	refreshToken: string;
}
