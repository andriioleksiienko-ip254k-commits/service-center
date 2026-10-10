import ServiceCard from './ServiceCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function ServiceList({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState title="Прайс-лист наразі оновлюється.">
        <p>Завітайте пізніше: після наповнення каталогу тут з'являться послуги.</p>
      </EmptyState>
    )
  }

  return (
    <ul className="service-grid">
      {items.map((item) => (
        <li key={item.id}>
          <ServiceCard item={item} />
        </li>
      ))}
    </ul>
  )
}
