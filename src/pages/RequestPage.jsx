import { useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/catalog/AvailabilityBadge.jsx'
import RequestForm from '../components/requests/RequestForm.jsx'
import RequestSummary from '../components/requests/RequestSummary.jsx'
import { validateRequest } from '../domain/requestValidation.js'

const emptyDraft = {
  deviceType: '', brand: '', model: '', problem: '', maxCost: '',
}
const FIELD_ORDER = ['deviceType', 'brand', 'model', 'problem', 'maxCost']

// Спільний редактор для створення й редагування.
// item: перевірена маршрутною сторінкою послуга; initialDraft: початкові поля;
// onSave(value): синхронна операція власника колекції, повертає { ok, ... };
// onCancel: дія виходу. Власник чернетки й ознак перевірки: ця сторінка.
// Маршрутні сторінки задають key за ідентичністю редактора.
export default function RequestPage({
  title,
  item,
  initialDraft = emptyDraft,
  onSave,
  onCancel,
  submitLabel = 'Зберегти заявку',
  cancelLabel = 'Вийти без збереження',
}) {
  // Чернетка зберігає числове поле рядком, щоб його можна було тимчасово очистити
  const initialValues = {
    deviceType: initialDraft.deviceType ?? '',
    brand: initialDraft.brand ?? '',
    model: initialDraft.model ?? '',
    problem: initialDraft.problem ?? '',
    maxCost: initialDraft.maxCost === undefined ? '' : String(initialDraft.maxCost),
  }
  const [draft, setDraft] = useState(() => ({ ...initialValues }))
  const [touched, setTouched] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [operationError, setOperationError] = useState('')

  // Перевірка завжди обчислюється з актуальних значень (не зберігається копією),
  // а показуються лише помилки полів, з яких вийшли, або всі після спроби подання.
  const validation = validateRequest({ ...draft, serviceId: item.id }, [item])
  const errors = Object.fromEntries(
    Object.entries(validation.errors).filter(([field]) => (
      attempted || touched[field] || field === 'serviceId'
    )),
  )
  const isDirty = FIELD_ORDER.some((field) => draft[field] !== initialValues[field])

  function handleFieldChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
    setOperationError('')
  }

  function handleFieldBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setAttempted(true)
    setOperationError('')

    // Некоректна форма не очищується й не перенаправляє: фокус на перше поле з помилкою
    if (!validation.ok) {
      const firstField = FIELD_ORDER.find((field) => validation.errors[field])
      if (firstField) event.currentTarget.elements.namedItem(firstField)?.focus()
      return
    }

    if (!onSave) {
      setOperationError('Збереження для цієї сторінки не підключено.')
      return
    }

    // Відмова операції показується в формі, введення залишається
    const result = onSave(validation.value)
    if (!result.ok) {
      setOperationError(
        result.message || Object.values(result.errors ?? {}).join(' '),
      )
    }
  }

  function handleReset() {
    if (!isDirty) return
    if (!window.confirm('Відкинути введені зміни та відновити початкові поля?')) return
    setDraft({ ...initialValues })
    setTouched({})
    setAttempted(false)
    setOperationError('')
  }

  function handleCancel() {
    if (isDirty && !window.confirm('Вийти та відкинути незбережені зміни?')) return
    onCancel()
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="request" title="Дані заявки">
        <p>
          Вибрана послуга: «{item.name}», від {item.price} грн{' '}
          <AvailabilityBadge available={item.available} />
        </p>
        <RequestForm
          idPrefix="request-draft"
          serviceName={item.name}
          draft={draft}
          errors={errors}
          operationError={operationError}
          minCost={item.price}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onSubmit={handleSubmit}
          onReset={handleReset}
          submitLabel={submitLabel}
        />
        <RequestSummary serviceName={item.name} draft={draft} />
        <AppButton variant="secondary" onClick={handleCancel}>
          {cancelLabel}
        </AppButton>
      </Section>
    </>
  )
}
