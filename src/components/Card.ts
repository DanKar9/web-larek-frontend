import { bem, ensureElement } from '../utils/utils';
import { IProduct } from './../types/index';
import { Component } from "./base/Component";


    interface ICardActions {
        onClick: (event:MouseEvent) => void
    }

    type CardModifier = 'compact' | 'full'


    export class Card  extends Component<IProduct>{
        protected _button? : HTMLButtonElement;
        protected _description: HTMLElement;
        protected _image: HTMLImageElement;
        protected _title: HTMLElement;
        protected _category : HTMLElement;
        protected _price: HTMLElement;

        constructor(container: HTMLElement, actions?: ICardActions) {
            super(container)

            this._title = ensureElement<HTMLElement>(".card__title",container)
            this._price = ensureElement<HTMLElement>('.card__price',container)

            this._image = container.querySelector('.card__image')
            this._category = container.querySelector('.card__category')
            this._button = container.querySelector('.card__button')
            this._description = container.querySelector('.card__description')


            if(actions?.onClick){
                if(this._button){
                    this._button.addEventListener('click',actions.onClick)
                }
                else {
                    container.addEventListener('click',actions.onClick)
                }
            }
            
        }

        toggle(modifier : CardModifier) {
            this.toggleClass(bem('card',undefined,modifier).name)
        }


        set id (value:string){
            this.container.dataset.id = value
        }

        get id (): string {
            return this.container.dataset.id || ''
        }

        set title (value:string) {
            this.setText(this._title,value)
        }
        
        get title () : string {
            return this._title.textContent || ''
        }

        set image (value:string) {
            this.setImage(this._image,value,this.title)
        }

        set description(value:string) {
            this.setText(this._description, value)
        }

        set price (value:number) {
            this.setText(this._price,value ? `${value} синапсов` : 'Бесценно')
            if(this._button) {
                this._button.disabled = !value
            }
        }

        set button (value:string) {
            this.setText(this._button,value)
        }

        set category (value:string) {
            this.setText(this._category,value)
            if (this._category) {
                switch (value) {
                    case 'софт-скил':
                        this._category.classList.add('card__category_soft');
                        break;
                    case 'дополнительное':
                        this._category.classList.add('card__category_additional');
                        break;
                    case 'другое':
                        this._category.classList.add('card__category_other');
                        break;
                    case 'кнопка':
                        this._category.classList.add('card__category_button');
                        break;
                    case 'хард-скил':
                        this._category.classList.add('card__category_hard');
                        break;
    
                    default:
                        break;
                }
            }
        }
    }