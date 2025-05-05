import { Repository } from "typeorm";
import { EmployeeEntity } from "../entity/employee.entity";

export type EmployeeRepository = Repository<EmployeeEntity>;
