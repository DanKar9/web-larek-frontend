import { TOrderForm } from './../types/index';
import { Form } from "./common/Form";


    export class Contacts extends Form<TOrderForm> {
       
        set phone(value:string) {
            (this.container.elements.namedItem('phone') as HTMLInputElement).value = value
        }

        set email(value:string) {
            (this.container.elements.namedItem('email') as HTMLInputElement).value = value
        }
    }