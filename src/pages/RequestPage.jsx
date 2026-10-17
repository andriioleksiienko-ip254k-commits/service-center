import { useState } from 'react'
import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import RequestForm from '../components/requests/RequestForm.jsx'
import RequestSummary from '../components/requests/RequestSummary.jsx'

function createEmptyDraft() {
  return { deviceType: '', brand: '', model: '', problem: '' }
}

// item: вибрана послуга або undefined
// onClearSelection: просить власника вибору скасувати вибір
// Власник draft: ця сторінка, бо чернетку бачать і форма, і підсумок.
// Заголовок вкладки тепер синхронізує PageHeading, тому власного ефекту тут немає.
export default function RequestPage({ item, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft)

  // Функціональне оновлення з копіюванням: решта полів чернетки зберігається
  function handleFieldChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
  }

  function handleReset() {
    setDraft(createEmptyDraft())
  }

  // Хуки вище умовного повернення: порядок їхніх викликів не змінюється
  if (!item) {
    return (
      <>
        <PageHeading title="Підготовка заявки" />
        <EmptyState title="Послугу ще не вибрано.">
          <p>
            Виберіть послугу в <Link to="/services">каталозі</Link>, щоб
            підготувати чернетку заявки.
          </p>
        </EmptyState>
      </>
    )
  }

  return (
    <>
      <PageHeading title={`Заявка: ${item.name}`} />
      <Section id="request" title="Дані заявки">
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
    </>
  )
}
