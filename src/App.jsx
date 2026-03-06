import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ProjectPage from './components/ProjectPage'
import { homeContent, projects } from './data/portfolioData'

function HomePage({ lang, setLang }) {
  const text = homeContent[lang]

  return (
    <div className="wrap">
      <Header lang={lang} setLang={setLang} text={text} />
      <main className="grid">
        <section className="welcome" aria-labelledby="welcome-title">
          <h1 id="welcome-title" className="title">{text.title}<span style={{ color: 'var(--muted)' }}>.</span></h1>
          <p className="lead">{text.lead}</p>
        </section>
        <About title={text.aboutTitle} items={text.about} />
        <Skills lang={lang} title={text.skillsTitle} />
        <Projects projects={projects} lang={lang} title={text.projectsTitle} />
        <Contact title={text.contactTitle} text={text.contactText} />
      </main>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('pl')
  const context = useMemo(() => ({ lang, setLang }), [lang])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage lang={context.lang} setLang={context.setLang} />} />
        <Route path="/projects/:slug" element={<ProjectPage lang={context.lang} setLang={context.setLang} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
