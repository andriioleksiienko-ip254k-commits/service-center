# Встановлення поточного стану (Л 2.2, кроки 6–9)

## 1. Файли з архіву

Скопіюйте вміст архіву в корінь проєкту `service-center` із заміною (структура тек збережена).

Замінити:
- `src/App.jsx`
- `src/hooks/useServiceFilters.js`
- `src/pages/RequestPage.jsx`
- `src/pages/HomePage.jsx`
- `src/components/requests/RequestForm.jsx`
- `src/index.css` (повна версія: стилі частини 1 + нові правила в кінці)
- `README.md`
- `docs/project-plan-routes.md`

Додати:
- `src/data/requests.js`
- `src/components/layout/RequestsLayout.jsx`
- `src/pages/RequestsPage.jsx`
- `src/pages/RequestCreatePage.jsx`
- `src/pages/RequestEditPage.jsx`
- `docs/Lab2.2 changes.md`, `docs/Lab2.2installing current.md`

**Видалити вручну:** `src/pages/RequestContainer.jsx` (більше ніде не імпортується).

`package.json` і `package-lock.json` не змінювалися.

## 2. Залежності

З `package.json`: `react` ^19.2.8, `react-dom` ^19.2.8, `react-router` ^8.4.0 (встановлено 8.4.0); dev: `vite` ^8.3.0, `@vitejs/plugin-react` ^6.1.1, `oxlint` ^1.81.0. Нових пакетів не додано: `react-router` встановлено в частині 1.

## 3. Встановлення

Нативно:
```powershell
npm install
```
Docker:
```powershell
docker compose build
docker compose run --rm web npm install
```

## 4. Запуск і перевірки

| Дія | Нативно | Docker |
|---|---|---|
| Dev-сервер | `npm run dev` → http://localhost:5173 | `docker compose up` → http://localhost:5173 |
| Лінтер | `npm run lint` | `docker compose run --rm web npm run lint` |
| Збірка | `npm run build` | `docker compose run --rm web npm run build` |
| Preview збірки | `npm run preview` → http://localhost:4173 | `docker compose run --rm -p 127.0.0.1:4173:4173 web npm run preview -- --host 0.0.0.0 --port 4173 --strictPort` |

Зупинення Docker: `docker compose down`.

## 5. Особливості

- Прямі адреси (`/requests/req-001/edit` тощо) і оновлення сторінки працюють у `npm run dev` і `npm run preview` (SPA-fallback Vite). На хостингу потрібно повертати `index.html` для клієнтських маршрутів.
- Перехід через меню «Каталог послуг» відкриває каталог без фільтрів; фільтри відновлюються через «Назад» або скопійовану адресу.
- Чернетка заявки не зберігається: скидається при виході, зміні послуги/заявки, перезавантаженні.
- Спільний вибір (Context API) переживає переходи між сторінками, але скидається при перезавантаженні.

## 6. Git

```powershell
git status
git add src docs README.md
git rm src/pages/RequestContainer.jsx
git commit -m "Lab2.2 Part 2: URL filters, requests section, not-found handling"
git push
```
