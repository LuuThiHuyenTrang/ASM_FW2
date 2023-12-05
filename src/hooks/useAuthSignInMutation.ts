import { formSigninSchema } from '@/common/schema'
import { signin } from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from '@/components/ui/use-toast'

type formControlType = {
    email?: string
    password?: string
}

type useAuthMutationProps = {
    action: 'SIGNIN'
    defaultValues?: formControlType
    onSuccess?: () => void
    onError?: (error: any) => void // Thêm hàm onError
}
export const useAuthSignInMutation = ({
    action,
    defaultValues = { email: '', password: '' },
    onSuccess,
    onError
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: any) => {
            try {
                switch (action) {
                    case 'SIGNIN':
                        return await signin(user)
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
                localStorage.setItem('user', JSON.stringify(data))
                onSuccess && onSuccess()
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
                window.location.reload()
            }
        }
    })

    const form = useForm({
        resolver: joiResolver(formSigninSchema),
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
