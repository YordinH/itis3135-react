import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <main>
        <h2>Hello. Welcome to my homepage for ITIS 3135</h2>
        <h3>Tagline</h3>
      </main>
      <Footer/>
    </>
  )
}

export default App
