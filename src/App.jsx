import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
