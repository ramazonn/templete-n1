import { BaseEntity } from "src/common/database/BaseEntity";
import { SalaryType } from "src/common/database/Enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity("employees")
export class EmployeeEntity extends BaseEntity {
	@Column({ type: "varchar", name: "first_name" })
	first_name!: string;

	@Column({ type: "varchar", name: "last_name" })
	last_name!: string;

	@Column({ type: "varchar", name: "phone_number" })
	phone_number!: string;

	@Column({ type: "enum", enum: SalaryType })
	salary_type!: SalaryType;

	@Column({ type: "decimal", default: 0 })
	salary!: number;

	@Column({ type: "decimal", default: 0 })
	balance!: number;

	@Column({ type: "varchar" })
	position!: string;

	@Column({ type: "varchar" })
	address!: string;

	@Column({ type: "bigint" })
	birth_date!: number;

	@Column({ type: "bigint" })
	date_of_join!: number;
}
