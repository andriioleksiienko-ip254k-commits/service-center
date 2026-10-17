# Як застосувати кроки 1-5 Л 2.1

```powershell
git status
git switch -c lab-2-1-state
```

Файли, які **замінюються** (є в Л 1.2):

- `src/App.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/RequestPage.jsx`
- `src/components/ui/AppButton.jsx`
- `src/components/catalog/ServiceCard.jsx`
- `src/components/catalog/ServiceList.jsx`

Файл, який **додається**:

- `src/components/catalog/ServiceFilters.jsx`

Інше:

- `src/index.lab21-additions.css`: додайте вміст у кінець `src/index.css`.
- `docs/state-map.md`: вставте розділ у `docs/component-architecture.md`.

Не змінюються: `data/services.js`, `AppLayout`, `SiteHeader`, `MainNav`, `Section`, `EmptyState`, `FormField`, `AvailabilityBadge`, `CatalogSummary`, `RequestFormPreview`.

Перевірка: `npm run dev`, потім `npm run build`. Коміт методичка вимагає наприкінці всієї лабораторної (після кроків 6-10), тому зараз `git commit` не обов'язковий.
