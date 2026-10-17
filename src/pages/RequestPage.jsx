import { useEffect, useState } from 'react'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import RequestForm from '../components/requests/RequestForm.jsx'
import RequestSummary from '../components/requests/RequestSummary.jsx'

function createEmptyDraft() {
  return { deviceType: '', brand: '', model: '', problem: '' }
}


export default function RequestPage({ item, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft)

  
  const title = item ? `FixIT Service: ${item.name}` : 'FixIT Service'

  
  useEffect(() => {
    const previousTitle = document.title
    document.title = title
    return () => {
      document.title = previousTitle
    }
  }, [title])

 
  function handleFieldChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
  }

  function handleReset() {
    setDraft(createEmptyDraft())
  }

  
  if (!item) {
    return (
      <Section id="request" title="Підготовка заявки">
        <EmptyState title="Послугу ще не вибрано.">
          <p>
            Виберіть послугу в <a href="#catalog">каталозі</a>, щоб підготувати
            чернетку заявки.
          </p>
        </EmptyState>
      </Section>
    )
  }

  return (
    <Section id="request" title="Підготовка заявки">
      <p>
        Вибрана послуга: «{item.name}»{' '}
        <AvailabilityBadge available={item.available} />
      </p>
      <RequestForm
        idPrefix="request-draft"
        serviceName={item.name}
        draft={draft}
        onFieldChange={handleFieldChange}
        onReset={handleReset}
      />
      <RequestSummary serviceName={item.name} draft={draft} />
      <AppButton variant="secondary" onClick={onClearSelection}>
        Скасувати вибір і очистити чернетку
      </AppButton>
    </Section>
  )
}
