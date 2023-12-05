// BaseLayout.tsx

import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserNav } from './user-nav'

const BaseLayout = () => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <div className='hidden md:block'>
                <Menubar
                    className='rounded-none border-b border-none px-2 lg:px-4'
                    style={{ marginTop: '10px', marginBottom: '10px', borderBottom: '1px red solid' }}
                >
                    <MenubarMenu>
                        <Link to={'/'}>
                            <MenubarTrigger className='font-bold'>Home</MenubarTrigger>
                        </Link>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Link to={'/products'}>
                            <MenubarTrigger className='relative'>Shop</MenubarTrigger>
                        </Link>
                    </MenubarMenu>
                    <div style={{ display: 'flex', marginTop: '40px', marginLeft: 'auto' }}>
                        {/* <div>
                            <Input
                                type='search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Search cat name...'
                                className='lg:w-[250px]'
                                style={{ marginTop: '-14px' }}
                            />
                            search product
                        </div> */}
                        {user !== null ? (
                            <UserNav />
                        ) : (
                            <div style={{ marginTop: '-35px' }}>
                                <Link to={'/signin'}>
                                    <Button>Log-in</Button>
                                </Link>
                                <Link to={'/signup'}>
                                    <Button>Register</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </Menubar>
                <div style={{ margin: '30px 150px' }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default BaseLayout
