import { formSignupSchema } from '@/common/schema'
import { signup } from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from '@/components/ui/use-toast'

type formControlType = {
    userName?: string
    email?: string
    password?: string
    confirmPassword?: string
}

type useAuthMutationProps = {
    action: 'SIGN_UP'
    defaultValues?: formControlType
    onSuccess?: () => void
    onError?: (error: any) => void // Thêm hàm onError
}
export const useAuthMutation = ({
    action,
    defaultValues = { userName: '', email: '', password: '', confirmPassword: '' },
    onSuccess,
    onError
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: any) => {
            try {
                switch (action) {
                    case 'SIGN_UP':
                        return await signup(user)
                    default:
                        return null
                }
            } catch (error: any) {
                console.log(error.response.data.message)
                toast({
                    description: `Thất bại: ${error.response.data.message}`,
                    variant: 'error'
                })
                return error // Trả về error để react-query xử lý
            }
        },
        onSuccess: (data) => {
            if (data.name !== 'AxiosError') {
                onSuccess && onSuccess()
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
            }
        }
    })

    const form = useForm({
        resolver: joiResolver(formSignupSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<any> = (values) => {
        mutate(values)
    }

    return {
        form,
        onSubmit,
        onError,
        ...rest
    }
}
