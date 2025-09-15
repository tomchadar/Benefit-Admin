import api from './http';

export default class AuthService {
    static async login(data) {
        try {
            const response = await api.post('/admin/login', {
                email: data.email,
                password: data.password,
            });
            return response ? response.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async registration(data) {
        return api.post('/admin/registration', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            roles: ['admin'],
        });
    }

    static async employeeReg(data) {
        return api.post('/employee/registration', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: 'password',
            roles: ['employee'],
            phone: data.phone,
            departmentId: data.departmentId,
            employerId: data.employerId,
            employeeId: data.employeeId,
            uei: data.uei,
            startDate: data.startDate,
            companyId: data.companyId,
        });
    }

    static async activateUser({ code, userId }) {
        try {
            const response = await api.post(
                `/admin/activate?code=${code}&id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async resendCode({ userId }) {
        try {
            const response = await api.post(
                `/admin/resend-activate?id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async confirmAuthCode({ code, userId }) {
        try {
            const response = await api.post(
                `/admin/confirm-auth?code=${code}&id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async resendConfirmAuthCode({ userId }) {
        try {
            const response = await api.post(
                `/admin/resend-confirm-auth?id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async logout() {
        return api.post('/users/logout');
    }
}
