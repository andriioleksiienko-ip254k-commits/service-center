import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <>
      <header className="site-header">
        <span>FixIT Service</span>
        <nav aria-label="Основна навігація">
          <a href="#about">Про сервіс</a>
          <a href="#catalog">Каталог послуг</a>
        </nav>
      </header>

      <main>
        <HomePage />
      </main>

      <footer>Навчальний проєкт. Демонстраційний каталог послуг.</footer>
    </>
  )
}