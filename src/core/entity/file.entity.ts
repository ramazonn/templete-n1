import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/common/database/BaseEntity";

@Entity("files")
export class FileEntity extends BaseEntity {
	@Column({ name: "file_name", type: "varchar" })
	file_name!: string;

	@Column({ name: "path", type: "varchar" })
	path!: string;

	@Column({ name: "size", type: "int" })
	size!: number;

	@Column({ name: "mime_type", type: "varchar" })
	mime_type!: string;
}
