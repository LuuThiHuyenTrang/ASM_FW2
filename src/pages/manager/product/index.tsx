// pages/admin/ManagerProductPage.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import List from '@/features/product/_components/List'
import { GiHealthIncrease } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { SortProPrice } from '@/services/product'

const ManagerProductPage = () => {
    const [sort, setSort] = useState('')

    const handleSort = async (_sort: string) => {
        try {
            await SortProPrice(_sort)
            setSort(_sort)
        } catch (error) {
            console.error('SORT_PRODUCTS_ERROR', error)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Quản lý sản phẩm</h2>
                <Button onClick={() => handleSort('asc')}>
                    <GrFormAdd />
                </Button>
                <Button onClick={() => handleSort('desc')}>
                    <GrFormSubtract />
                </Button>
                <Link to={'/admin/products/add'}>
                    <GiHealthIncrease />
                </Link>
            </div>
            <List sort={sort} />
        </div>
    )
}

export default ManagerProductPage
