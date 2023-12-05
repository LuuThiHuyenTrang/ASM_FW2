import { IAuth } from '@/common/type'
import instance from '@/core/api'

export const signup = async (user: any) => {
    try {
        const response = await instance.post(`/auth/signup`, user)
        return response.data
    } catch (error) {
        console.error('SIGNUP_ERROR')
        throw error // Đẩy lỗi để react-query xử lý
    }
}

export const signin = async (user: any) => {
    try {
        const response = await instance.post(`/auth/signin`, user)
        return response.data
    } catch (error) {
        console.error('SIGNIN_ERROR')
        throw error // Đẩy lỗi để react-query xử lý
    }
}

export const updateUser = async (user: IAuth) => {
    try {
        const response = await instance.put(`/auth/update`, user)
        return response.data
    } catch (error) {
        console.error('UPDATE_USER_ERROR', error)
        throw error // Throw the error to let react-query handle it
    }
}
