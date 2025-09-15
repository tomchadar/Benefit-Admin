// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Employer, Address, Transaction, Employee, Department, EmployeeBonus, PlanStatus } = initSchema(schema);

export {
  User,
  Employer,
  Address,
  Transaction,
  Employee,
  Department,
  EmployeeBonus,
  PlanStatus
};