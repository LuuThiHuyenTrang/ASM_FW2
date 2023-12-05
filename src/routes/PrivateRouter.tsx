import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouterProps = {
    user: any
    children: React.ReactNode
    routerPath?: string
    allowedRoles?: string[] // Thêm prop allowedRoles để kiểm tra vai trò
}

const PrivateRouter = ({
    user,
    children,
    routerPath = '/signin',
    allowedRoles = [] // Mặc định là mảng trống nếu không được cung cấp
}: PrivateRouterProps) => {
    console.log(user)

    // Kiểm tra xem người dùng có đăng nhập không
    if (!user || Object.keys(user).length === 0) {
        toast({
            description: 'Bạn chưa đăng nhập',
            variant: 'error'
        })
        return <Navigate to={routerPath} />
    }

    // Kiểm tra xem người dùng có vai trò cần thiết không
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.user.role)) {
        // Chuyển hướng hoặc hiển thị thông báo không được phép truy cập dựa trên yêu cầu của bạn
        toast({
            description: 'Bạn không có quyền truy cập',
            variant: 'error'
        })
        return <Navigate to={routerPath} />
    }

    return children
}

export default PrivateRouter
