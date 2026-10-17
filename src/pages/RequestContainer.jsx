import RequestPage from './RequestPage.jsx'
import useServiceSelection from '../hooks/useServiceSelection.js'


export default function RequestContainer() {
  const { selectedId, selectedItem, clearSelection } = useServiceSelection()

  return (
    <RequestPage
      key={selectedId ?? 'empty'}
      item={selectedItem}
      onClearSelection={clearSelection}
    />
  )
}
