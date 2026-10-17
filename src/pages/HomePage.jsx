import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

export default function HomePage() {
  return (
    <>
      <PageHeading title="Комп'ютерний Сервіс" />
      <p>
        Вебзастосунок сервісного центру з онлайн-замовлення послуг ремонту
        комп’ютерної техніки.
      </p>
      <p>Ознайомтеся з нашим прайс-листом та перевірте доступність послуг.</p>
      <p><Link to="/services">Перейти до каталогу послуг</Link></p>
      <p><Link to="/requests/new">Підготувати заявку на ремонт</Link></p>
    </>
  )
}
