import { UserType } from './../types/types';
import axios from "axios";

export const instance = axios.create({ /* Сщздаем обьект экземпляр axios с параметрами*/
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', /* Баззовый url */
    headers: {
        'API-KEY': 'b5154164-ee74-4e2c-80dc-8b3c2d97d06f'
    }
})

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}


