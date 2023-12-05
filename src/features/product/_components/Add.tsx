import { useProductMutation } from '@/hooks/useProductMutation'
import { Button } from '../../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { useToast } from '../../../components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chúc mừng bạn đã thêm mèo thành công!!',
                description: 'Em đã thêm mèo thành công'
            })

            navigate('/admin/products')
        }
    })

    return (
        <div className='border p-6'>
            <h2 className='text-xl font-bold'>Thêm mèo</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Tên mèo</FormLabel>
                                <FormControl>
                                    <Input placeholder='Tên mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Giá</FormLabel>
                                <FormControl>
                                    <Input placeholder='Giá mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ảnh</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ảnh mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ngày sinh</FormLabel>
                                <FormControl>
                                    <Input type={'date'} placeholder='Ngày sinh của mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Mô tả</FormLabel>
                                <FormControl>
                                    <Input placeholder='Mô tả mèo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit'>Thêm</Button>
                </form>
            </Form>
        </div>
    )
}

export default Add
