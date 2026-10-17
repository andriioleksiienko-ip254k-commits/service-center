import ServiceCard from './ServiceCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'


export default function ServiceList({
  items,
  selectedId,
  onSelect,
  emptyTitle = 'Прайс-лист наразі оновлюється. Завітайте пізніше.',
}) {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} />
  }

  return (
    <ul className="service-grid">
      {items.map((item) => (
        <li key={item.id}>
          <ServiceCard
            item={item}
            selected={item.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}
