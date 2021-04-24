import axios from "axios";

const instance = axios.create({ /* Сщздаем обьект экземпляр axios с параметрами*/
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', /* Баззовый url */
    headers: {
        'API-KEY': 'b5154164-ee74-4e2c-80dc-8b3c2d97d06f'
    }
})

export const usersAPI = {

    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowRequest(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

    followRequest(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    }

}

export const authAPI = {

    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    login(email, password, rememberMe = false) {
        return instance.post('auth/login', { email, password, rememberMe })
            .then(response => response.data)
    },

    logout() {
        return instance.delete('auth/login')
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put(`/profile/status`, { status: status })
            .then(response => response.data)
    },
    savePhoto(photoFile) {
        const formData = new FormData() /* для передачи файла на сервер */
        formData.append('image', photoFile)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}