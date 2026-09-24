export default function ServiceCard({ item }) {
  const status = item.available ? 'Доступно для замовлення' : 'Тимчасово недоступно'
  
  return (
    <article className="service-card">
      <h3>{item.name}</h3>
      <p className="category">{item.category}</p>
      <p>{item.description}</p>
      <p className="price">Від {item.price} грн</p>
      <p className={item.available ? 'status available' : 'status'}>
        {status}
      </p>
    </article>
  )
}