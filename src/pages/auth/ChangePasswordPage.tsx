import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { useAuthUpdateMutation } from './../../hooks/useAuthUpdateMutation'
import { useNavigate } from 'react-router-dom'

type ChangePasswordPageProps = {
    onClose: () => void
}

export function ChangePasswordPage({ onClose }: ChangePasswordPageProps) {
    const navigate = useNavigate()
    const { form, onSubmit } = useAuthUpdateMutation({
        action: 'UPDATE_USER',
        onSuccess: () => {
            toast({
                description: 'Đổi mật khẩu thành công, Mời bạn đăng nhập lại!',
                variant: 'success'
            })
            form.reset()
            onClose()

            // Chuyển hướng đến trang đăng nhập
            navigate('/signin')
            window.location.reload()

            // Xóa dữ liệu người dùng từ localStorage
            localStorage.removeItem('user')
        }
    })

    const handleClose = () => {
        onClose()
    }

    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Thay Đổi Mật Khẩu</SheetTitle>
                    <SheetDescription>Nhập mật khẩu mới của bạn dưới đây.</SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid gap-4 py-4'>
                            <FormField
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type='password' {...field} placeholder='Mật Khẩu Mới' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type='password' {...field} placeholder='Nhập Lại Mật Khẩu Mới' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <SheetFooter>
                            <Button type='button' onClick={handleClose}>
                                Hủy
                            </Button>
                            <SheetClose asChild>
                                <Button type='submit'>Lưu Thay Đổi</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
