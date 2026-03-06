function About({ title, items }) {
  return (
    <section className="panel about" aria-labelledby="about-title">
      <h2 id="about-title" className="accent">{title}</h2>
      {items.map((item) => (
        <p key={item} style={{ margin: '0 0 8px', color: 'var(--muted)' }}>{item}</p>
      ))}
    </section>
  )
}

export default About
