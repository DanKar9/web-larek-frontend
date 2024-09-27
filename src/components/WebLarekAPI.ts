import { IProduct, IOrder, IUser } from './../types/index';
import { Api, ApiListResponse } from './base/api';

export interface IAuctionAPI {
    getLotList:()=> Promise<IProduct[]>
    getLotItem: (id:string) => Promise<IProduct>
    orderLots:(order:IUser) => Promise<IOrder>
}

export class WebLarekAPI extends Api implements IAuctionAPI{
    readonly cdn:string

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getLotItem(id:string):Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item:IProduct) => ({
                ...item,
                image: this.cdn + item.image
            })
        )
    }

    getLotList():Promise<IProduct[]> {
        return this.get('/product').then((data:ApiListResponse<IProduct>) => 
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        }))
        )
    }

    orderLots(order:IUser):Promise<IOrder> {
        return  this.post(`/order`,order).then(
            (data: IOrder) => data
        )
    }

}