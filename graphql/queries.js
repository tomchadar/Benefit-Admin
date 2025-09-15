/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBenefitUser = /* GraphQL */ `
  query GetBenefitUser($emailAddress: String!) {
    getBenefitUser(emailAddress: $emailAddress) {
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
export const listBenefitUsers = /* GraphQL */ `
  query ListBenefitUsers(
    $emailAddress: String
    $filter: ModelBenefitUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBenefitUsers(
      emailAddress: $emailAddress
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        emailAddress
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        employerId
        createdAt
        updatedAt
        benefitUserEmployerId
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
export const getEmployeeBonus = /* GraphQL */ `
  query GetEmployeeBonus($id: ID!) {
    getEmployeeBonus(id: $id) {
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
export const listEmployeeBonuses = /* GraphQL */ `
  query ListEmployeeBonuses(
    $filter: ModelEmployeeBonusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeeBonuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEmployer = /* GraphQL */ `
  query GetEmployer($id: ID!) {
    getEmployer(id: $id) {
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
export const listEmployers = /* GraphQL */ `
  query ListEmployers(
    $filter: ModelEmployerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlanStatus = /* GraphQL */ `
  query GetPlanStatus($id: ID!) {
    getPlanStatus(id: $id) {
      id
      status
      actions
      createdAt
      updatedAt
    }
  }
`;
export const listPlanStatuses = /* GraphQL */ `
  query ListPlanStatuses(
    $filter: ModelPlanStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlanStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        actions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const userByBenefitEmployer = /* GraphQL */ `
  query UserByBenefitEmployer(
    $employerId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelBenefitUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByBenefitEmployer(
      employerId: $employerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        emailAddress
        Employer {
          id
          name
          interestrate
          createdAt
          updatedAt
          employerAddressId
        }
        employerId
        createdAt
        updatedAt
        benefitUserEmployerId
      }
      nextToken
    }
  }
`;
export const transactionByEmployeeId = /* GraphQL */ `
  query TransactionByEmployeeId(
    $employeeId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionByEmployeeId(
      employeeId: $employeeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
export const transactionByEmployerId = /* GraphQL */ `
  query TransactionByEmployerId(
    $employerId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionByEmployerId(
      employerId: $employerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
export const bonusByEmployee = /* GraphQL */ `
  query BonusByEmployee(
    $employeeId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeBonusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bonusByEmployee(
      employeeId: $employeeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
export const bonusByEmployerId = /* GraphQL */ `
  query BonusByEmployerId(
    $employerId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeBonusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bonusByEmployerId(
      employerId: $employerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          terminationdate
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
      nextToken
    }
  }
`;
