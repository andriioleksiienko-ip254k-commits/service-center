import AvailabilityBadge from './AvailabilityBadge.jsx'

export default function ServiceCard({ item }) {
  return (
    <article className="service-card">
      <h3>{item.name}</h3>
      <p className="category">{item.category}</p>
      <p>{item.description}</p>
      <p className="price">Від {item.price} грн</p>
      <p><AvailabilityBadge available={item.available} /></p>
    </article>
  )
}
