import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaHome, FaProductHunt } from 'react-icons/fa'
import { UserNav } from './user-nav'
const AdminLayout = () => {
    return (
        <>
            <div className='hidden md:block'>
                <div className='border-t'>
                    <div className='bg-background'>
                        <div className='grid lg:grid-cols-5'>
                            <div
                                className='pb-12 col-span-1'
                                style={{ backgroundColor: 'black', color: 'white', width: 300 }}
                            >
                                <div className='space-y-4 py-4'>
                                    <div className='px-3 py-2' style={{ paddingBottom: 500 }}>
                                        <h2
                                            className='mb-2 ml-2 text-lg font-semibold tracking-tight'
                                            style={{ textAlign: 'center' }}
                                        >
                                            <UserNav /> <br />
                                            Manager
                                        </h2>
                                        <div className='space-y-1'>
                                            <Link to={'/'}>
                                                <Button
                                                    variant='secondary'
                                                    className='w-full justify-start mb-2 text-x text-black'
                                                    style={{ height: 28 }}
                                                >
                                                    <FaHome />
                                                    &nbsp; Home
                                                </Button>
                                            </Link>
                                            <Link to={'/admin/products'}>
                                                <Button
                                                    variant='secondary'
                                                    className='w-full justify-start text-x text-black mb-2'
                                                    style={{ height: 28 }}
                                                >
                                                    <FaProductHunt /> &nbsp; Product Manager
                                                </Button>
                                            </Link>
                                            {/* <Link to={'/admin/user'}>
                                                <Button
                                                    variant='secondary'
                                                    className='w-full justify-start text-x text-black'
                                                    style={{ height: 28 }}
                                                >
                                                    <FaProductHunt /> &nbsp; User Manager
                                                </Button>
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-4 lg:border-l'>
                                <div className='h-full px-4 py-6 lg:px-8'>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
