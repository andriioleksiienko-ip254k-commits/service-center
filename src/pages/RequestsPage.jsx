import { useState } from 'react'
import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import RequestFilters from '../components/requests/RequestFilters.jsx'
import RequestTable from '../components/requests/RequestTable.jsx'
import useRequests from '../hooks/useRequests.js'
import useRequestFilters from '../hooks/useRequestFilters.js'
import useDeleteRequest from '../hooks/useDeleteRequest.js'

// Індексна сторінка /requests: поточна колекція з RequestsProvider,
// пошук/фільтр/порядок з URL, видалення з підтвердженням.
export default function RequestsPage({ items }) {
  const { requests } = useRequests()
  const filters = useRequestFilters(requests, items)
  const deleteWithConfirmation = useDeleteRequest(items)
  const [error, setError] = useState('')

  function handleDelete(request) {
    setError('')
    const result = deleteWithConfirmation(request)
    if (!result.ok && !result.cancelled) setError(result.message)
  }

  return (
    <>
      <PageHeading title="Заявки на ремонт" />
      <p><Link to="/requests/new">Створити заявку</Link></p>
      <RequestFilters
        items={items}
        query={filters.query}
        service={filters.service}
        sort={filters.sort}
        onQueryChange={filters.setQuery}
        onServiceChange={filters.setService}
        onSortChange={filters.setSort}
        onReset={filters.resetFilters}
      />
      <p>Показано: {filters.visibleRequests.length} із {requests.length}</p>
      {error && <p role="alert" className="form-alert">{error}</p>}

      {/* Два різні порожні випадки: колекція порожня / записи є, але не відповідають умовам */}
      {requests.length === 0 ? (
        <EmptyState title="Заявок ще немає.">
          <p><Link to="/services">Виберіть послугу для першої заявки</Link></p>
        </EmptyState>
      ) : filters.visibleRequests.length === 0 ? (
        <EmptyState title="За цими умовами нічого не знайдено.">
          <AppButton variant="secondary" onClick={filters.resetFilters}>
            Показати всі заявки
          </AppButton>
        </EmptyState>
      ) : (
        <RequestTable
          requests={filters.visibleRequests}
          items={items}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
