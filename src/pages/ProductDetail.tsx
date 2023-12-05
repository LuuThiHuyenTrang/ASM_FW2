import { useProductQuery } from '@/hooks/useProductQuery'
import { formatPrice } from '@/lib/utils'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { data } = useProductQuery(id)
    //console.log(data)

    return (
        <div>
            PRODUCT DETAIL PAGE
            <hr />
            <br />
            <h1 style={{ color: 'purple' }}>{data?.datas.name}</h1>
            <p style={{ color: 'purple' }}>{data?.datas.date}</p>
            <img
                src={data?.datas.image}
                alt='Photo by Drew Beamer'
                className='rounded-md object-cover'
                width={500}
                style={{ margin: '0 auto' }}
            />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>
                    <div dangerouslySetInnerHTML={{ __html: formatPrice(data?.datas.price || 0) }} />
                </h1>
                <p style={{ color: 'purple' }}>{data?.datas.description}</p>
            </div>
        </div>
    )
}

export default ProductDetailPage
