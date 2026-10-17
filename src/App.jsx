import { Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import ServiceDetailsPage from './pages/ServiceDetailsPage.jsx'
import RequestContainer from './pages/RequestContainer.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { services } from './data/services.js'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/services', label: 'Каталог послуг' },
  { to: '/requests/new', label: 'Підготовка заявки' },
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
        <Route path="services" element={<CatalogContainer items={services} />} />
        <Route
          path="services/:serviceId"
          element={<ServiceDetailsPage items={services} />}
        />
        {/* Тимчасово: сторінка з Л 2.1. У кроці 7 замінюється на RequestCreatePage */}
        <Route path="requests/new" element={<RequestContainer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
