import { NavLink } from 'react-router'

// links: масив { to, label, end }, адреси без повторів.
// end обмежує збіг кінцем адреси (потрібен лише для пункту «Головна»).
export default function MainNav({ links }) {
  return (
    <nav aria-label="Основна навігація">
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => (
                isActive ? 'nav-link active' : 'nav-link'
              )}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
