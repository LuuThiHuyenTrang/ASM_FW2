import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAuthMutation } from '@/hooks/useAuthSignUpMutation'
import { useNavigate } from 'react-router-dom'
import { FaGithub, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function AuthenticationPage() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { form, onSubmit } = useAuthMutation({
        action: 'SIGN_UP',
        onSuccess: () => {
            toast({
                description: 'Đăng ký thành công',
                variant: 'success'
            })
            form.reset()
            navigate('/signin')
        }
    })

    return (
        <>
            <div className='md:hidden'>
                <img
                    src='https://i.pinimg.com/736x/53/1d/8d/531d8d6e6b86f200b46cf8cf07cbcbf7.jpg'
                    width={1280}
                    height={843}
                    alt='Authentication'
                    className='block dark:hidden'
                />
                <img
                    src='https://i.pinimg.com/736x/53/1d/8d/531d8d6e6b86f200b46cf8cf07cbcbf7.jpg'
                    width={1280}
                    height={843}
                    alt='Authentication'
                    className='hidden dark:block'
                />
            </div>
            <div className='container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
                <Link to='/signin' className={cn({ variant: 'ghost' }, 'absolute right-4 top-4 md:right-8 md:top-8')}>
                    LOGIN
                </Link>
                <div className='relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex'>
                    <div
                        className='absolute inset-0 '
                        style={{
                            backgroundImage:
                                'url(https://i.pinimg.com/736x/53/1d/8d/531d8d6e6b86f200b46cf8cf07cbcbf7.jpg)',
                            backgroundSize: '110%'
                        }}
                    />
                    <div className='relative z-20 flex items-center text-lg font-medium'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='mr-2 h-6 w-6'
                        >
                            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
                        </svg>
                        Shop Cats
                    </div>
                    <div className='relative z-20 mt-auto'>
                        <blockquote className='space-y-2'>
                            <p className='text-lg'>
                                &ldquo;Welcome to the cat shope, register an account to order your favorite cat with
                                thousands of golden incentives..&rdquo;
                            </p>
                            <footer className='text-sm'>Huyen Trang's</footer>
                        </blockquote>
                    </div>
                </div>
                <div className='lg:p-8'>
                    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                        <div className='flex flex-col space-y-2 text-center'>
                            <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                            <p className='text-sm text-muted-foreground'>
                                Please enter your information in the form below
                            </p>
                        </div>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        name='userName'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type='name'
                                                        style={{ margin: '20px 0px', border: '0.1px gray solid' }}
                                                        {...field}
                                                        placeholder='Tên của bạn'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        name='email'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        style={{ margin: '20px 0px', border: '0.1px gray solid' }}
                                                        {...field}
                                                        placeholder='Email của bạn'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        style={{ margin: '20px 0px', border: '0.1px gray solid' }}
                                                        {...field}
                                                        placeholder='Password của bạn'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        name='confirmPassword'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        style={{ margin: '20px 0px', border: '0.1px gray solid' }}
                                                        {...field}
                                                        placeholder='Nhập lại mật khẩu của bạn'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <Button type='submit' variant='destructive' style={{ margin: '10px 130px' }}>
                                        Register
                                    </Button>
                                </form>
                            </Form>
                            <div className='relative'>
                                <div className='absolute inset-0 flex items-center'>
                                    <span className='w-full border-t' />
                                </div>
                                <div className='relative flex justify-center text-xs uppercase'>
                                    <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <Button variant='outline' type='button'>
                                    <FaGithub className='mr-2 h-4 w-4' />
                                    Github
                                </Button>
                                <Button variant='outline' type='button' style={{ margin: '0 10px' }}>
                                    <FcGoogle className='mr-2 h-4 w-4' />
                                    Google
                                </Button>
                                <Button variant='outline' type='button'>
                                    <FaFacebook className='mr-2 h-4 w-4' />
                                    Facebook
                                </Button>
                            </div>
                        </div>
                        <p className='px-8 text-center text-sm text-muted-foreground'>
                            By clicking continue, you agree to our{' '}
                            <Link to='/signin' className='underline underline-offset-4 hover:text-primary'>
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to='/signin' className='underline underline-offset-4 hover:text-primary'>
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
