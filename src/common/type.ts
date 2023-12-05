export interface IProduct {
    _id?: string
    name: string
    price: number
    description: string
    image: string
    date: string
}

export interface IAuth {
    _id?: string
    userName: string
    email: number
    password: string
    confirmPassword: string
    role: string
}
