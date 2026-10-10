import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function RequestFormPreview({ idPrefix, serviceName }) {
  const serviceId = `${idPrefix}-service`
  const deviceId = `${idPrefix}-device`
  const brandId = `${idPrefix}-brand`
  const modelId = `${idPrefix}-model`
  const problemId = `${idPrefix}-problem`
  const noticeId = `${idPrefix}-notice`

  return (
    <form
      aria-label="Макет заявки на ремонт"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
    >

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
          defaultValue=""
          aria-describedby={`${deviceId}-hint`}
        />
      </FormField>

      <FormField id={brandId} label="Виробник">
        <input id={brandId} name="brand" defaultValue="" />
      </FormField>

      <FormField id={modelId} label="Модель">
        <input id={modelId} name="model" defaultValue="" />
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
          defaultValue=""
          aria-describedby={`${problemId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton type="reset" variant="secondary">Очистити текст</AppButton>
        <AppButton disabled>Надіслати</AppButton>
      </div>
    </form>
  )
}
