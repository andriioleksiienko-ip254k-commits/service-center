import { useState } from 'react'


export default function useServiceFilters(items) {
  const [query, setQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')
  const visibleItems = items.filter((item) => (
    item.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    && (!availableOnly || item.available)
  ))

  function resetFilters() {
    setQuery('')
    setAvailableOnly(false)
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
