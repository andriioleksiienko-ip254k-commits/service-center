import useRequests from './useRequests.js'

// Одна процедура видалення для списку й деталей:
// підтвердження конкретного запису (номер і послуга), потім операція за id.
// Скасування повертає { ok: false, cancelled: true } і не є помилкою.
export default function useDeleteRequest(items) {
  const { deleteRequest } = useRequests()

  return function deleteWithConfirmation(request) {
    const item = items.find((entry) => entry.id === request.serviceId)
    const name = item?.name ?? request.serviceId
    const confirmed = window.confirm(
      `Видалити заявку ${request.id} на послугу «${name}»? `
      + 'Запис буде вилучено з поточної колекції. Скасувати видалення буде неможливо.',
    )
    if (!confirmed) return { ok: false, cancelled: true }
    return deleteRequest(request.id)
  }
}
