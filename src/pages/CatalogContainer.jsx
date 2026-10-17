import HomePage from './HomePage.jsx'
import useServiceSelection from '../hooks/useServiceSelection.js'


export default function CatalogContainer({ items }) {
  const { selectedId, selectService } = useServiceSelection()

  return (
    <HomePage
      items={items}
      selectedId={selectedId}
      onSelect={selectService}
    />
  )
}
