import { profile } from '../data/portfolioData'

function Contact({ title, text }) {
  return (
    <section className="panel" aria-labelledby="contact-title">
      <h2 id="contact-title" className="accent">{title}</h2>
      <p className="muted">{text}</p>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </section>
  )
}

export default Contact
