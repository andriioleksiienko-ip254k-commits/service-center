import ServiceCard from '../components/ServiceCard.jsx'
import { services } from '../data/services.js'

export default function HomePage() {
  return (
    <>
      <section id="about" aria-labelledby="about-title">
        <h1 id="about-title">Комп'ютерний Сервіс</h1>
        <p>Вебзастосунок сервісного центру з онлайн-замовлення послуг ремонту комп’ютерної техніки.</p>
        <p>Ознайомтеся з нашим прайс-листом та перевірте доступність послуг.</p>
      </section>

      <section id="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Каталог послуг</h2>
        <p>Доступно послуг у системі: {services.length}</p>

        {services.length === 0 ? (
          <p>Прайс-лист наразі оновлюється. Завітайте пізніше.</p>
        ) : (
          <ul className="service-grid">
            {services.map((item) => (
              <li key={item.id}>
                <ServiceCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}