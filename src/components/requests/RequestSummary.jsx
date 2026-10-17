const SUMMARY_FIELDS = [
  { field: 'deviceType', label: 'Тип пристрою' },
  { field: 'brand', label: 'Виробник' },
  { field: 'model', label: 'Модель' },
  { field: 'problem', label: 'Опис несправності' },
]


export default function RequestSummary({ serviceName, draft }) {
  return (
    <aside className="request-summary" aria-labelledby="request-summary-title">
      <h3 id="request-summary-title">Поточна чернетка</h3>
      <dl>
        <dt>Послуга</dt>
        <dd>{serviceName}</dd>
        {SUMMARY_FIELDS.map(({ field, label }) => (
          <div key={field}>
            <dt>{label}</dt>
            <dd>{draft[field].trim() || 'Ще не вказано'}</dd>
          </div>
        ))}
      </dl>
      <p>Цей підсумок не є поданою заявкою.</p>
    </aside>
  )
}
