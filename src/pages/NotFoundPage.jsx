import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

// Один компонент для двох випадків: невідомий маршрут (*) і відсутній запис
// за відомим шаблоном адреси. Пояснення передає той, хто його викликає.
export default function NotFoundPage({
  title = '404: сторінку не знайдено',
  message = 'Перевірте адресу або перейдіть до каталогу послуг.',
}) {
  return (
    <div className="not-found">
      <p className="not-found-code" aria-hidden="true">404</p>
      <PageHeading title={title} />
      <p>{message}</p>
      <p><Link to="/services">Відкрити каталог послуг</Link></p>
      <p><Link to="/">На головну</Link></p>
    </div>
  )
}
