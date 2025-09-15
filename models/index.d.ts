import { ModelInit, MutableModel } from "@aws-amplify/datastore";





type AddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TransactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EmployeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DepartmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EmployeeBonusMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlanStatusMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username?: string | null;
  readonly Employer?: Employer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userEmployerId?: string | null;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Employer {
  readonly id: string;
  readonly name?: string | null;
  readonly interestrate?: number | null;
  readonly Address?: Address | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly employerAddressId?: string | null;
  constructor(init: ModelInit<Employer>);
  static copyOf(source: Employer, mutator: (draft: MutableModel<Employer>) => MutableModel<Employer> | void): Employer;
}

export declare class Address {
  readonly id: string;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly city?: string | null;
  readonly provincestate?: string | null;
  readonly country?: string | null;
  readonly postalcode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Address, AddressMetaData>);
  static copyOf(source: Address, mutator: (draft: MutableModel<Address, AddressMetaData>) => MutableModel<Address, AddressMetaData> | void): Address;
}

export declare class Transaction {
  readonly id: string;
  readonly bonusoffered?: number | null;
  readonly Employee?: Employee | null;
  readonly Employer?: Employer | null;
  readonly requesteddate?: string | null;
  readonly requestedamount?: number | null;
  readonly disbursementdate?: string | null;
  readonly disbursementamount?: number | null;
  readonly disbursementmethod?: string | null;
  readonly benefitremitdate?: string | null;
  readonly invoices3filekey?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly transactionEmployeeId?: string | null;
  readonly transactionEmployerId?: string | null;
  constructor(init: ModelInit<Transaction, TransactionMetaData>);
  static copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction, TransactionMetaData>) => MutableModel<Transaction, TransactionMetaData> | void): Transaction;
}

export declare class Employee {
  readonly id: string;
  readonly employeeid: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly uei?: string | null;
  readonly imgKey?: string | null;
  readonly imgIdentityId?: string | null;
  readonly startdate: string;
  readonly Department?: Department | null;
  readonly terminationdate?: string | null;
  readonly Address?: Address | null;
  readonly Employer?: Employer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly employeeDepartmentId?: string | null;
  readonly employeeAddressId?: string | null;
  readonly employeeEmployerId?: string | null;
  constructor(init: ModelInit<Employee, EmployeeMetaData>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee, EmployeeMetaData>) => MutableModel<Employee, EmployeeMetaData> | void): Employee;
}

export declare class Department {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Department, DepartmentMetaData>);
  static copyOf(source: Department, mutator: (draft: MutableModel<Department, DepartmentMetaData>) => MutableModel<Department, DepartmentMetaData> | void): Department;
}

export declare class EmployeeBonus {
  readonly id: string;
  readonly amount?: number | null;
  readonly startdate?: string | null;
  readonly enddate?: string | null;
  readonly vestingperiod?: number | null;
  readonly vestingfreq?: number | null;
  readonly vestingcliff?: number | null;
  readonly plantype?: string | null;
  readonly activeamount?: number | null;
  readonly amounttovest?: number | null;
  readonly PlanStatus?: PlanStatus | null;
  readonly docs3filekey?: string | null;
  readonly Employer?: Employer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly employeeBonusPlanStatusId?: string | null;
  readonly employeeBonusEmployerId?: string | null;
  constructor(init: ModelInit<EmployeeBonus, EmployeeBonusMetaData>);
  static copyOf(source: EmployeeBonus, mutator: (draft: MutableModel<EmployeeBonus, EmployeeBonusMetaData>) => MutableModel<EmployeeBonus, EmployeeBonusMetaData> | void): EmployeeBonus;
}

export declare class PlanStatus {
  readonly id: string;
  readonly status: string;
  readonly actions: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PlanStatus, PlanStatusMetaData>);
  static copyOf(source: PlanStatus, mutator: (draft: MutableModel<PlanStatus, PlanStatusMetaData>) => MutableModel<PlanStatus, PlanStatusMetaData> | void): PlanStatus;
}