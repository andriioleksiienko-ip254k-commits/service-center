import { useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import RequestForm from '../components/requests/RequestForm.jsx'
import RequestSummary from '../components/requests/RequestSummary.jsx'

const emptyDraft = { deviceType: '', brand: '', model: '', problem: '' }

// Спільний редактор чернетки для створення й редагування (Л 2.2, крок 7).
// title: h1 сторінки; item: перевірена маршрутною сторінкою послуга (обов'язкова);
// initialDraft: початкові поля (для редагування); onCancel: дія виходу.
// Власник draft: ця сторінка, бо чернетку бачать і форма, і підсумок.
// Початковий стан береться лише при монтуванні, тому маршрутні сторінки
// задають key за ідентичністю редактора (new-<serviceId> / edit-<requestId>).
export default function RequestPage({
  title,
  item,
  initialDraft = emptyDraft,
  onCancel,
  cancelLabel = 'Вийти без збереження',
}) {
  const [draft, setDraft] = useState(() => ({ ...initialDraft }))

  // Функціональне оновлення з копіюванням: решта полів чернетки зберігається
  function handleFieldChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
  }

  // Очищення означає порожні поля, а не відновлення початкового запису
  function handleReset() {
    setDraft({ ...emptyDraft })
  }

  return (
    <>
      <PageHeading title={title} />
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
        <AppButton variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </AppButton>
      </Section>
    </>
  )
}
