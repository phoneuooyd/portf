import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { projects } from '../data/portfolioData'

function ProjectPage({ lang, setLang }) {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const [index, setIndex] = useState(0)

  if (!project) {
    return (
      <div className="container">
        <Link to="/">← Back</Link>
      </div>
    )
  }

  const hasGallery = project.gallery.length > 0
  const activeImage = hasGallery ? project.gallery[index] : null

  return (
    <div className="container">
      <header>
        <Link to="/">← {lang === 'pl' ? 'Powrót' : 'Back'}</Link>
        <select id="langSwitcher" className="lang-switch" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="pl">Polski</option>
          <option value="en">English</option>
        </select>
      </header>

      <h1>
        <img className="proj-icon" src={project.icon} alt="" />
        {project.title[lang]}
      </h1>

      {hasGallery && (
        <section className="panel panel--xl">
          <div className="carousel">
            <div className="carousel__viewport">
              <div className="carousel__slide">
                <img src={activeImage.src} alt={activeImage.caption[lang]} />
              </div>
            </div>
            <div className="carousel__thumbs">
              {project.gallery.map((image, imgIndex) => (
                <button
                  key={image.src}
                  type="button"
                  className={`carousel__thumb ${imgIndex === index ? 'is-active' : ''}`}
                  onClick={() => setIndex(imgIndex)}
                >
                  <img src={image.src} alt={image.caption[lang]} />
                </button>
              ))}
            </div>
            <p className="muted m-0">{activeImage.caption[lang]}</p>
          </div>
        </section>
      )}

      <section className="panel">
        <h2 className="accent">{lang === 'pl' ? 'Cel aplikacji' : 'Purpose'}</h2>
        <p>{project.purpose[lang]}</p>
      </section>

      <section className="columns">
        <div className="panel">
          <h2 className="accent">{lang === 'pl' ? 'Technologie' : 'Technologies'}</h2>
          <div className="skills-grid">
            {project.technologies.map((item) => (
              <span key={item} className="skill-badge">{item}</span>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2 className="accent">{lang === 'pl' ? 'Plan rozwoju' : 'Roadmap'}</h2>
          <ul className="roadmap">
            {project.roadmap[lang].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href={project.github} target="_blank" rel="noreferrer">GitHub →</a>
        </div>
      </section>
    </div>
  )
}

export default ProjectPage
