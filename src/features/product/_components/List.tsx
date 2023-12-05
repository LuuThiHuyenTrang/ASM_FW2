// features/product/_components/List.tsx
import React from 'react'
import { useProductQuery } from '@/hooks/useProductQuery'
import { DataTable } from './DataTable'
import { getColumns } from './Column'
import { useToast } from '@/components/ui/use-toast'
import { useProductMutation } from '@/hooks/useProductMutation'

const List = ({ sort }: { sort: string }) => {
    const { toast } = useToast()
    const { data, isLoading, isError } = useProductQuery(undefined, sort)
    console.log('🚀 ~ file: List.tsx:12 ~ List ~ data:', data)

    const { onRemove } = useProductMutation({
        action: 'DELETE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chúc mừng bạn đã xóa mèo thành công!!',
                description: 'Mèo xóa thành công'
            })
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>

    const columns = getColumns(onRemove)

    return <DataTable columns={columns} data={data?.datas.docs} />
}

export default List
