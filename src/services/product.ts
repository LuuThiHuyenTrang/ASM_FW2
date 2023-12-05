import { IProduct } from '@/common/type'
import instance from '../core/api'

// services/product.js
export const getProducts = async (_sort?: string) => {
    try {
        const response = await instance.get(`/products${_sort ? `?_order=${_sort}` : ''}`)
        return response.data
    } catch (error) {
        //xu ly loi neu can
        console.error('FETCH_PRODUCTS_ERROR', error)
        throw error
    }
}
// Trong SortProPrice
export const SortProPrice = async (_sort: string) => {
    try {
        return await getProducts(_sort)
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần
        console.error('FETCH_PRODUCTS_ERROR', error)
        throw error
    }
}

export const getProduct = async (productId: string) => {
    try {
        const response = await instance.get(`/products/${productId}`)
        return response.data
    } catch (error) {
        //xu ly loi neu can
        console.error('FETCH_PRODUCT_ERROR', error)
        throw error
    }
}
export const updateProduct = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/${product._id}`, product)
        return response.data
    } catch (error) {
        //xu ly loi neu can
        console.log(`['UPDATE_PRODUCT_ERROR']`, error)
    }
}
export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post('/products/', product)
        return response.data
    } catch (error) {
        console.log(`['ADD_PRODUCT_ERROR']`, error)
    }
}
export const deleteProduct = async (product: IProduct) => {
    try {
        // JSON-server {}
        await instance.delete(`/products/${product._id}`)

        // Nodejs
        // const response = await instance.delete(`/products/${product.id}`)
        // return response.data
    } catch (error) {
        console.log(`['DELETE_PRODUCT_ERROR']`, error)
    }
}
