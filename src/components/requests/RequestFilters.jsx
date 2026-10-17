import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

// Керовані поля списку заявок; значення й callbacks надає useRequestFilters.
// items: послуги каталогу для фільтра.
export default function RequestFilters({
  items,
  query,
  service,
  sort,
  onQueryChange,
  onServiceChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="catalog-filters request-filters">
      <FormField
        id="requests-query"
        label="Пошук у заявках"
        hint="Номер, послуга, пристрій, виробник, модель або опис."
      >
        <input
          id="requests-query"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          aria-describedby="requests-query-hint"
        />
      </FormField>

      <FormField id="requests-service" label="Послуга">
        <select
          id="requests-service"
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
        >
          <option value="all">Усі послуги</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} (від {item.price} грн)
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="requests-sort" label="Упорядкування">
        <select
          id="requests-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="service">За назвою послуги</option>
          <option value="cost-asc">Вартість: спочатку менша</option>
          <option value="cost-desc">Вартість: спочатку більша</option>
        </select>
      </FormField>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути умови
      </AppButton>
    </div>
  )
}
