import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import CatalogSummary from '../components/catalog/CatalogSummary.jsx'
import ServiceFilters from '../components/catalog/ServiceFilters.jsx'
import ServiceList from '../components/catalog/ServiceList.jsx'
import useServiceFilters from '../hooks/useServiceFilters.js'

// Сторінка каталогу: вміст попередньої HomePage з Л 2.1 (фільтри, список, вибір).
// items: повний масив послуг; selectedId, onSelect: спільний вибір від контейнера.
export default function CatalogPage({ items, selectedId, onSelect }) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useServiceFilters(items)

  // Адреса нової заявки з останнім вибором; працює й при відкритті в новій вкладці
  const requestSearch = selectedId
    ? `?${new URLSearchParams({ serviceId: selectedId })}`
    : ''

  return (
    <>
      <PageHeading title="Каталог послуг" />
      <Section id="catalog" title="Пошук і вибір">
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
        <p>
          <Link to={`/requests/new${requestSearch}`}>
            Підготувати нову заявку
          </Link>
        </p>
      </Section>
    </>
  )
}
