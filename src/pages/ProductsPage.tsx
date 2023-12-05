// ProductsPage.tsx

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useProductQuery } from '@/hooks/useProductQuery'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/common/type'

const ProductsPage = () => {
    const { data, isLoading, isError } = useProductQuery()
    const [products, setProducts] = useState<IProduct[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(8)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (data) {
            const filteredProducts = data?.datas.docs.filter((product: IProduct) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setProducts(filteredProducts)
        }
    }, [data, searchTerm])

    const totalPages = Math.ceil((products?.length || 0) / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentPageData = products?.slice(startIndex, endIndex)

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>

    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>DANH SÁCH MÈO ĐẸP</h2>
                    <p className='text-sm text-muted-foreground'>Mèo mèo - Giá ngon - Giá rẻ</p>
                </div>
                <div>
                    <Input
                        type='search'
                        placeholder='Search cat name...'
                        className='lg:w-[250px]'
                        style={{ marginTop: '-14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Separator className='my-4' />

            <div className='relative'>
                <ScrollArea>
                    <div className='grid grid-cols-4 gap-x-4 pb-4' key={'heheh'}>
                        {currentPageData?.map((product: IProduct) => (
                            <div className='space-y-3 mb-6' key={product._id}>
                                <div className='overflow-hidden rounded-md'>
                                    <Link to={'/products/' + product._id}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            width={150}
                                            height={150}
                                            className='w-[250px] h-[150px] object-cover transition-all hover:scale-105'
                                        />
                                    </Link>
                                </div>
                                <div className='space-y-1 text-sm'>
                                    <h3 className='font-medium leading-none'>{product.name}</h3>
                                    <p
                                        className='text-xs text-muted-foreground'
                                        style={{ color: 'red', fontWeight: 'bold' }}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: formatPrice(product.price || 0) }} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ScrollBar orientation='horizontal' />

                    <div className='flex items-center justify-center px-2' style={{ textAlign: 'center' }}>
                        <div className='flex items-center space-x-6 lg:space-x-8'>
                            <div className='flex items-center space-x-2'>
                                <p className='text-sm font-medium'>Sản phẩm mỗi trang</p>
                                <Select
                                    onValueChange={(value) => {
                                        setPageSize(Number(value))
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className='h-8 w-[70px]'>
                                        <SelectValue placeholder={`${pageSize}`} />
                                    </SelectTrigger>
                                    <SelectContent side='top'>
                                        {[8, 16, 24, 32, 40].map((size) => (
                                            <SelectItem key={size} value={`${size}`}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex w-[200px] items-center justify-center text-sm font-medium'>
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Button onClick={handlePrevPage}>
                                    <ChevronLeftIcon />
                                </Button>
                                <Button onClick={handleNextPage}>
                                    <ChevronRightIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}

export default ProductsPage
