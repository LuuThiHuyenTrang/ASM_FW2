import { updateUserSchema } from '@/common/schema'
import { updateUser } from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from '@/components/ui/use-toast'

type formControlType = {
    _id?: string
    userName?: string
    email?: string
    password?: string
    confirmPassword?: string
}

type useAuthMutationProps = {
    action: 'UPDATE_USER'
    defaultValues?: formControlType
    onSuccess?: () => void
    onError?: (error: any) => void // Thêm hàm onError
}

const user = JSON.parse(localStorage.getItem('user') as string)

export const useAuthUpdateMutation = ({
    action,
    defaultValues = {
        _id: user?.user._id,
        userName: user?.user.userName,
        email: user?.user.email,
        password: '',
        confirmPassword: ''
    },
    onSuccess,
    onError
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: any) => {
            try {
                switch (action) {
                    case 'UPDATE_USER':
                        return await updateUser(user)
                    default:
                        return null
                }
            } catch (error: any) {
                toast({
                    description: `Thất bại: ${error.response.data.message}`,
                    variant: 'error'
                })
                return error // Trả về error để react-query xử lý
            }
        },
        onSuccess: (data) => {
            // Dùng rest.data để kiểm tra xem có dữ liệu trả về không
            if (rest.data) {
                if (data.name !== 'AxiosError') {
                    onSuccess && onSuccess()
                    queryClient.invalidateQueries({
                        queryKey: ['user']
                    })
                }
            }
        }
    })

    const form = useForm({
        resolver: joiResolver(updateUserSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<any> = (values) => {
        console.log('🚀 ~ file: useAuthUpdateMutation.ts:69 ~ values:', values)
        mutate(values)
    }

    return {
        form,
        onSubmit,
        onError,
        ...rest
    }
}
