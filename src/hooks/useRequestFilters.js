import { useSearchParams } from 'react-router'

export const REQUEST_SORTS = ['service', 'cost-asc', 'cost-desc']

// Л 3.1, крок 8: пошук, фільтр і порядок списку заявок у query parameters /requests.
//   q        текст: номер, назва послуги, пристрій, виробник, модель, опис
//   service  id послуги каталогу або відсутній (усі)
//   sort     service (за замовчуванням) | cost-asc | cost-desc
// Відсутні й невідомі значення означають значення за замовчуванням.
// Стан не дублюється в useState; видимі записи обчислюються з колекції.
export default function useRequestFilters(requests, items) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const rawService = searchParams.get('service')
  const service = items.some((item) => item.id === rawService) ? rawService : 'all'
  const rawSort = searchParams.get('sort')
  const sort = REQUEST_SORTS.includes(rawSort) ? rawSort : 'service'
  const names = new Map(items.map((item) => [item.id, item.name]))
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  // filter створює новий масив, тому sort нижче не змінює спільну колекцію
  const visibleRequests = requests.filter((request) => {
    const text = [
      request.id,
      names.get(request.serviceId) ?? '',
      request.deviceType,
      request.brand,
      request.model,
      request.problem,
    ].join(' ').toLocaleLowerCase('uk')
    const matchesService = service === 'all' || request.serviceId === service
    return text.includes(normalizedQuery) && matchesService
  })

  visibleRequests.sort((a, b) => {
    let order = 0
    if (sort === 'cost-asc') order = a.maxCost - b.maxCost
    else if (sort === 'cost-desc') order = b.maxCost - a.maxCost
    else {
      // Заявки з послугою, вилученою з каталогу, ідуть у кінці
      const nameA = names.get(a.serviceId)
      const nameB = names.get(b.serviceId)
      if (nameA === undefined || nameB === undefined) {
        order = (nameA === undefined) - (nameB === undefined)
      } else {
        order = nameA.localeCompare(nameB, 'uk')
      }
    }
    // Однозначний додатковий порядок для однакових значень
    return order || a.id.localeCompare(b.id)
  })

  function setParameter(name, value, defaultValue, replace = false) {
    const next = new URLSearchParams(searchParams)
    if (value === defaultValue || value === '') next.delete(name)
    else next.set(name, value)
    setSearchParams(next, { replace })
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('service')
    next.delete('sort')
    setSearchParams(next)
  }

  return {
    query,
    service,
    sort,
    visibleRequests,
    // Текст: replace, щоб кожна літера не ставала окремим записом історії
    setQuery: (value) => setParameter('q', value, '', true),
    setService: (value) => setParameter('service', value, 'all'),
    setSort: (value) => setParameter('sort', value, 'service'),
    resetFilters,
  }
}
