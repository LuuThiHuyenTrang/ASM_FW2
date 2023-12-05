import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Pencil } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../../../../components/ui/use-toast'
import { IProduct } from '@/common/type'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

type ImageFormProps = {
    data: IProduct
}

type FormControlType = {
    image: string
}

const ImageForm = ({ data }: ImageFormProps) => {
    const { toast } = useToast()
    const [productEditStatus, setProductEditStatus] = useState(false)
    const { form, onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setProductEditStatus(false)
            toast({
                variant: 'success',
                title: 'Chúc mừng bạn cập nhật image mèo thành công!',
                description: 'Cập nhật image mèo thành công'
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
                Image
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
            {!productEditStatus && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <img src={data?.image} alt='anh meo' width={60} height={60} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md text-center'>
                        <img src={data?.image} alt='anh meo' width={700} height={700} />
                        <h1>{data?.name}</h1>
                    </DialogContent>
                </Dialog>
            )}
            {productEditStatus && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className='flex flex-col gap-y-8'>
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='Nhập image' />
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

export default ImageForm
