import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'
import { REQUEST_LIMITS } from '../../domain/requestValidation.js'

// Спільна форма заявки для створення й редагування.
// Контракт Л 2.1–2.2 збережено (idPrefix, serviceName, draft, onFieldChange, onReset),
// Л 3.1 додає: errors (видимі помилки за назвами полів), operationError,
// onFieldBlur, onSubmit, submitLabel, minCost (ціна послуги для підказки).
// Форма не знає, створення це чи оновлення, і не перевіряє значення сама.
export default function RequestForm({
  idPrefix,
  serviceName,
  draft,
  errors = {},
  operationError = '',
  minCost,
  onFieldChange,
  onFieldBlur = () => {},
  onSubmit,
  onReset,
  submitLabel = 'Зберегти заявку',
}) {
  const serviceId = `${idPrefix}-service`
  const deviceId = `${idPrefix}-device`
  const brandId = `${idPrefix}-brand`
  const modelId = `${idPrefix}-model`
  const problemId = `${idPrefix}-problem`
  const costId = `${idPrefix}-cost`
  const noticeId = `${idPrefix}-notice`
  const hasErrors = Object.keys(errors).length > 0
  const limits = REQUEST_LIMITS

  // aria-describedby: підказка (якщо є) і помилка (якщо показана)
  function describedBy(id, error, hasHint = true) {
    const ids = []
    if (hasHint) ids.push(`${id}-hint`)
    if (error) ids.push(`${id}-error`)
    return ids.length > 0 ? ids.join(' ') : undefined
  }

  // Спільні props керованого поля: значення з чернетки, помилка, позначка touched
  function fieldProps(field, id, hasHint = true) {
    return {
      id,
      name: field,
      value: draft[field],
      onChange: (event) => onFieldChange(field, event.target.value),
      onBlur: () => onFieldBlur(field),
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': describedBy(id, errors[field], hasHint),
    }
  }

  return (
    <form
      noValidate
      aria-label="Форма заявки на ремонт"
      aria-describedby={noticeId}
      onSubmit={onSubmit}
    >
      <p id={noticeId} className="draft-notice">
        Збережіть зміни кнопкою нижче. Незбережене введення зникає при виході
        зі сторінки або її перезавантаженні. Збережені заявки зберігаються лише
        в пам'яті застосунку до перезавантаження сторінки.
      </p>

      {hasErrors && <p role="alert" className="form-alert">Виправте позначені поля.</p>}
      {errors.serviceId && <p role="alert" className="form-alert">{errors.serviceId}</p>}
      {operationError && <p role="alert" className="form-alert">{operationError}</p>}

      <FormField id={serviceId} label="Послуга">
        <input id={serviceId} name="serviceName" value={serviceName} readOnly />
      </FormField>

      <FormField
        id={deviceId}
        label="Тип пристрою (обов'язково)"
        hint={`Наприклад: ноутбук, системний блок, моноблок. Від ${limits.deviceType.min} до ${limits.deviceType.max} символів.`}
        error={errors.deviceType}
      >
        <input {...fieldProps('deviceType', deviceId)} required />
      </FormField>

      <FormField
        id={brandId}
        label="Виробник (обов'язково)"
        hint={`Від ${limits.brand.min} до ${limits.brand.max} символів.`}
        error={errors.brand}
      >
        <input {...fieldProps('brand', brandId)} required />
      </FormField>

      <FormField
        id={modelId}
        label="Модель"
        hint={`Необов'язково, якщо невідома. До ${limits.model.max} символів.`}
        error={errors.model}
      >
        <input {...fieldProps('model', modelId)} />
      </FormField>

      <FormField
        id={problemId}
        label="Опис несправності (обов'язково)"
        hint={`Опишіть симптоми: коли виникає проблема і що вже пробували. Від ${limits.problem.min} до ${limits.problem.max} символів.`}
        error={errors.problem}
      >
        <textarea {...fieldProps('problem', problemId)} rows={4} required />
      </FormField>

      <FormField
        id={costId}
        label="Погоджена максимальна вартість, грн (обов'язково)"
        hint={`Ціле число, не менше ціни послуги (${minCost} грн) і не більше ${limits.maxCost.max}. Роботи понад цю суму погоджуються окремо.`}
        error={errors.maxCost}
      >
        <input
          {...fieldProps('maxCost', costId)}
          type="number"
          inputMode="numeric"
          min={minCost}
          max={limits.maxCost.max}
          step={1}
          required
        />
      </FormField>

      <div className="form-actions">
        <AppButton type="submit">{submitLabel}</AppButton>
        <AppButton variant="secondary" onClick={onReset}>
          Відновити початкові поля
        </AppButton>
      </div>
    </form>
  )
}
