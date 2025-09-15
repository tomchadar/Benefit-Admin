/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBenefitUser = /* GraphQL */ `
  mutation CreateBenefitUser(
    $input: CreateBenefitUserInput!
    $condition: ModelBenefitUserConditionInput
  ) {
    createBenefitUser(input: $input, condition: $condition) {
      emailAddress
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      createdAt
      updatedAt
      benefitUserEmployerId
    }
  }
`;
export const updateBenefitUser = /* GraphQL */ `
  mutation UpdateBenefitUser(
    $input: UpdateBenefitUserInput!
    $condition: ModelBenefitUserConditionInput
  ) {
    updateBenefitUser(input: $input, condition: $condition) {
      emailAddress
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      createdAt
      updatedAt
      benefitUserEmployerId
    }
  }
`;
export const deleteBenefitUser = /* GraphQL */ `
  mutation DeleteBenefitUser(
    $input: DeleteBenefitUserInput!
    $condition: ModelBenefitUserConditionInput
  ) {
    deleteBenefitUser(input: $input, condition: $condition) {
      emailAddress
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      createdAt
      updatedAt
      benefitUserEmployerId
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      bonusoffered
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      requesteddate
      requestedamount
      disbursementdate
      disbursementamount
      disbursementmethod
      benefitremitdate
      actionrequired
      invoices3filekey
      createdAt
      updatedAt
      transactionEmployeeId
      transactionEmployerId
    }
  }
`;
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
      id
      bonusoffered
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      requesteddate
      requestedamount
      disbursementdate
      disbursementamount
      disbursementmethod
      benefitremitdate
      actionrequired
      invoices3filekey
      createdAt
      updatedAt
      transactionEmployeeId
      transactionEmployerId
    }
  }
`;
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
      id
      bonusoffered
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      requesteddate
      requestedamount
      disbursementdate
      disbursementamount
      disbursementmethod
      benefitremitdate
      actionrequired
      invoices3filekey
      createdAt
      updatedAt
      transactionEmployeeId
      transactionEmployerId
    }
  }
`;
export const createEmployeeBonus = /* GraphQL */ `
  mutation CreateEmployeeBonus(
    $input: CreateEmployeeBonusInput!
    $condition: ModelEmployeeBonusConditionInput
  ) {
    createEmployeeBonus(input: $input, condition: $condition) {
      id
      amount
      startdate
      enddate
      vestingperiod
      vestingfreq
      vestingcliff
      plantype
      activeamount
      amounttovest
      forgivenamount
      interestrate
      PlanStatus {
        id
        status
        actions
        createdAt
        updatedAt
      }
      docs3filekey
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      taxBenefit
      createdAt
      updatedAt
      employeeBonusPlanStatusId
      employeeBonusEmployeeId
      employeeBonusEmployerId
    }
  }
`;
export const updateEmployeeBonus = /* GraphQL */ `
  mutation UpdateEmployeeBonus(
    $input: UpdateEmployeeBonusInput!
    $condition: ModelEmployeeBonusConditionInput
  ) {
    updateEmployeeBonus(input: $input, condition: $condition) {
      id
      amount
      startdate
      enddate
      vestingperiod
      vestingfreq
      vestingcliff
      plantype
      activeamount
      amounttovest
      forgivenamount
      interestrate
      PlanStatus {
        id
        status
        actions
        createdAt
        updatedAt
      }
      docs3filekey
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      taxBenefit
      createdAt
      updatedAt
      employeeBonusPlanStatusId
      employeeBonusEmployeeId
      employeeBonusEmployerId
    }
  }
`;
export const deleteEmployeeBonus = /* GraphQL */ `
  mutation DeleteEmployeeBonus(
    $input: DeleteEmployeeBonusInput!
    $condition: ModelEmployeeBonusConditionInput
  ) {
    deleteEmployeeBonus(input: $input, condition: $condition) {
      id
      amount
      startdate
      enddate
      vestingperiod
      vestingfreq
      vestingcliff
      plantype
      activeamount
      amounttovest
      forgivenamount
      interestrate
      PlanStatus {
        id
        status
        actions
        createdAt
        updatedAt
      }
      docs3filekey
      Employee {
        id
        employeeid
        firstname
        lastname
        uei
        imgKey
        imgIdentityId
        startdate
        Department {
          id
          name
          createdAt
          updatedAt
        }
        terminationdate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        emailAddress
        createdAt
        updatedAt
        employeeDepartmentId
        employeeAddressId
        employeeEmployerId
      }
      employeeId
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      employerId
      taxBenefit
      createdAt
      updatedAt
      employeeBonusPlanStatusId
      employeeBonusEmployeeId
      employeeBonusEmployerId
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      provincestate
      country
      postalcode
      createdAt
      updatedAt
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      provincestate
      country
      postalcode
      createdAt
      updatedAt
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      line1
      line2
      city
      provincestate
      country
      postalcode
      createdAt
      updatedAt
    }
  }
`;
export const createEmployer = /* GraphQL */ `
  mutation CreateEmployer(
    $input: CreateEmployerInput!
    $condition: ModelEmployerConditionInput
  ) {
    createEmployer(input: $input, condition: $condition) {
      id
      name
      interestrate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      employerAddressId
    }
  }
`;
export const updateEmployer = /* GraphQL */ `
  mutation UpdateEmployer(
    $input: UpdateEmployerInput!
    $condition: ModelEmployerConditionInput
  ) {
    updateEmployer(input: $input, condition: $condition) {
      id
      name
      interestrate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      employerAddressId
    }
  }
`;
export const deleteEmployer = /* GraphQL */ `
  mutation DeleteEmployer(
    $input: DeleteEmployerInput!
    $condition: ModelEmployerConditionInput
  ) {
    deleteEmployer(input: $input, condition: $condition) {
      id
      name
      interestrate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      employerAddressId
    }
  }
`;
export const createPlanStatus = /* GraphQL */ `
  mutation CreatePlanStatus(
    $input: CreatePlanStatusInput!
    $condition: ModelPlanStatusConditionInput
  ) {
    createPlanStatus(input: $input, condition: $condition) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const updatePlanStatus = /* GraphQL */ `
  mutation UpdatePlanStatus(
    $input: UpdatePlanStatusInput!
    $condition: ModelPlanStatusConditionInput
  ) {
    updatePlanStatus(input: $input, condition: $condition) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const deletePlanStatus = /* GraphQL */ `
  mutation DeletePlanStatus(
    $input: DeletePlanStatusInput!
    $condition: ModelPlanStatusConditionInput
  ) {
    deletePlanStatus(input: $input, condition: $condition) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      employeeid
      firstname
      lastname
      uei
      imgKey
      imgIdentityId
      startdate
      Department {
        id
        name
        createdAt
        updatedAt
      }
      terminationdate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      emailAddress
      createdAt
      updatedAt
      employeeDepartmentId
      employeeAddressId
      employeeEmployerId
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      employeeid
      firstname
      lastname
      uei
      imgKey
      imgIdentityId
      startdate
      Department {
        id
        name
        createdAt
        updatedAt
      }
      terminationdate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      emailAddress
      createdAt
      updatedAt
      employeeDepartmentId
      employeeAddressId
      employeeEmployerId
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      employeeid
      firstname
      lastname
      uei
      imgKey
      imgIdentityId
      startdate
      Department {
        id
        name
        createdAt
        updatedAt
      }
      terminationdate
      Address {
        id
        line1
        line2
        city
        provincestate
        country
        postalcode
        createdAt
        updatedAt
      }
      Employer {
        id
        name
        interestrate
        Address {
          id
          line1
          line2
          city
          provincestate
          country
          postalcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        employerAddressId
      }
      emailAddress
      createdAt
      updatedAt
      employeeDepartmentId
      employeeAddressId
      employeeEmployerId
    }
  }
`;
