import { PhotosProfileType, ProfileType } from './../types/types';
import { instance, ResponseType } from './api';

type SavePhotoTypeResponseDataType = {
    photos: PhotosProfileType
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data);
    },

    updateStatus(status: string) {
        return instance.put<ResponseType>(`/profile/status`, { status: status })
            .then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData(); /* для передачи файла на сервер */
        formData.append('image', photoFile);
        return instance.put<ResponseType<SavePhotoTypeResponseDataType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile);
    }
};
