import { useState } from 'react'
import { ServiceSelectionContext } from '../context/ServiceSelectionContext.js'

export default function ServiceSelectionProvider({ items, children }) {
  const [selectedId, setSelectedId] = useState(null)

  const selectedItem = items.find((item) => item.id === selectedId)

  function selectService(id) {
    if (items.some((item) => item.id === id)) {
      setSelectedId(id)
    }
  }

  function clearSelection() {
    setSelectedId(null)
  }

  const value = {
    selectedId,
    selectedItem,
    selectService,
    clearSelection,
  }

  return (
    <ServiceSelectionContext.Provider value={value}>
      {children}
    </ServiceSelectionContext.Provider>
  )
}
