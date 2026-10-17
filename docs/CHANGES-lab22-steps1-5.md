# Як застосувати кроки 1-5 Л 2.2

```powershell
git status
git switch -c lab-2-2-routing
npm install react-router
```

Для Docker: `docker compose run --rm web npm install react-router`.

Після встановлення збережіть змінені `package.json` і `package-lock.json`, а фактичну версію перевірте командою `npm ls react-router` і запишіть у README. Імпортуйте все лише з `react-router`, другий пакет (`react-router-dom`) не потрібен.

## Замінити (повні версії є в архіві)

- `src/main.jsx` (якщо у вашому є додаткові імпорти, наприклад Bootstrap, збережіть їх перед `./index.css`)
- `src/App.jsx`
- `src/components/layout/AppLayout.jsx`
- `src/components/layout/SiteHeader.jsx`
- `src/components/navigation/MainNav.jsx`
- `src/components/catalog/ServiceCard.jsx` (ваша версія з усіма правками, змінено лише імпорт `Link` і заголовок)
- `src/pages/HomePage.jsx`
- `src/pages/CatalogContainer.jsx`
- `src/pages/RequestPage.jsx`

## Додати (нові файли)

- `src/components/ui/PageHeading.jsx`
- `src/pages/CatalogPage.jsx`
- `src/pages/ServiceDetailsPage.jsx`
- `src/pages/NotFoundPage.jsx`

## Не змінюється

`RequestContainer`, `RequestForm`, `RequestSummary`, `ServiceList`, `ServiceFilters`, `CatalogSummary`, `AvailabilityBadge`, `AppButton`, `Section`, `EmptyState`, `FormField`, провайдер, контекст, обидва хуки, `data/services.js`.

## Інше

- `src/index.lab22-additions.css`: допишіть у кінець `src/index.css`. Там лише нові правила (`.site-title`, `.nav-link`, `.service-details`, `.not-found-code`), старі стилі не чіпаються.
- `docs/project-plan-routes.md`: вставте розділ у `docs/project-plan.md`.
- `docs/report-lab22-steps1-5.md`: матеріали для звіту.

## Перевірка

```powershell
npm run dev
npm run lint
npm run build
npm run preview
```

Відкрийте напряму: `/`, `/services`, `/services/srv-001`, `/services/missing`, `/unknown`, `/requests/new`. Оновлення сторінки на вкладеній адресі має повертати застосунок (Vite dev і preview це роблять за замовчуванням).
