import Add from '@/features/product/_components/Add'
import Edit from '@/features/product/_components/Edit'
import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage'
import ProductDetailPage from '@/pages/ProductDetail'
import ProductsPage from '@/pages/ProductsPage'
import { ChangePasswordPage } from '@/pages/auth/ChangePasswordPage'
import SigninPage from '@/pages/auth/Signin'
import SignupPage from '@/pages/auth/Signup'
import ManageDashboardPage from '@/pages/manager/dashboard'
import ManagerProductPage from '@/pages/manager/product'
import { Route, Routes } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'

const NotFoundPage = () => {
    // You can customize this component to display a "Page Not Found" message.
    return <div>Page Not Found</div>
}

const Routers = () => {
    const userStorage = JSON.parse(localStorage.getItem('user') as any)

    return (
        <Routes>
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:id' element={<ProductDetailPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path='signin' element={<SigninPage />} />
            </Route>
            <Route
                path='admin'
                element={
                    <PrivateRouter user={userStorage} allowedRoles={['admin']}>
                        <AdminLayout />
                    </PrivateRouter>
                }
            >
                <Route index element={<ManagerProductPage />} />
                <Route path='products' element={<ManagerProductPage />} />
                <Route path='products/add' element={<Add />} />
                <Route path='products/:id/edit' element={<Edit />} />
            </Route>
            {/* Catch-all route for Page Not Found */}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default Routers
