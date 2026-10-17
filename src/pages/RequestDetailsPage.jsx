import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import useRequests from '../hooks/useRequests.js'
import useDeleteRequest from '../hooks/useDeleteRequest.js'
import NotFoundPage from './NotFoundPage.jsx'

// /requests/:requestId: збережений запис зі спільної колекції (не чернетка).
export default function RequestDetailsPage({ items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests } = useRequests()
  const deleteWithConfirmation = useDeleteRequest(items)
  const [error, setError] = useState('')
  const request = requests.find((entry) => entry.id === requestId)

  if (!request) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message="У поточній колекції немає заявки з таким номером. Після перезавантаження сторінки створені заявки зникають."
      />
    )
  }

  const item = items.find((entry) => entry.id === request.serviceId)
  const path = `/requests/${encodeURIComponent(request.id)}`

  function handleDelete() {
    setError('')
    const result = deleteWithConfirmation(request)
    if (result.ok) navigate('/requests', { replace: true })
    else if (!result.cancelled) setError(result.message)
  }

  return (
    <>
      <PageHeading title={`Заявка ${request.id}`} />
      {error && <p role="alert" className="form-alert">{error}</p>}
      <article className="service-details">
        <dl className="request-details">
          <dt>Послуга</dt>
          <dd>
            {item
              ? <Link to={`/services/${encodeURIComponent(item.id)}`}>{item.name}</Link>
              : 'Послугу вилучено з каталогу'}
          </dd>
          <dt>Тип пристрою</dt>
          <dd>{request.deviceType}</dd>
          <dt>Виробник</dt>
          <dd>{request.brand}</dd>
          <dt>Модель</dt>
          <dd>{request.model || 'Не вказано'}</dd>
          <dt>Опис несправності</dt>
          <dd>{request.problem}</dd>
          <dt>Погоджена максимальна вартість</dt>
          <dd>{request.maxCost} грн</dd>
        </dl>
        <p>Збережена заявка ще не є прийнятим замовленням на ремонт.</p>
        <div className="details-actions">
          <Link to={`${path}/edit`}>Редагувати заявку</Link>
          <AppButton variant="secondary" onClick={handleDelete}>
            Видалити заявку
          </AppButton>
          <Link to="/requests">До всіх заявок</Link>
        </div>
      </article>
    </>
  )
}
