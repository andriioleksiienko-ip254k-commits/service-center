import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import RequestFormPreview from '../components/requests/RequestFormPreview.jsx'


export default function RequestPage({ item }) {
  return (
    <Section id="request" title="Підготовка заявки">
      {item ? (
        <>
          <p>
            <AvailabilityBadge available={item.available} />
          </p>
          <RequestFormPreview
            idPrefix="request-preview"
            serviceName={item.name}
          />
        </>
      ) : (
        <EmptyState title="Немає послуги для макета заявки.">
          <p><a href="#catalog">Переглянути каталог</a></p>
        </EmptyState>
      )}
    </Section>
  )
}
