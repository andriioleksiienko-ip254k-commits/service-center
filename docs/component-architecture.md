# Компонентна архітектура: FixIT Service (Л 1.2)

## Що змінено порівняно з Л 1.1

| Було | Стало | Причина |
|---|---|---|
| Шапка, навігація, підвал в `App` | `AppLayout`, `SiteHeader`, `MainNav` | Спільне компонування для різного вмісту |
| Заголовок каталогу, цикл і `map` у `HomePage` | `Section`, `CatalogSummary`, `ServiceList` | Сторінка лише складає блоки |
| Умова доступності в `ServiceCard` | `AvailabilityBadge` | Однакове правило в каталозі й заявці |
| Лише каталог | `RequestPage` + `RequestFormPreview` | Розвиток запланованого сценарію без збереження |
| Плоска папка `components` | Групи `layout`, `navigation`, `catalog`, `requests`, `ui` | Зрозуміла відповідальність файлів |

Папку названо `catalog`, а не `services`, щоб не змішувати її з сервісним шаром даних у Л 3.2.

## Ієрархія

```
App
 AppLayout
  SiteHeader
   MainNav
  main
   HomePage
    Section (Про сервіс)
    Section (Каталог послуг)
     CatalogSummary
     ServiceList
      ServiceCard (для кожної послуги)
       AvailabilityBadge
      EmptyState (якщо список порожній)
   RequestPage
    Section (Підготовка заявки)
     AvailabilityBadge
     RequestFormPreview
      FormField (для кожного поля)
      AppButton (кнопки)
  footer
```

`HomePage` і `RequestPage` передаються в `AppLayout` через `children`, тому `AppLayout` їх не імпортує.

## Контракти props

| Компонент | Props | Домовленість |
|---|---|---|
| `AppLayout` | `title`, `links`, `children` | Єдиний `main` у застосунку |
| `MainNav` | `links` | Масив `{ href, label }`, адреси без повторів |
| `Section` | `id`, `title`, `children` | `id` унікальний у документі |
| `ServiceList` | `items` | Масив послуг; `[]` допустимий |
| `ServiceCard` | `item` | Коректний запис із полями моделі Л 1.1 |
| `AvailabilityBadge` | `available` | Булеве значення; дані не змінює |
| `CatalogSummary` | `total` | Число |
| `RequestPage` | `item` | Запис або `undefined` (порожній стан) |
| `FormField` | `id`, `label`, `hint`, `children` | Вкладене поле має той самий `id` і `aria-describedby` для підказки |
| `RequestFormPreview` | `idPrefix`, `serviceName` | Унікальний префікс; макет без збереження |
| `AppButton` | `children`, `type`, `variant`, `disabled` | `variant`: `primary` або `secondary` |
| `EmptyState` | `title`, `children` | `children` необов'язкові |

Модель послуги: `id`, `name`, `category`, `description`, `price`, `available`.

## Рішення

1. **`AvailabilityBadge`.** Зміна підпису недоступності виконується в одному файлі й діє в усіх місцях показу.
2. **`Section` через `children`.** Секція відповідає за заголовок і обрамлення, предметні правила лишаються в предметних компонентах. Використана двічі з різним вмістом.
3. **`RequestPage` допускає відсутній `item`.** Це єдиний компонент із явним порожнім випадком, на відміну від `ServiceCard`, якій завжди потрібен коректний запис.

