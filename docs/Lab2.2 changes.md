# Л 2.2, кроки 6–9: зміни

Основа: коміт `a51ed87 Lab2.2 Part 1`. Каталог `/services`, деталі `/services/:serviceId`, `NotFoundPage`, `PageHeading`, меню на `NavLink` уже були; їх не переписано.

## Файли

| Файл | Дія | Що змінено |
|---|---|---|
| `src/hooks/useServiceFilters.js` | замінено | `useState` → `useSearchParams`; контракт хука той самий |
| `src/App.jsx` | замінено | групи `services` і `requests`, `RequestsLayout`, нові сторінки; пункт меню «Заявки» → `/requests` |
| `src/pages/RequestPage.jsx` | замінено | спільний редактор: `title`, `item` (обов'язковий), `initialDraft`, `onCancel`, `cancelLabel` |
| `src/components/requests/RequestForm.jsx` | змінено 1 абзац | нове пояснення про незбережену чернетку (клас `draft-notice`) |
| `src/pages/HomePage.jsx` | +1 рядок | посилання на `/requests` |
| `src/index.css` | дописано в кінець | `.section-nav`, `.requests-table`, `.table-scroll`, `.draft-notice`, фокус `.nav-link` |
| `src/data/requests.js` | новий | 3 демонстраційні заявки (`req-003` навмисно з відсутньою послугою `srv-099`) |
| `src/components/layout/RequestsLayout.jsx` | новий | меню розділу + `Outlet` |
| `src/pages/RequestsPage.jsx` | новий | таблиця заявок, посилання `req-001/edit` |
| `src/pages/RequestCreatePage.jsx` | новий | `/requests/new?serviceId=...` |
| `src/pages/RequestEditPage.jsx` | новий | `/requests/:requestId/edit` |
| `src/pages/RequestContainer.jsx` | **видалити** | замінено маршрутними сторінками, імпортів більше немає |
| `README.md`, `docs/project-plan-routes.md` | оновлено | версія React Router, прямі адреси, статуси маршрутів |

Без змін: `ServiceFilters`, `CatalogPage`, `CatalogContainer`, `ServiceCard`, `ServiceList`, `RequestSummary`, `FormField`, `AppButton`, `EmptyState`, `Section`, провайдер, контекст, `useServiceSelection`, `ServiceDetailsPage`, `NotFoundPage`, `AppLayout`, `MainNav`.

## Маршрути після змін

```
AppLayout (без path)
 /                          HomePage
 /services                  CatalogContainer → CatalogPage   (?q=, ?available=1)
 /services/:serviceId       ServiceDetailsPage
 /requests                  RequestsLayout → RequestsPage
 /requests/new              RequestCreatePage → RequestPage  (?serviceId=)
 /requests/:requestId/edit  RequestEditPage → RequestPage
 *                          NotFoundPage
```

---

## 6. Фільтри в URL

**Текст для звіту.** Хук `useServiceFilters(items)` переписано на `useSearchParams`, тому єдиним джерелом значень фільтрів став рядок пошуку адреси: `q` (текст пошуку) і `available=1` (лише доступні). Власних `useState` у хуку більше немає, тому стан не дублюється й не синхронізується ефектами. Контракт хука з Л 2.1 (`query`, `setQuery`, `availableOnly`, `setAvailableOnly`, `visibleItems`, `resetFilters`) збережено, тож `ServiceFilters` і `CatalogPage` не змінювалися. Кожен setter створює копію `URLSearchParams` і змінює лише власний ключ, тому сторонні параметри зберігаються. Для введення тексту використано `{ replace: true }`: кожна літера замінює поточний запис історії, і кнопка «Назад» не проходить посимвольно. Перемикання прапорця та скидання створюють окремі записи історії. Відсутній `q` означає порожній рядок, будь-яке значення `available`, крім `1`, вимикає фільтр. Пряме відкриття `/services?q=Вста&available=1` відновлює поле, прапорець і список.

**Код:** `src/hooks/useServiceFilters.js` (повністю або функції `setQuery` і `setAvailableOnly`).

**Скріншоти:**
- 2.x – адресний рядок `/services?q=Вста&available=1` і відповідні поле, прапорець та 2 картки;
- 2.x – той самий каталог після переходу до деталей і натискання «Назад» (фільтри відновлено).

## 7. Вкладений розділ заявок

**Текст для звіту.** Додано `src/data/requests.js` із локальними демонстраційними заявками (поля `id`, `serviceId`, `deviceType`, `brand`, `model`, `problem`). Назва послуги не копіюється, а знаходиться за `serviceId`. Маршрут `requests` має власну оболонку `RequestsLayout` із меню розділу («Список заявок» `to="."` з `end`, «Нова заявка» `to="new"`) та `Outlet`. Індексна сторінка `RequestsPage` показує таблицю заявок із відносними посиланнями `req-001/edit`. `RequestPage` став спільним редактором: маршрутні сторінки `RequestCreatePage` і `RequestEditPage` передають йому перевірену послугу, початкові поля та дію виходу, а наявні `RequestForm`, `RequestSummary`, `FormField` і `AppButton` використано повторно без зміни API. Редактор отримує `key` (`new-<serviceId>` / `edit-<requestId>`), тому при зміні запису стан чернетки створюється заново. Повну валідацію й збереження не реалізовано (Л 3.1); біля форми пояснено, що зміни не зберігаються. Старий `RequestContainer` видалено.

**Код:** `App.jsx` (блок `<Route path="requests" ...>`), `RequestsLayout.jsx`, `RequestEditPage.jsx` (повернення `<RequestPage key=... initialDraft=...>`).

**Скріншоти:**
- 2.x – `/requests`: таблиця заявок, активні пункти «Заявки» та «Список заявок»;
- 2.x – `/requests/req-001/edit`: заповнені поля й підсумок;
- 2.x – `/requests/new?serviceId=srv-001`: порожня нова чернетка з поясненням.

## 8. Переходи після дій

**Текст для звіту.** Переходи визначено так. Вибір у каталозі (кнопка картки) лише змінює спільний вибір і лишає користувача в каталозі; посилання «Підготувати нову заявку» формує адресу з останнім вибором. Кнопка «Вибрати й підготувати заявку» на сторінці деталей спочатку викликає `selectService(item.id)`, потім `navigate('/requests/new?serviceId=...')` (адреса з `item.id`, а не з ще не оновленого `selectedId`). На сторінці нової заявки «Скасувати чернетку й очистити вибір» викликає `clearSelection()` і `navigate('/services', { replace: true })`: запис редактора в історії замінюється, тому «Назад» не повертає до скасованої чернетки. На редагуванні «Вийти без збереження» переходить до `/requests`. Повідомлення «Збережено» ніде не показується, бо збереження ще не реалізоване; при повторному відкритті запису видно початкові дані.

**Код:** `RequestCreatePage.jsx` (функція `handleCancel`), `ServiceDetailsPage.jsx` (`handlePrepareRequest`, з частини 1).

**Скріншоти:**
- 2.x – адреса `/requests/new?serviceId=srv-001` після натискання «Вибрати й підготувати заявку»;
- 2.x – повторно відкритий `req-001` після зміни поля й виходу (початкові значення).

## 9. Оброблення відсутності

**Текст для звіту.** Окремо оброблено три випадки. Невідомий маршрут (`/unknown`, `/requests/unknown/path`, `/services/srv-001/extra`) обробляє маршрут `*` усередині загальної оболонки: показується «404: сторінку не знайдено» з посиланнями на каталог і головну. Відсутній запис за відомим шаблоном перевіряє сама сторінка: `/services/missing` – «Послугу не знайдено», `/requests/missing/edit` – «Заявку не знайдено», `/requests/req-003/edit` – «Послугу заявки не знайдено» (заявка посилається на відсутню послугу). Нова заявка без параметра `/requests/new` є коректною сторінкою з поясненням «Спочатку виберіть послугу», посиланням на каталог і, якщо в контексті є вибір, посиланням «Використати останній вибір». Невідомий або порожній `serviceId` (`?serviceId=srv-999`, `?serviceId=`) не підміняється іншою послугою, а показує «Неможливо підготувати заявку». Користувача ніде не перенаправлено мовчки.

**Код:** `RequestCreatePage.jsx` (дві умовні гілки), `RequestEditPage.jsx` (дві перевірки), рядок `<Route path="*" ...>` в `App.jsx`.

**Скріншоти:**
- 2.x – `/unknown`;
- 2.x – `/requests/missing/edit`;
- 2.x – `/requests/new` без параметра (з посиланням «Використати останній вибір»).

---

## Перевірено

- `npm ci`, `npm run lint` (oxlint: 0 warnings, 0 errors), `npm run build` (успішно), `npm run dev` (запуск).
- `npm run preview` + автоматизований прохід у Chromium (Playwright), помилок у консолі немає:
  - `/services?q=Вста&available=1&x=7` → поле «Вста», прапорець увімкнено, 2 картки; `x=7` зберігається;
  - введення тексту не додає записів історії, зняття прапорця додає; «Назад» з деталей відновлює фільтри;
  - «Скинути фільтри» → лишається лише `?x=7`;
  - деталі → «Вибрати й підготувати заявку» → `/requests/new?serviceId=srv-001`; після перезавантаження послуга з адреси, поля порожні;
  - скасування нової чернетки → `/services`, «Назад» → `/services/srv-001`;
  - `/requests/new` без параметра → пояснення; «Використати останній вибір» → `?serviceId=srv-003`;
  - `/requests/req-001/edit` → поля з запису, зміна поля оновлює підсумок; вихід → `/requests`, повторне відкриття показує початкові дані; `req-002` показує свої дані;
  - `/unknown`, `/services/missing`, `/requests/missing/edit`, `/requests/req-003/edit`, `/requests/unknown/path`, `/services/srv-001/extra` → змістовні повідомлення, `document.title` відповідний.
- Не перевірено: запуск у Docker (у середовищі підготовки Docker недоступний); перевірка середовища виконана на Node 22, а не 24.
