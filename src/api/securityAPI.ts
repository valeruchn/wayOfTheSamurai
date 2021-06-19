import { instance } from './api'

type GetCapthaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptchaURL() {
        const result = await instance.get<GetCapthaUrlResponseType>(`security/get-captcha-url`)
        return result.data
    }
}
