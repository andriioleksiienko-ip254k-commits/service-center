import { useSearchParams } from 'react-router'

// Л 2.2, крок 6: єдине джерело значень фільтрів тепер рядок пошуку URL.
// Контракт хука з Л 2.1 збережено: { query, setQuery, availableOnly,
// setAvailableOnly, visibleItems, resetFilters }, тому ServiceFilters
// і CatalogPage не змінюються. Власних useState тут більше немає.
//   ?q=<текст>      пошук за назвою (відсутній q означає порожній рядок)
//   ?available=1    лише доступні (будь-яке інше значення: фільтр вимкнено)
// Сторонні параметри зберігаються, але на список не впливають.
export default function useServiceFilters(items) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const availableOnly = searchParams.get('available') === '1'

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const visibleItems = items.filter((item) => (
    item.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    && (!availableOnly || item.available)
  ))

  // Копія параметрів: змінюємо лише власний ключ, інші лишаються.
  // replace: кожна введена літера замінює поточний запис історії,
  // а не створює нову зупинку для кнопки «Назад».
  function setQuery(value) {
    const next = new URLSearchParams(searchParams)
    if (value === '') next.delete('q')
    else next.set('q', value)
    setSearchParams(next, { replace: true })
  }

  // Явне перемикання прапорця створює окремий запис історії
  function setAvailableOnly(value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('available', '1')
    else next.delete('available')
    setSearchParams(next)
  }

  // Обидві умови скидаються одним викликом setter
  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('available')
    setSearchParams(next)
  }

  return {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  }
}
