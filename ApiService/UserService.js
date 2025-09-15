import api from './http';

export default class UserService {
    static async getUsers(email, password) {
        return api.get('/users');
    }

    static async registration(data) {
        return api.post('/users/registration', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            companyId: data.companyId,
            roles: ['employer'],
        });
    }

    static async updateEmployer(data) {
        return api.put(`/users/updateUser`, {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            companyId: data.companyId,
        });
    }

    static async getUser() {
        return api.get('/admin/current-user');
    }

    static async getAdminById(id) {
        return api.get(`/admin/${id}`);
    }
}
