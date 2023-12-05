import { useProductQuery } from '@/hooks/useProductQuery'
import { Link, useParams } from 'react-router-dom'
import { DateForm, DescForm, ImageForm, NameForm, PriceForm } from './FormEdit'
import { IoArrowBackCircle } from 'react-icons/io5'

const Edit = () => {
    const { id } = useParams()
    const { data } = useProductQuery(id)
    const handleMouseEnter = () => {
        // Hiển thị dòng "Quay lại trang Product Manager" với hiệu ứng mờ đến rõ
        const backText = document.getElementById('back-text')
        if (backText) {
            backText.style.opacity = '1'
        }
    }

    const handleMouseLeave = () => {
        // Ẩn dòng "Quay lại trang Product Manager" với hiệu ứng mờ đến rõ
        const backText = document.getElementById('back-text')
        if (backText) {
            backText.style.opacity = '0'
        }
    }
    return (
        <div>
            Chỉnh sửa thông tin mèo:
            <div className='' style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '50px' }}>
                <div>
                    <NameForm data={data?.datas} />
                </div>
                <div>
                    <PriceForm data={data?.datas} />
                </div>
                <div>
                    <ImageForm data={data?.datas} />
                </div>
                <div>
                    <DateForm data={data?.datas} />
                </div>
                <div>
                    <Link to={'/admin/products'}>
                        <p
                            style={{ fontSize: '72px', margin: '40px 150px', display: 'flex', position: 'relative' }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <IoArrowBackCircle />
                            <span
                                id='back-text'
                                style={{
                                    fontSize: '18px',
                                    marginTop: '20px',
                                    display: 'block',
                                    opacity: '0',
                                    transition: 'opacity 0.4s ease',
                                    position: 'absolute',
                                    top: '-4px',
                                    left: '70px', // Tùy chỉnh khoảng cách từ biểu tượng
                                    maxWidth: '300px', // Giảm độ rộng của nội dung
                                    whiteSpace: 'nowrap', // Ngăn chữ xuống dòng
                                    overflow: 'hidden', // Ẩn phần nội dung vượt quá maxWidth
                                    textOverflow: 'ellipsis' // Hiển thị dấu chấm ở cuối khi nội dung bị cắt
                                }}
                            >
                                Quay lại Product Manager
                            </span>
                        </p>
                    </Link>
                </div>
                <div>
                    <DescForm data={data?.datas} />
                </div>
            </div>
        </div>
    )
}

export default Edit
