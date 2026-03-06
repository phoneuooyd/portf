import { skillGroups } from '../data/portfolioData'

function BadgeSection({ title, items }) {
  return (
    <>
      <h3 className="group-title">{title}</h3>
      <div className="skills-grid">
        {items.map((item) => <span className="skill-badge" key={item}>{item}</span>)}
      </div>
    </>
  )
}

function Skills({ lang, title }) {
  return (
    <section className="panel skills" aria-labelledby="skills-title">
      <h2 id="skills-title" className="accent">{title}</h2>
      <BadgeSection title={lang === 'pl' ? 'Technologie' : 'Technologies'} items={skillGroups.tech} />
      <BadgeSection title={lang === 'pl' ? 'Narzędzia' : 'Tools'} items={skillGroups.tools} />
      <BadgeSection title={lang === 'pl' ? 'Kompetencje' : 'Competencies'} items={skillGroups.soft} />
    </section>
  )
}

export default Skills
