import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import useServiceSelection from '../hooks/useServiceSelection.js'
import NotFoundPage from './NotFoundPage.jsx'

// Запис визначає URL (:serviceId), а не останній вибір у контексті,
// тому пряме відкриття адреси не залежить від того, що користувач натискав раніше.
export default function ServiceDetailsPage({ items }) {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { selectService } = useServiceSelection()

  // Ідентифікатор лишається рядком ('srv-001'), у число його не перетворюємо
  const item = items.find((entry) => entry.id === serviceId)

  // Усі хуки викликано вище умовного повернення
  if (!item) {
    return (
      <NotFoundPage
        title="Послугу не знайдено"
        message="У каталозі немає послуги з таким ідентифікатором."
      />
    )
  }

  // Спочатку дія над станом, потім перехід. Адресу формуємо з відомого item.id,
  // а не з selectedId, який у цьому обробнику ще має попереднє значення.
  function handlePrepareRequest() {
    selectService(item.id)
    const search = new URLSearchParams({ serviceId: item.id })
    navigate(`/requests/new?${search}`)
  }

  return (
    <>
      <PageHeading title={item.name} />
      <article className="service-details">
        <p className="category">{item.category}</p>
        <p className="service-id">Код послуги: <code>{item.id}</code></p>
        <p className="price">Від {item.price} грн</p>
        <p>{item.description}</p>
        <p><AvailabilityBadge available={item.available} /></p>
        <div className="details-actions">
          <AppButton onClick={handlePrepareRequest}>
            Вибрати й підготувати заявку
          </AppButton>
          <Link to="/services">До каталогу послуг</Link>
        </div>
      </article>
    </>
  )
}
