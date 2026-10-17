import { Link, useNavigate, useSearchParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import useServiceSelection from '../hooks/useServiceSelection.js'
import RequestPage from './RequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// /requests/new?serviceId=srv-001
// Послугу нової заявки визначає URL, а не контекст: пряме відкриття
// й перезавантаження працюють без попереднього вибору.
export default function RequestCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { selectedId, clearSelection } = useServiceSelection()
  const serviceId = searchParams.get('serviceId')

  // Параметра немає: коректна сторінка з наступним кроком
  if (serviceId === null) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ serviceId: selectedId })}`
      : null

    return (
      <>
        <PageHeading title="Нова заявка" />
        <EmptyState title="Спочатку виберіть послугу.">
          <p><Link to="/services">Відкрити каталог послуг</Link></p>
          {lastSelectionSearch && (
            <p>
              <Link to={lastSelectionSearch}>Використати останній вибір</Link>
            </p>
          )}
        </EmptyState>
      </>
    )
  }

  // Параметр є (навіть порожній serviceId=), але запису немає: не підміняємо іншим
  const item = items.find((entry) => entry.id === serviceId)

  if (!item) {
    return (
      <NotFoundPage
        title="Неможливо підготувати заявку"
        message="Послуги з параметра serviceId немає в каталозі."
      />
    )
  }

  // Дія над спільним станом, потім перехід. replace замінює запис редактора,
  // щоб «Назад» не повертав до скасованої чернетки.
  function handleCancel() {
    clearSelection()
    navigate('/services', { replace: true })
  }

  return (
    <RequestPage
      key={`new-${item.id}`}
      title="Нова заявка"
      item={item}
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  )
}
