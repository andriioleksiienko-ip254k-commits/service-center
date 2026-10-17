import { Link } from 'react-router'
import AppButton from '../ui/AppButton.jsx'

// Таблиця вже відібраних і впорядкованих заявок (подання рядків із RequestsPage Л 2.2).
// onDelete отримує конкретний запис; операція видаляє його за стабільним id.
export default function RequestTable({ requests, items, onDelete }) {
  return (
    <div className="table-scroll">
      <table className="requests-table">
        <caption>Заявки поточної локальної колекції</caption>
        <thead>
          <tr>
            <th scope="col">Номер</th>
            <th scope="col">Послуга</th>
            <th scope="col">Пристрій</th>
            <th scope="col">Несправність</th>
            <th scope="col">Макс. вартість, грн</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const item = items.find((entry) => entry.id === request.serviceId)
            const path = `/requests/${encodeURIComponent(request.id)}`

            return (
              <tr key={request.id}>
                <td><code>{request.id}</code></td>
                <td>{item?.name ?? 'Послугу вилучено з каталогу'}</td>
                <td>{[request.deviceType, request.brand, request.model].filter(Boolean).join(' ')}</td>
                <td>{request.problem}</td>
                <td>{request.maxCost}</td>
                <td>
                  <div className="table-actions">
                    <Link to={path}>Переглянути</Link>
                    <Link to={`${path}/edit`}>Редагувати</Link>
                    <AppButton variant="secondary" onClick={() => onDelete(request)}>
                      Видалити {request.id}
                    </AppButton>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
