import { services } from '../data/services.js'
import Section from '../components/ui/Section.jsx'
import CatalogSummary from '../components/catalog/CatalogSummary.jsx'
import ServiceList from '../components/catalog/ServiceList.jsx'

export default function HomePage() {
  return (
    <>
      <Section id="about" title="Про сервіс">
        <p>
          Вебзастосунок сервісного центру з онлайн-замовлення послуг ремонту
          комп’ютерної техніки.
        </p>
        <p>Ознайомтеся з нашим прайс-листом та перевірте доступність послуг.</p>
      </Section>

      <Section id="catalog" title="Каталог послуг">
        <CatalogSummary total={services.length} />
        <ServiceList items={services} />
      </Section>
    </>
  )
}
