import { IEvents } from './../base/events';
import { View } from './../base/Component';
import { ensureElement } from '../../utils/utils';


interface IModalData {
    content: HTMLElement
}

export class Modal extends View <IModalData> {
    protected _closeButton : HTMLButtonElement ;
    protected _content : HTMLElement;

    constructor(protected event: IEvents,container:HTMLElement,) {
        super(event,container)

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container)
        this._content = ensureElement<HTMLElement>('.modal__content',container)

        this._closeButton.addEventListener('click', this.close.bind(this))
        // this._content.addEventListener('click',this.close.bind(this))
        this.container.addEventListener('click', (event) => event.stopPropagation())
    }

    set content (value:HTMLElement) {
        this._content.replaceChildren(value)
    }

    open() {
        this.container.classList.add('modal_active')
        this.event.emit('modal:open')
    }

    close() {
        this.container.classList.remove('modal_active')
        this.content = null
        this.event.emit('modal:close')
    }

    render(data:IModalData) :HTMLElement {
        super.render(data)
        this.open()
        return this.container
    }
}