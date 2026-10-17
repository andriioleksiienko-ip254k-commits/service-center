import CatalogPage from './CatalogPage.jsx'
import useServiceSelection from '../hooks/useServiceSelection.js'

// Адаптер: перетворює контекст вибору на явні props сторінки каталогу
export default function CatalogContainer({ items }) {
  const { selectedId, selectService } = useServiceSelection()

  return (
    <CatalogPage
      items={items}
      selectedId={selectedId}
      onSelect={selectService}
    />
  )
}
