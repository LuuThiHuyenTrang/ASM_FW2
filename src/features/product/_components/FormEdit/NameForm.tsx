import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Pencil } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../../../../components/ui/use-toast'
import { IProduct } from '@/common/type'

type NameFormProps = {
    data: IProduct
}

type FormControlType = {
    name: string
}

const NameForm = ({ data }: NameFormProps) => {
    const { toast } = useToast()
    const [productEditStatus, setProductEditStatus] = useState(false)
    const { form, onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setProductEditStatus(false)
            toast({
                variant: 'success',
                title: 'Chúc mừng bạn cập nhật tên mèo thành công!',
                description: 'Cập nhật tên mèo thành công'
            })
        }
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data.name || '',
                price: data.price || 0,
                date: data.date || '',
                image: data.image || '',
                description: data.description || ''
            })
        }
    }, [data, form])

    const onHandleSubmit: SubmitHandler<FormControlType> = (values) => {
        onSubmit({ ...data, ...values })
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Tên mèo
                <Button variant='ghost' onClick={() => setProductEditStatus(!productEditStatus)}>
                    {productEditStatus ? (
                        <>Hủy</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Chỉnh sửa
                        </>
                    )}
                </Button>
            </div>
            {!productEditStatus && <p className='text-sm mt-2'>{data?.name}</p>}
            {productEditStatus && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='Nhập tên mèo' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Button type='submit'>Lưu</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default NameForm
