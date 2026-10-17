// error (Л 3.1): необов'язковий текст помилки під полем з id `${id}-error`.
// Зв'язок поля з підказкою й помилкою (aria-describedby) задає місце використання.
export default function FormField({ id, label, hint, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  )
}
