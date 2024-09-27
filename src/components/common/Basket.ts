import { EventEmitter, IEvents } from './../base/events';
import { cloneTemplate, createElement, ensureElement } from '../../utils/utils';
import { View } from '../base/Component';
import { IBasket } from './../../types/index';



    export class Basket extends View<IBasket> {
        static template = ensureElement<HTMLTemplateElement>('#basket')

        protected _list : HTMLElement
        protected _total: HTMLElement
        protected _button: HTMLElement

        constructor(event: EventEmitter) {
            super(event,cloneTemplate(Basket.template))

            this._list = ensureElement<HTMLElement>('.basket__list',this.container)
            this._button = ensureElement<HTMLElement>('.basket__button',this.container)
            this._total = ensureElement<HTMLElement>('.basket__price',this.container)


           
                this._button.addEventListener('click',() => {
                    this.events.emit('order:open')
                })
            

            this.items = []
        }

        set items(items:HTMLElement[]) {
            if(items.length){
                this._list.replaceChildren(...items)
            } else {
                this._list.replaceChildren(createElement<HTMLParagraphElement>('p',{
                    textContent: 'Корзина пуста'
                }))
            }
        }


        set total (total:number){
            this.setText(this._total, `${total} синапсов`)
        }
    }