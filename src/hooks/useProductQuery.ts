// hooks/useProductQuery.ts
import { useQuery } from 'react-query'
import { getProduct, getProducts } from '@/services/product'
import { useEffect, useState } from 'react'

export const useProductQuery = (productId?: string, _sort?: string) => {
    const { data, isLoading, isError, ...rest } = useQuery({
        queryKey: productId ? ['PRODUCTS', productId, _sort] : ['PRODUCTS', _sort],
        queryFn: () => (productId ? getProduct(productId) : getProducts(_sort)),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    // State để theo dõi isLoading và giữ cho giá trị không bị thay đổi trong 500ms
    const [delayedLoading, setDelayedLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedLoading(isLoading)
        }, 500)

        // Clear the timer if the component unmounts
        return () => clearTimeout(timer)
    }, [isLoading])

    return { data, isLoading: delayedLoading, isError, ...rest }
}
