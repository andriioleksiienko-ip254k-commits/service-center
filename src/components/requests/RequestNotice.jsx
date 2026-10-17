import useRequests from '../../hooks/useRequests.js'
import AppButton from '../ui/AppButton.jsx'

// Повідомлення про останню прийняту операцію з колекцією.
// Область role="status" існує завжди, текст з'являється лише після успіху
// й лишається до закриття або наступної операції.
export default function RequestNotice() {
  const { notice, dismissNotice } = useRequests()

  return (
    <div className={notice ? 'operation-notice has-notice' : 'operation-notice'}>
      <p role="status">{notice}</p>
      {notice && (
        <AppButton variant="secondary" onClick={dismissNotice}>
          Закрити повідомлення
        </AppButton>
      )}
    </div>
  )
}
