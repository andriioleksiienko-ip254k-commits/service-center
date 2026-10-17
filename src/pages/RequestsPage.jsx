import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

// Індексна сторінка /requests: локальні демонстраційні заявки.
// requests: масив заявок; items: каталог послуг для пошуку назви за serviceId.
export default function RequestsPage({ requests, items }) {
  return (
    <>
      <PageHeading title="Заявки на ремонт" />
      <p>Нижче наведено локальні демонстраційні записи. Зміни в редакторі поки не зберігаються.</p>
      {requests.length === 0 ? (
        <EmptyState title="Заявок ще немає.">
          <p><Link to="new">Підготувати нову заявку</Link></p>
        </EmptyState>
      ) : (
        <div className="table-scroll">
          <table className="requests-table">
            <caption>Заявки для перевірки навігації</caption>
            <thead>
              <tr>
                <th scope="col">Номер</th>
                <th scope="col">Послуга</th>
                <th scope="col">Пристрій</th>
                <th scope="col">Несправність</th>
                <th scope="col">Дія</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const item = items.find((entry) => entry.id === request.serviceId)

                return (
                  <tr key={request.id}>
                    <td><code>{request.id}</code></td>
                    <td>{item?.name ?? 'Послугу вилучено з каталогу'}</td>
                    <td>{`${request.deviceType} ${request.brand} ${request.model}`}</td>
                    <td>{request.problem}</td>
                    <td>
                      {/* Відносний шлях від /requests: req-001/edit -> /requests/req-001/edit */}
                      <Link to={`${encodeURIComponent(request.id)}/edit`}>
                        Редагувати {request.id}
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
