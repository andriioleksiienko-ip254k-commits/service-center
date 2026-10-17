import { useNavigate, useParams } from 'react-router'
import useRequests from '../hooks/useRequests.js'
import RequestPage from './RequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// /requests/:requestId/edit
// Заявку вибирає параметр шляху, послугу: її serviceId. Останній вибір
// з контексту тут не використовується: редагується конкретний запис з адреси.
// Л 3.1: заявка шукається в поточній колекції RequestsProvider.
export default function RequestEditPage({ items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests, updateRequest } = useRequests()
  const request = requests.find((entry) => entry.id === requestId)

  if (!request) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message="Перевірте номер заявки в адресі. Після перезавантаження сторінки створені заявки зникають."
      />
    )
  }

  const item = items.find((entry) => entry.id === request.serviceId)

  if (!item) {
    return (
      <NotFoundPage
        title="Послугу заявки не знайдено"
        message="Демонстраційна заявка посилається на послугу, якої немає в каталозі."
      />
    )
  }

  // Операція оновлення: id запису не змінюється. Перехід лише після успіху;
  // після успіху відкриваються деталі збереженого запису.
  function handleSave(value) {
    const result = updateRequest(request.id, { ...value, serviceId: request.serviceId })
    if (result.ok) {
      navigate(`/requests/${encodeURIComponent(result.record.id)}`, { replace: true })
    }
    return result
  }

  return (
    <RequestPage
      key={`edit-${request.id}`}
      title={`Редагування заявки ${request.id}`}
      item={item}
      initialDraft={{
        deviceType: request.deviceType,
        brand: request.brand,
        model: request.model,
        problem: request.problem,
        maxCost: request.maxCost,
      }}
      onSave={handleSave}
      submitLabel="Зберегти зміни"
      onCancel={() => navigate(`/requests/${encodeURIComponent(request.id)}`)}
      cancelLabel="Вийти без збереження"
    />
  )
}
