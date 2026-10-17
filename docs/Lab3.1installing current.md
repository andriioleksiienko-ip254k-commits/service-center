# Встановлення поточного стану (Л 3.1, кроки 1–8)

## 1. Файли з архіву

Архів містить повний набір змін обох частин Л 3.1 відносно коміту `84168fb Lab2.2 done`. Скопіюйте вміст у корінь проєкту `service-center` із заміною (структура тек збережена). Якщо частину 1 уже перенесено, просто перезапишіть файли. Видаляти нічого не потрібно.

Нові:
- `src/domain/requestValidation.js`
- `src/context/RequestsContext.js`
- `src/providers/RequestsProvider.jsx`
- `src/hooks/useRequests.js`, `src/hooks/useDeleteRequest.js`, `src/hooks/useRequestFilters.js`
- `src/components/requests/RequestFilters.jsx`, `RequestTable.jsx`, `RequestNotice.jsx`
- `src/pages/RequestDetailsPage.jsx`
- `docs/Lab3.1 changes.md`, `docs/Lab3.1installing current.md`

Замінити:
- `src/App.jsx`
- `src/components/layout/AppLayout.jsx`, `src/components/layout/RequestsLayout.jsx`
- `src/components/requests/RequestForm.jsx`, `src/components/requests/RequestSummary.jsx`
- `src/components/ui/FormField.jsx`
- `src/data/requests.js`
- `src/index.css` (повна версія: попередні стилі + нові правила в кінці)
- `src/pages/HomePage.jsx`, `RequestCreatePage.jsx`, `RequestEditPage.jsx`, `RequestPage.jsx`, `RequestsPage.jsx`

`package.json` і `package-lock.json` не змінювались, нових залежностей немає.

## 2. Залежності

`react` ^19.2.8, `react-dom` ^19.2.8, `react-router` ^8.4.0; dev: `vite` ^8.3.0, `@vitejs/plugin-react` ^6.1.1, `oxlint` ^1.81.0.

## 3. Встановлення та запуск

| Дія | Нативно | Docker |
|---|---|---|
| Встановлення | `npm install` | `docker compose build`, потім `docker compose run --rm web npm install` |
| Dev-сервер | `npm run dev` → http://localhost:5173 | `docker compose up` → http://localhost:5173 |
| Лінтер | `npm run lint` | `docker compose run --rm web npm run lint` |
| Збірка | `npm run build` | `docker compose run --rm web npm run build` |
| Preview | `npm run preview` → http://localhost:4173 | `docker compose run --rm -p 127.0.0.1:4173:4173 web npm run preview -- --host 0.0.0.0 --port 4173 --strictPort` |

## 4. Маршрути розділу заявок

| Адреса | Сторінка |
|---|---|
| `/requests?q=&service=&sort=` | список: пошук, фільтр за послугою (`srv-001`…), порядок `service` / `cost-asc` / `cost-desc` |
| `/requests/new?serviceId=srv-001` | створення |
| `/requests/req-001` | перегляд, редагування, видалення |
| `/requests/req-001/edit` | редагування |

## 5. Ручна перевірка (коротко)

1. `/requests/new?serviceId=srv-001` → «Створити заявку» з порожніми полями: помилки біля полів, адреса не змінюється, повідомлення про успіх немає.
2. Вартість `0`, `1.5`, `100001`, `499` (послуга від 500 грн): відповідні повідомлення; введення зберігається.
3. Коректні дані → `/requests/req-004` і повідомлення «Заявку req-004 створено…»; «Список заявок» → повідомлення лишається, запис є.
4. «Редагувати заявку», змінити вартість → «Зберегти зміни» → деталі з новим значенням.
5. «Видалити заявку» → «Скасувати» (нічого не змінюється) → ще раз «OK» → список без запису; адреса запису → «Заявку не знайдено».
6. `/requests?q=hp&service=srv-003&sort=cost-desc` → поля й результат відповідають адресі; запит `zzzz` → «За цими умовами нічого не знайдено»; видалення всіх → «Заявок ще немає».
7. Перезавантаження → знову 3 початкові заявки.

## 6. Особливості

- Колекція живе в `RequestsProvider` до перезавантаження документа; `data/requests.js` – лише початкові дані, тому адреса щойно створеної заявки після перезавантаження показує «Заявку не знайдено».
- Підтвердження видалення, відновлення полів і виходу – нативний `window.confirm`.
- Вихід через меню або «Назад» не запитує підтвердження й відкидає незбережену чернетку.
- `req-003` навмисно посилається на відсутню послугу: її можна переглянути й видалити, але редагування показує «Послугу заявки не знайдено».

## 7. Git

```powershell
git switch -c lab-3-1-crud
git add src docs
git commit -m "Implement local request CRUD and validated forms"
git push -u origin lab-3-1-crud
```
