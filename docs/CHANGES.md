# Як застосувати зміни до вашого проєкту (Л 1.2)

З кореня `service-center`:

```powershell
git status
git switch -c lab-1-2-components
```

1. Скопіюйте папку `src/components/*`, `src/pages/*` та `src/App.jsx` з архіву (файли будуть замінені).
2. **Видаліть** старий `src/components/ServiceCard.jsx` (замінений на `src/components/catalog/ServiceCard.jsx`).
3. `src/data/services.js` НЕ змінюється.
4. Додайте вміст `src/index.additions.css` у кінець `src/index.css`.
5. Скопіюйте `docs/component-architecture.md` у `docs/`.
6. У `docs/project-plan.md` у розділі «Стан реалізації» додайте:
   - Реалізовано (Л 1.2): компонування (`AppLayout`, `SiteHeader`, `MainNav`), `ServiceList`, `AvailabilityBadge`, макет `RequestPage`.
   - Заплановано: стан і взаємодія (Л 2.1), маршрутизація (Л 2.2), форми з валідацією (Л 3.1).
7. У `README.md` у розділі «План» замініть рядок про компоненти на:
   `Поточний результат: компонентна архітектура, каталог послуг і макет форми заявки (без збереження). Архітектура: docs/component-architecture.md.`

Перевірка:

```powershell
npm run dev
npm run build
```

Коміт:

```powershell
git diff
git status
git add src docs README.md
git commit -m "Refactor component architecture and add request preview"
git log --oneline -3
```
