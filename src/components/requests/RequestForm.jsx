import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'


export default function RequestForm({
  idPrefix,
  serviceName,
  draft,
  onFieldChange,
  onReset,
}) {
  const serviceId = `${idPrefix}-service`
  const deviceId = `${idPrefix}-device`
  const brandId = `${idPrefix}-brand`
  const modelId = `${idPrefix}-model`
  const problemId = `${idPrefix}-problem`
  const noticeId = `${idPrefix}-notice`

  return (
    <form
      aria-label="Чернетка заявки на ремонт"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
    >
      <p id={noticeId}>
        Чернетка існує лише до зміни послуги, скасування вибору або
        перезавантаження сторінки. Заявка не надсилається.
      </p>

      <FormField id={serviceId} label="Послуга">
        <input id={serviceId} name="serviceName" value={serviceName} readOnly />
      </FormField>

      <FormField
        id={deviceId}
        label="Тип пристрою"
        hint="Наприклад: ноутбук, системний блок, моноблок."
      >
        <input
          id={deviceId}
          name="deviceType"
          value={draft.deviceType}
          onChange={(event) => onFieldChange('deviceType', event.target.value)}
          aria-describedby={`${deviceId}-hint`}
        />
      </FormField>

      <FormField id={brandId} label="Виробник">
        <input
          id={brandId}
          name="brand"
          value={draft.brand}
          onChange={(event) => onFieldChange('brand', event.target.value)}
        />
      </FormField>

      <FormField id={modelId} label="Модель">
        <input
          id={modelId}
          name="model"
          value={draft.model}
          onChange={(event) => onFieldChange('model', event.target.value)}
        />
      </FormField>

      <FormField
        id={problemId}
        label="Опис несправності"
        hint="Опишіть симптоми: коли виникає проблема і що вже пробували."
      >
        <textarea
          id={problemId}
          name="problem"
          rows={4}
          value={draft.problem}
          onChange={(event) => onFieldChange('problem', event.target.value)}
          aria-describedby={`${problemId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton variant="secondary" onClick={onReset}>
          Очистити поля
        </AppButton>
        <AppButton disabled>Надсилання буде доступне пізніше</AppButton>
      </div>
    </form>
  )
}
