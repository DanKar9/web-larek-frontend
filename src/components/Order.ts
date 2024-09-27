import { TOrderForm, TPayMethod } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter, IEvents } from "./base/events";
import { Form } from "./common/Form";

    export class Order extends Form<TOrderForm>{
        protected _paymentCash: HTMLButtonElement;
        protected _paymentCard: HTMLButtonElement;

        constructor(events:EventEmitter,container:HTMLFormElement){
            super(events,container)

            this._paymentCard = ensureElement<HTMLButtonElement>('.button_alt[name = card]',container)
            this._paymentCash = ensureElement<HTMLButtonElement>('.button_alt[name = cash]',container)


            this._paymentCard.addEventListener('click',() => {
                this.payment = 'card'
                this.onInputChange('payment','card')
            })

            this._paymentCash.addEventListener('click', () => {
                this.payment = 'cash'
                this.onInputChange('payment','cash')
            })
        }


        set payment(value: TPayMethod) {
            this._paymentCard.classList.toggle('button_alt-active', value === 'card')
            this._paymentCash.classList.toggle('button_alt-active', value === 'cash')
        }

        set adress (value:string) {
            (this.container.elements.namedItem('adress') as HTMLInputElement).value = value
        }
    }