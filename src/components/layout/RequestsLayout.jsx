import { NavLink, Outlet } from 'react-router'
import RequestNotice from '../requests/RequestNotice.jsx'

// Вкладена оболонка розділу /requests: спільне меню для списку й редакторів.
// h1 не додає (належить сторінці), нового провайдера вибору не створює.
// to="." указує на /requests, to="new" на /requests/new.
export default function RequestsLayout() {
  return (
    <>
      <nav className="section-nav" aria-label="Навігація розділом заявок">
        <ul className="nav-list">
          <li>
            <NavLink
              to="."
              end
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Список заявок
            </NavLink>
          </li>
          <li>
            <NavLink
              to="new"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Нова заявка
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="field-hint">Локальні дані зберігаються до перезавантаження сторінки.</p>
      {/* Повідомлення в спільній оболонці розділу переживає перехід між його сторінками */}
      <RequestNotice />
      <Outlet />
    </>
  )
}
