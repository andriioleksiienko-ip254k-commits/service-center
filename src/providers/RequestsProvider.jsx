import { useRef, useState } from 'react'
import { RequestsContext } from '../context/RequestsContext.js'
import { requests as initialRequests } from '../data/requests.js'
import { validateRequest } from '../domain/requestValidation.js'

// Наступний номер заявки після найбільшого з початкових (req-003 -> 4)
function nextNumberAfter(records) {
  return records.reduce((max, record) => {
    const number = Number(record.id.replace(/^req-/, ''))
    return Number.isInteger(number) && number > max ? number : max
  }, 0) + 1
}

// Л 3.1: єдиний власник колекції заявок у пам'яті застосунку.
// Початковий масив використовується лише для ініціалізації; після
// перезавантаження документа відновлюються початкові записи.
// Кожна операція синхронна й повертає явний результат { ok, ... };
// при ok: false стан не змінюється.
export default function RequestsProvider({ items, children }) {
  const [requests, setRequests] = useState(() => (
    initialRequests.map((request) => ({ ...request }))
  ))
  // Повідомлення лише про прийняту операцію; відмова прибирає попереднє,
  // щоб не створювати враження збереження
  const [notice, setNotice] = useState('')
  // Лічильник номерів: id видаленої заявки повторно не видається
  const nextNumber = useRef(nextNumberAfter(initialRequests))

  function createRequest(input) {
    const validation = validateRequest(input, items)
    if (!validation.ok) {
      setNotice('')
      return validation
    }

    // id створюється один раз в операції, а не в updater чи під час рендеру
    const id = `req-${String(nextNumber.current).padStart(3, '0')}`
    nextNumber.current += 1
    const record = { id, ...validation.value }
    setRequests((previous) => [...previous, record])
    setNotice(`Заявку ${id} створено в поточній локальній колекції.`)
    return { ok: true, record }
  }

  function updateRequest(id, input) {
    const current = requests.find((request) => request.id === id)
    if (!current) {
      setNotice('')
      return { ok: false, message: 'Заявку для оновлення не знайдено.' }
    }

    const validation = validateRequest(input, items)
    if (!validation.ok) {
      setNotice('')
      return validation
    }

    // id береться з наявного запису: переданий ззовні id його не замінить
    const record = { ...validation.value, id: current.id }
    setRequests((previous) => previous.map((request) => (
      request.id === id ? record : request
    )))
    setNotice(`Зміни заявки ${id} збережено в поточній локальній колекції.`)
    return { ok: true, record }
  }

  function deleteRequest(id) {
    if (!requests.some((request) => request.id === id)) {
      setNotice('')
      return { ok: false, message: 'Заявку для видалення не знайдено.' }
    }

    setRequests((previous) => previous.filter((request) => request.id !== id))
    setNotice(`Заявку ${id} видалено з поточної локальної колекції.`)
    return { ok: true }
  }

  function dismissNotice() {
    setNotice('')
  }

  const value = {
    requests,
    createRequest,
    updateRequest,
    deleteRequest,
    notice,
    dismissNotice,
  }

  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  )
}
