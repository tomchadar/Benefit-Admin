import api from './http';

export default class EmployeeService {
    static async createDepartment(data) {
        return await api.post('/department', {
            name: data.name,
        });
    }

    static async getDepartments() {
        const { data } = await api.get('/department');
        return data;
    }

    static async getEmployees(id) {
        const { data } = await api.get(`/employee/get-employee/${id}`);
        return data;
    }

    static async updateEmployee(data) {
        return await api.put('/employee/update-employee', data);
    }

    static async getEmployeeById(id) {
        const { data } = await api.get(`/employee/${id}`);
        return data;
    }

    static async getAllEmployees() {
        const { data } = await api.get('/employee');
        return data;
    }

    static async getAllAdmins() {
        const { data } = await api.get('/admin');
        return data;
    }

    static async getEmployers() {
        const { data } = await api.get('/users');
        return data;
    }

    static async getTransactions() {
        const { data } = await api.get('/transactions');
        return data;
    }

    static async getTransactionById(id) {
        const { data } = await api.get(`/transactions/${id}`);
        return data;
    }

    static async updateTransaction(data) {
        return await api.put('/transactions/update', data);
    }

    static async deleteTransaction(id) {
        const { data } = await api.delete(`/transactions/delete/${id}`);
        return data;
    }

    static async deleteEmployee(id) {
        const { data } = await api.delete(`/employee/${id}`);
        return data;
    }

    static async deleteEmployer(id) {
        const { data } = await api.delete(`/users/${id}`);
        return data;
    }

    static async createBonusPlan(plan) {
        return await api.post('/bonuses', plan);
    }

    static async updateBonusPlan(plan) {
        return await api.put('/bonuses', plan);
    }

    static async getBonusPlanById(params) {
        const { data } = await api.get(`/bonuses/${params.queryKey[1]}`);
        return data;
    }

    static async getBonusesByEmployerId(params) {
        const { data } = await api.get(
            `/bonuses/employer/${params.queryKey[1]}`
        );
        return data;
    }

    static async getBonusesByEmployee() {
        const { data } = await api.get('/bonuses/bonuses-by-employee');
        return data;
    }

    static async getCompanies() {
        const { data } = await api.get('/company');
        return data;
    }

    static async createCompany(company) {
        return await api.post('/company', company);
    }

    static async createTransaction(transaction) {
        return await api.post('/transactions', transaction);
    }

    static async editCompany(company) {
        return await api.put('/company', company);
    }

    static async getCompanyById(id) {
        const { data } = await api.get(`/company/${id}`);
        return data;
    }

    static async getEmployeesByCompanyId(id) {
        const { data } = await api.get(`/employee/get-employees/${id}`);
        return data;
    }

    static async deleteCompany(id) {
        const { data } = await api.delete(`/company/${id}`);
        return data;
    }

    static async getEmployerById(id) {
        const { data } = await api.get(`/users/${id}`);
        return data;
    }
}
