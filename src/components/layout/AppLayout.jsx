import { Outlet } from 'react-router'
import SiteHeader from './SiteHeader.jsx'
import ServiceSelectionProvider from '../../providers/ServiceSelectionProvider.jsx'

// Маршрут-оболонка: дочірня сторінка з'являється в Outlet.
// Єдиний <main> і єдиний провайдер вибору: поки оболонка змонтована,
// перехід між сторінками не скидає останній вибір.
// Шапка й підвал вибір не потребують і лишаються поза провайдером.
export default function AppLayout({ title, links, items }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <SiteHeader title={title} links={links} />
      <main id="main-content" tabIndex={-1}>
        <ServiceSelectionProvider items={items}>
          <Outlet />
        </ServiceSelectionProvider>
      </main>
      <footer>Навчальний проєкт. Каталог послуг і підготовка заявки.</footer>
    </>
  )
}
