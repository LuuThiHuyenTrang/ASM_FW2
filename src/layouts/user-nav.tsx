import { IAuth } from '@/common/type'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChangePasswordPage } from '@/pages/auth/ChangePasswordPage'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const UserNav = () => {
    const urlWeb = window.location.href
    const navigate = useNavigate()

    const [user, setUser] = useState<IAuth>()
    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('user') as any)
        setUser(userStorage?.user)
    }, [])

    const Logout = () => {
        localStorage.removeItem('user')
        window.location.reload()
        navigate('/signin')
    }

    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

    const handleOpenChangePassword = () => {
        setIsChangePasswordOpen(true)
    }

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false)
    }

    const handleChangePasswordClick = () => {
        handleOpenChangePassword()
    }
    if (user)
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='ghost'
                            className={'relative ' + (urlWeb.endsWith('admin') ? 'h-32 w-36' : 'h-16 w-246')}
                        >
                            <Avatar className='h-full w-full' style={{ marginTop: '-50px' }}>
                                <AvatarImage
                                    src='https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-user-id-login-image-png-image_1648074.jpg'
                                    alt='@shadcn'
                                    className={
                                        urlWeb.endsWith('admin')
                                            ? 'border-2 border-solid border-white rounded-full overflow-hidden'
                                            : 'border-2 border-solid border-red-500 rounded-full overflow-hidden'
                                    }
                                />
                                <AvatarFallback>{user?.userName}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56' align='end' forceMount>
                        <DropdownMenuLabel className='font-normal'>
                            <div className='flex flex-col space-y-1'>
                                <p className='text-sm font-medium leading-none'>{user?.userName}</p>
                                <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {user?.role === 'admin' ? (
                                <Link to={'/admin'}>
                                    <DropdownMenuItem>Admin</DropdownMenuItem>
                                </Link>
                            ) : (
                                ''
                            )}
                            <DropdownMenuItem onClick={handleChangePasswordClick}>Change Password</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={Logout}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {isChangePasswordOpen && <ChangePasswordPage onClose={handleCloseChangePassword} />}
            </>
        )
}
