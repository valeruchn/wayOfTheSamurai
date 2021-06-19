import { GetItemsType, instance, ResponseType } from './api'


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowRequest(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data) as Promise<ResponseType>
    },

    followRequest(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}
