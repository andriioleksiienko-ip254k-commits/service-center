import AppLayout from './components/layout/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import RequestPage from './pages/RequestPage.jsx'
import { services } from './data/services.js'

const navigationLinks = [
  { href: '#about', label: 'Про сервіс' },
  { href: '#catalog', label: 'Каталог послуг' },
  { href: '#request', label: 'Підготовка заявки' },
]

export default function App() {

  const exampleItem = services.find((item) => item.id === 'srv-001')

  return (
    <AppLayout title="FixIT Service" links={navigationLinks}>
      <HomePage />
      <RequestPage item={exampleItem} />
    </AppLayout>
  )
}
