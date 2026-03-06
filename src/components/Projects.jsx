import { Link } from 'react-router-dom'

function Projects({ projects, lang, title }) {
  return (
    <section className="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="accent">{title}</h2>
      <ul className="proj-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/projects/${project.slug}`}>
              <img className="proj-icon" src={project.icon} alt="" />
              <span className="underline">{project.title[lang]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
