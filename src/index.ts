import { IProduct, IOrder, TOrderForm, TUserInfoContacts, IUser } from './types/index';

import './scss/styles.scss';
import { AppData } from './components/appData';
import { API_URL,CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { WebLarekAPI } from './components/WebLarekAPI';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Page } from './components/Page';
import { Basket } from './components/common/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Card } from './components/Card';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL,API_URL)




// Чтобы мониторить все события, для отладки
events.onAll(({eventName, data}) => {
    console.log(eventName, data)
 })

 // Все шаблоны
 const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
 const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
 const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
 

 // Модель данных приложения
 const appData = new AppData(events)


 // Глобальные контейнеры
 const modal = new Modal(events,ensureElement<HTMLElement>('#modal-container'))
 const page = new Page(events,document.body)
 const basket = new Basket(events)
 const orderForm = new Order(events,cloneTemplate(ensureElement<HTMLTemplateElement>('#order')))
 const contactsForm = new Contacts(events,cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')))



 // Дальше идет бизнес-логика
// Поймали событие, сделали что нужно


// Изменились элементы каталога
events.on('items:change', (items:IProduct[]) => {
    page.catalog = items.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick : () => events.emit('product:selected' , item)
        });
        return card.render(item)
    })
})

// отправка post-запроса на сервер
events.on('contacts:submit',() => {
    api.orderLots(appData.order)
    .then((res) => {
        const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), {
            onClick: () => {
                modal.close()
                appData.clearBasket()
            }
        })

        modal.render({
            content: success.render(res)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// Открыть форму заказа
events.on('order:open', () => {
    modal.render({
        content: orderForm.render({
            payment:'card',
            address: '',
            valid: false,
            errors: []
        })
    })
})
// Переход на заполнение данных пользователя
events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    })
})

// Форма прошла валидацию
events.on('order:ready', (order:IUser) => {
    contactsForm.valid = true
})

// Изменилось одно из полей
events.on(/^order\..*change/, (data: {field: keyof TOrderForm, value:string}) => {
    appData.setOrderField(data.field,data.value)
})

events.on(/^contacts\..*change/, (data: {field: keyof TOrderForm, value:string}) => {
    appData.setOrderField(data.field,data.value)
})

// проверка на валидаццию
events.on('formErrors:change', (error: Partial<TUserInfoContacts>) => {
    const {phone, email, payment, address} = error;
    orderForm.valid = !payment && !address
    orderForm.errors = Object.values({payment,address}).filter(i => !!i).join('; ')
    contactsForm.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
} )

// открытие модального окна корзины
events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
})

// модальное окно  открыто
events.on('modal:open', () => {
    page.locked = true
})

// модальное окно  закрыто
events.on('modal:close', () => {
    page.locked = false
})
// Выбрать продукт
events.on('product:selected', (item: IProduct) => {
    appData.setPreview(item)
})

events.on('preview:change', (item:IProduct) => {
    if(item) {
        const card = new Card(cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                if(appData.inBasket(item)) {
                    appData.deleteFromBasket(item)
                    card.button = 'В корзину'
                } else {
                    appData.addToBasket(item)
                    card.button = 'Удалить из корзины'
                }
            }
        }
        )
        card.button = appData.inBasket(item) ? 'Удалить из корзины' : 'В корзину'

        modal.render({
            content: card.render(item)
        })
    } else {
        modal.close()
    }
})



events.on('basket:change', () => {
    page.counter = appData.basket.items.length

    basket.items = appData.basket.items.map((id) => {
        const item = appData.items.find(item => item.id === id)
        const card = new Card(cloneTemplate(cardBasketTemplate),{
            onClick : () => {
                appData.deleteFromBasket(item!)
            }
        })
        return card.render(item)
    })
    basket.total = appData.basket.total
})


 api.getLotList()
     .then(appData.setItems.bind(appData))
     .catch(err => {
         console.error(err);
     });