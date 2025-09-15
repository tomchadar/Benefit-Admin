/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBenefitUser = /* GraphQL */ `
  subscription OnCreateBenefitUser(
    $filter: ModelSubscriptionBenefitUserFilterInput
  ) {
    onCreateBenefitUser(filter: $filter) {
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
export const onUpdateBenefitUser = /* GraphQL */ `
  subscription OnUpdateBenefitUser(
    $filter: ModelSubscriptionBenefitUserFilterInput
  ) {
    onUpdateBenefitUser(filter: $filter) {
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
export const onDeleteBenefitUser = /* GraphQL */ `
  subscription OnDeleteBenefitUser(
    $filter: ModelSubscriptionBenefitUserFilterInput
  ) {
    onDeleteBenefitUser(filter: $filter) {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
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
export const onCreateEmployeeBonus = /* GraphQL */ `
  subscription OnCreateEmployeeBonus(
    $filter: ModelSubscriptionEmployeeBonusFilterInput
  ) {
    onCreateEmployeeBonus(filter: $filter) {
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
export const onUpdateEmployeeBonus = /* GraphQL */ `
  subscription OnUpdateEmployeeBonus(
    $filter: ModelSubscriptionEmployeeBonusFilterInput
  ) {
    onUpdateEmployeeBonus(filter: $filter) {
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
export const onDeleteEmployeeBonus = /* GraphQL */ `
  subscription OnDeleteEmployeeBonus(
    $filter: ModelSubscriptionEmployeeBonusFilterInput
  ) {
    onDeleteEmployeeBonus(filter: $filter) {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
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
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
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
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
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
export const onCreateEmployer = /* GraphQL */ `
  subscription OnCreateEmployer($filter: ModelSubscriptionEmployerFilterInput) {
    onCreateEmployer(filter: $filter) {
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
export const onUpdateEmployer = /* GraphQL */ `
  subscription OnUpdateEmployer($filter: ModelSubscriptionEmployerFilterInput) {
    onUpdateEmployer(filter: $filter) {
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
export const onDeleteEmployer = /* GraphQL */ `
  subscription OnDeleteEmployer($filter: ModelSubscriptionEmployerFilterInput) {
    onDeleteEmployer(filter: $filter) {
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
export const onCreatePlanStatus = /* GraphQL */ `
  subscription OnCreatePlanStatus(
    $filter: ModelSubscriptionPlanStatusFilterInput
  ) {
    onCreatePlanStatus(filter: $filter) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlanStatus = /* GraphQL */ `
  subscription OnUpdatePlanStatus(
    $filter: ModelSubscriptionPlanStatusFilterInput
  ) {
    onUpdatePlanStatus(filter: $filter) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlanStatus = /* GraphQL */ `
  subscription OnDeletePlanStatus(
    $filter: ModelSubscriptionPlanStatusFilterInput
  ) {
    onDeletePlanStatus(filter: $filter) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onCreateDepartment(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onUpdateDepartment(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment(
    $filter: ModelSubscriptionDepartmentFilterInput
  ) {
    onDeleteDepartment(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onCreateEmployee(filter: $filter) {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onUpdateEmployee(filter: $filter) {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onDeleteEmployee(filter: $filter) {
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
