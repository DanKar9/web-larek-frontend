

export interface IProduct {
   id: string,
   description : string,
   image : string,
   title: string,
   category: string,
   price: number| null
}

export interface IUser {
   payment: string,
   email: string,
   phone: string,
   address: string,
   total:number,
   items:string[]
}

export interface IProductsData {
   products: IProduct[];
   preview: string | null;
}

export interface IOrder {
   total:number,
   id: string
}

export interface IBasket {
   total:number,
   items:string[]
}

export type TOrderForm = Omit<IUser, 'total' | 'items'>
export type TCardBascet = Pick<IProduct,'id'| 'title' | 'price' >

export type TPayMethod = 'cash' | 'card'

export type TUserInfoContacts = Pick<IUser, 'payment' | 'address' |'email' | 'phone'>



