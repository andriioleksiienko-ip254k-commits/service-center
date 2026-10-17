import { useNavigate, useParams } from 'react-router'
import RequestPage from './RequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// /requests/:requestId/edit
// Заявку вибирає параметр шляху, послугу: її serviceId. Останній вибір
// з контексту тут не використовується: редагується конкретний запис з адреси.
export default function RequestEditPage({ requests, items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const request = requests.find((entry) => entry.id === requestId)

  if (!request) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message="Перевірте ідентифікатор заявки в адресі."
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

  // Збереження ще не реалізоване, тому вихід лише повертає до списку
  // без повідомлення «Збережено».
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
      }}
      onCancel={() => navigate('/requests')}
      cancelLabel="Вийти без збереження"
    />
  )
}
