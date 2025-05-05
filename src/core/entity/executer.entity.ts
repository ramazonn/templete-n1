import { Roles } from "src/common/database/Enums";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/database/BaseEntity";

@Entity("executers")
export class ExecuterEntity extends BaseEntity {
	@Column({ type: "varchar", name: "first_name" })
	first_name!: string;

	@Column({ type: "varchar", name: "last_name" })
	last_name!: string;

	@Column({ type: "varchar", name: "phone_number" })
	phone_number!: string;

	@Column({ type: "varchar", name: "role" })
	role!: Roles;

	@Column({ type: "varchar", name: "username", unique: true })
	username!: string;

	@Column({ type: "varchar", name: "password" })
	password!: string;
}
