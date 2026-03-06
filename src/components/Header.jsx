import { profile } from '../data/portfolioData'

function Header({ lang, setLang, text }) {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    alert(text.copied)
  }

  return (
    <div className="top-actions" aria-label="Szybkie akcje">
      <button type="button" className="icon-btn" onClick={copyEmail} title={text.copy}>✉</button>
      <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" title="GitHub">GH</a>
      <a className="icon-link" href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">in</a>
      <select id="langSwitcher" className="lang-switch" value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="pl">Polski</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}

export default Header
