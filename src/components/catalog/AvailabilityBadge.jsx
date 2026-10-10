
export default function AvailabilityBadge({ available }) {
  const label = available ? 'Доступно для замовлення' : 'Тимчасово недоступно'
  const className = available ? 'status available' : 'status'

  return <span className={className}>{label}</span>
}
