import { formatPrice } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { IProduct } from '@/common/type'

export const getColumns = (removeProduct: any): ColumnDef<IProduct>[] => [
    {
        accessorKey: 'name',
        header: () => <span className='font-bold'>Tên sản phẩm</span>
    },
    {
        accessorKey: 'image',
        header: () => <span className='font-bold'>Ảnh</span>,
        cell: ({ row }) => <img src={row.getValue('image')} width={200} height={150} />
    },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }) => {
            const formattedPrice = formatPrice(row.getValue('price') || 0)

            return <div dangerouslySetInnerHTML={{ __html: formattedPrice }} />
        }
    },
    {
        accessorKey: 'date',
        header: () => <span className='font-bold'>Ngày sinh</span>
    },
    {
        accessorKey: 'description',
        header: () => <span className='font-bold'>Mô tả</span>,
        cell: ({ row }) => <p style={{ width: 250 }}>{row.getValue('description')}</p>
    },
    {
        accessorKey: '',
        header: 'Hành động',
        cell: ({ row }) => {
            return (
                <>
                    <Link to={`/admin/products/${row?.original._id}/edit`}>
                        <Button>Sửa</Button>
                    </Link>
                    &nbsp;
                    <Button
                        variant={'destructive'}
                        onClick={() => {
                            const tb = window.confirm('Xóa mèo này hả?')
                            if (tb) {
                                removeProduct(row?.original!)
                            }
                        }}
                    >
                        Xóa
                    </Button>
                </>
            )
        }
    }
]
