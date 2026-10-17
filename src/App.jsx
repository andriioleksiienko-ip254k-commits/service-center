import AppLayout from './components/layout/AppLayout.jsx'
import ServiceSelectionProvider from './providers/ServiceSelectionProvider.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import RequestContainer from './pages/RequestContainer.jsx'
import { services } from './data/services.js'

const navigationLinks = [
  { href: '#about', label: 'Про сервіс' },
  { href: '#catalog', label: 'Каталог послуг' },
  { href: '#request', label: 'Підготовка заявки' },
]

export default function App() {
  return (
    <AppLayout title="FixIT Service" links={navigationLinks}>
      <ServiceSelectionProvider items={services}>
        <CatalogContainer items={services} />
        <RequestContainer />
      </ServiceSelectionProvider>
    </AppLayout>
  )
}
