import { IProduct } from '@/common/type'
import { addProduct, deleteProduct, updateProduct } from '@/services/product'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
type formControlDataType = {
    name: string
    price: number
    image: string
    date: string
    description: string
}
// Định validate form sử dụng joi
const formSchema = Joi.object({
    name: Joi.string().required().min(2).messages({
        'string.empty': 'Tên không được để trống',
        'any.required': 'Trường tên là bắt buộc'
    }),
    price: Joi.number().min(0).required().messages({
        'number.empty': ' Giá không được để trống',
        'any.required': 'Vui lòng nhập giá',
        'number.min': 'Giá phải lớn hơn {#limit}'
    }),
    image: Joi.string().required().min(6).messages({
        'string.empty': 'image không được để trống',
        'any.require': 'Trường image là bắt buộc'
    }),
    description: Joi.string().required().min(4).messages({
        'string.empty': 'description không được để trống',
        'any.require': 'Trường description là bắt buộc'
    }),
    date: Joi.string().required().min(4).messages({
        'string.empty': 'date không được để trống',
        'any.require': 'Trường date là bắt buộc'
    })
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IProduct
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = { name: '', price: 0, image: '', description: '', date: '' },
    onSuccess
}: useProductMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case 'ADD':
                    return await addProduct(product)
                case 'UPDATE':
                    return await updateProduct(product)
                case 'DELETE':
                    return await deleteProduct(product)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['PRODUCTS']
            })
            if (action !== 'DELETE') {
                return window.location.reload()
            }
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<formControlDataType> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (product: IProduct) => {
        mutate(product)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
