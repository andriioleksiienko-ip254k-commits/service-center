import Section from '../components/ui/Section.jsx'
import CatalogSummary from '../components/catalog/CatalogSummary.jsx'
import ServiceFilters from '../components/catalog/ServiceFilters.jsx'
import ServiceList from '../components/catalog/ServiceList.jsx'
import useServiceFilters from '../hooks/useServiceFilters.js'


export default function HomePage({ items, selectedId, onSelect }) {
  
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useServiceFilters(items)

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
        <CatalogSummary total={items.length} />
        <ServiceFilters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />
        <p>Показано послуг: {visibleItems.length}</p>
        <ServiceList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={items.length === 0
            ? 'Прайс-лист наразі оновлюється. Завітайте пізніше.'
            : 'За цими фільтрами нічого не знайдено. Змініть запит або скиньте фільтри.'}
        />
        <p><a href="#request">Перейти до підготовки заявки</a></p>
      </Section>
    </>
  )
}
