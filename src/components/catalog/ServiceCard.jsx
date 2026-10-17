import { useState } from 'react'
import { Link } from 'react-router'
import AvailabilityBadge from './AvailabilityBadge.jsx'
import AppButton from '../ui/AppButton.jsx'

// item: коректний запис { id, name, category, description, price, available }
// selected: приходить ззовні (вибір потрібен також заявці), не копіюється в локальний стан
// onSelect: повідомляє власника вибору лише ідентифікатором
export default function ServiceCard({ item, selected, onSelect }) {
  // Локальний стан інтерфейсу: належить саме цьому екземпляру картки
  const [detailsOpen, setDetailsOpen] = useState(false)
  const descriptionId = `service-${item.id}-description`

  return (
    <article className={selected ? 'service-card service-card-selected' : 'service-card'}>
      <h3>
        <Link to={`/services/${encodeURIComponent(item.id)}`}>
          {item.name}
        </Link>
      </h3>
      <p className="category">{item.category}</p>
      <p className="price">Від {item.price} грн</p>
      <p><AvailabilityBadge available={item.available} /></p>
      <p id={descriptionId} hidden={!detailsOpen}>{item.description}</p>
      <AppButton
        variant="secondary"
        aria-expanded={detailsOpen}
        aria-controls={descriptionId}
        onClick={() => setDetailsOpen((previous) => !previous)}
        className = 'margin-top'
      >
        {detailsOpen ? 'Згорнути опис' : 'Показати опис'}
      </AppButton>
      

      <AppButton
        aria-pressed={selected}
        onClick={() => onSelect(item.id)}
        className={selected ? 'selected-btn' : ''}
        >
          {selected ? 'Вибрано' : 'Вибрати послугу'}
      </AppButton>
    </article>
  )
}
