
import { IEvents } from "./events";



export abstract class Component <T> {
    protected constructor (protected readonly container: HTMLElement) {

    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass (className:string) {
        this.container.classList.toggle(className)
    }

      // Установить текстовое содержимое
  protected  setText(element:HTMLElement, value: unknown){
        if(element){
            element.textContent = String(value)
        }
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: Partial<T>):HTMLElement {
        Object.assign(this as object, data ??{})
        return this.container
    }
}


export class View<T> extends Component<T> {
    constructor(protected readonly events:IEvents, container:HTMLElement) {
        super(container)
    }
}