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
}

export interface IProductsData {
   products: IProduct[];
   preview: string | null;
}




export type TCardBascet = Pick<IProduct,'id'| 'title' | 'price' >



export type TUserInfoContacts = Pick<IUser, 'payment' | 'address' |'email' | 'phone'>