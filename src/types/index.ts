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
   getProducts():IProduct[];
   getProduct(id:string) : IProduct;
   setProduct(product: IProduct[]): void;
   savePreview(product:IProduct): void;
   saveProduct(product:IProduct):void
}

export interface IBasket {
   items: TCardBascet[]
   total: number | null,
   addProductBasket(product:IProduct):void;
   deleteProduct(productId:string):void;
   deleteBasket(product:TCardBascet):void;
   checkValidation(data: Record<keyof TUserInfoContacts,string>) :boolean
}


export type TCardBascet = Pick<IProduct,'id'| 'title' | 'price' >



export type TUserInfoContacts = Pick<IUser, 'payment' | 'address' |'email' | 'phone'>