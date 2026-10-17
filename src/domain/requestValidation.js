// Л 3.1: єдині правила заявки на ремонт для редактора й операцій колекції.
// input: поля заявки (рядки з форми або значення збереженого запису);
// items: довідник послуг (потрібен для перевірки serviceId і мінімальної ціни).
// Функція чиста: не змінює входи й не створює ідентифікаторів.
// Довжина рахується як .length рядка JavaScript після trim().

export const REQUEST_LIMITS = {
  deviceType: { min: 2, max: 50 },
  brand: { min: 2, max: 50 },
  model: { max: 80 },
  problem: { min: 10, max: 1000 },
  maxCost: { max: 100000 },
}

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function checkLength(value, { min, max }, emptyMessage, rangeMessage) {
  if (value.length === 0) return emptyMessage
  if (value.length < min || value.length > max) return rangeMessage
  return null
}

export function validateRequest(input, items) {
  const errors = {}
  const service = items.find((item) => item.id === input.serviceId)
  const deviceType = text(input.deviceType)
  const brand = text(input.brand)
  const model = text(input.model)
  const problem = text(input.problem)
  const costText = String(input.maxCost ?? '').trim()
  const maxCost = Number(costText)
  const { deviceType: dt, brand: br, model: md, problem: pr, maxCost: mc } = REQUEST_LIMITS

  if (!service) {
    errors.serviceId = 'Виберіть наявну послугу з каталогу.'
  }

  const deviceError = checkLength(
    deviceType, dt,
    'Укажіть тип пристрою.',
    `Тип пристрою має містити від ${dt.min} до ${dt.max} символів.`,
  )
  if (deviceError) errors.deviceType = deviceError

  const brandError = checkLength(
    brand, br,
    'Укажіть виробника.',
    `Назва виробника має містити від ${br.min} до ${br.max} символів.`,
  )
  if (brandError) errors.brand = brandError

  // Модель необов'язкова: клієнт може її не знати
  if (model.length > md.max) {
    errors.model = `Модель має містити не більше ${md.max} символів.`
  }

  const problemError = checkLength(
    problem, pr,
    'Опишіть несправність.',
    `Опис несправності має містити від ${pr.min} до ${pr.max} символів без крайніх пробілів.`,
  )
  if (problemError) errors.problem = problemError

  // Порожнє поле перевіряємо до Number(): Number('') дає 0
  if (costText === '') {
    errors.maxCost = 'Укажіть погоджену максимальну вартість.'
  } else if (!Number.isInteger(maxCost) || maxCost < 1 || maxCost > mc.max) {
    errors.maxCost = `Вартість має бути цілим числом гривень від 1 до ${mc.max}.`
  } else if (service && maxCost < service.price) {
    // Зв'язок полів: межа вартості не може бути нижчою за ціну вибраної послуги.
    // Перевіряється лише для коректного числа, щоб не дублювати попередню помилку.
    errors.maxCost = `Послуга коштує від ${service.price} грн: укажіть не менше ${service.price}.`
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  // Нормалізоване значення: лише дозволені предметні поля, без id
  return {
    ok: true,
    errors: {},
    value: {
      serviceId: input.serviceId,
      deviceType,
      brand,
      model,
      problem,
      maxCost,
    },
  }
}
