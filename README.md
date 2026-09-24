# Вебзастосунок сервісного центру комп'ютерної техніки
Онлайн-замовлення та супровід послуг ремонту.
Поточний результат: початкова сторінка з локальними даними.

## Середовище
* Node.js: 24 LTS
* npm: поточна версія
* Git: поточна версія
* Docker i Docker Compose: поточні версії
* Основний варіант: Docker Desktop із WSL 2

## Запуск
Нативно: `npm install`, потім `npm run dev`.
Docker: `docker compose build`, `docker compose run --rm web npm install`, потім `docker compose up`.
Адреса Docker: http://localhost:5173.
Зупинення й видалення контейнера: `docker compose down`.

## Збірка
`npm run build`
Або: `docker compose run --rm web npm run build`

## План
Див. `docs/project-plan.md`.
Форми й маршрути ще заплановані.