import { Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import RequestsLayout from './components/layout/RequestsLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import ServiceDetailsPage from './pages/ServiceDetailsPage.jsx'
import RequestsPage from './pages/RequestsPage.jsx'
import RequestCreatePage from './pages/RequestCreatePage.jsx'
import RequestDetailsPage from './pages/RequestDetailsPage.jsx'
import RequestEditPage from './pages/RequestEditPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { services } from './data/services.js'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/services', label: 'Каталог послуг' },
  { to: '/requests', label: 'Заявки' },
]

export default function App() {
  return (
    <Routes>
      {/* Маршрут без path: спільна оболонка, що не додає сегмента до адреси */}
      <Route
        element={(
          <AppLayout title="FixIT Service" links={navigationLinks} items={services} />
        )}
      >
        <Route index element={<HomePage />} />

        {/* Група шляхів без власного елемента */}
        <Route path="services">
          <Route index element={<CatalogContainer items={services} />} />
          <Route path=":serviceId" element={<ServiceDetailsPage items={services} />} />
        </Route>

        {/* Розділ із власною вкладеною оболонкою та Outlet */}
        <Route path="requests" element={<RequestsLayout />}>
          <Route
            index
            element={<RequestsPage items={services} />}
          />
          <Route path="new" element={<RequestCreatePage items={services} />} />
          <Route path=":requestId" element={<RequestDetailsPage items={services} />} />
          <Route
            path=":requestId/edit"
            element={<RequestEditPage items={services} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
