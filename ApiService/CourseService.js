import api from './http';

export default class CourseService {

    static async getCourses() {
        const { data } = await api.get('/course');
        return data;
    }

    static async deleteCourse(id) {
        const { data } = await api.delete(`/course/${id}`);
        return data;
    }

    static async createCourser(data) {
        return await api.post('/course', data);
    }

    static async updateCourse(id, data) {
        return await api.put(`/course/${id}`, data, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }

    static async getCourseById(id) {
        const { data } = await api.get(`/course/${id}`);
        return data;
    }
}
