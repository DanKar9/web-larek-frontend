import { IEvents } from './base/events';
import { IProduct, IUser, TPayMethod, IBasket, TOrderForm } from './../types/index';


export class AppData {
    items: IProduct[] =[];
    preview: IProduct | null;
    basket: IBasket = {
        total : 0,
        items : []
    }
    order : IUser =  {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    }
      formErrors : Partial<Record<keyof TOrderForm, string>>

    constructor (protected events: IEvents) {

    }

    setItems (items:IProduct[]){
        this.items = items
        this.events.emit('items:change', this.items)
    }

    addToBasket(item: IProduct) {
        this.basket.items.push(item.id)
        this.basket.total += item.price
        this.events.emit('basket:change')
    }

    deleteFromBasket (item:IProduct){
        this.basket.items = this.basket.items.filter((id) => id !== item.id)
        this.basket.total -= item.price
        this.events.emit('basket:change',this.order)
    }

    clearBasket() {
        this.basket.items = []
        this.basket.total = 0
        this.events.emit('basket:change', this.order)
    }

    setPreview(item:IProduct) {
        this.preview = item
        this.events.emit('preview:change',this.preview)
    }

    inBasket(item:IProduct) {
      return  this.basket.items.includes(item.id)
    }

    setPayMethod(payment : TPayMethod) {
         this.order.payment = payment
    }

    setOrderField(field: keyof TOrderForm,value :string) {
        if(field === 'payment') {
            this.setPayMethod(value as TPayMethod)
        }
        else {
            this.order[field] = value
        }
        if(this.order.payment && this.validateOrder()){
            this.order.total = this.basket.total
            this.order.items = this.basket.items
            this.events.emit('order:ready',this.order)
        }
    }

    validateOrder() {
        const errors : typeof this.formErrors = {};
        if(!this.order.email) {
            errors.email = "Необходимо указать email"
        }
        if(!this.order.address){
            errors.address = 'Необходимо указать адрес'
        }
        if(!this.order.phone) {
            errors.phone = 'Необходимо указать номер телефона'
        }
        if(!this.order.payment){
            errors.payment = 'Необходимо указать форму оплаты'
        }

        this.formErrors = errors
        this.events.emit('formErrors:change',this.formErrors)
        return Object.keys(errors).length === 0
    }

}