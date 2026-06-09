import React, { memo, useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTIONS = [
  { id: 'about-details', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' }
];

const COLORS = [
  { id: 'violet', color: '#8b5cf6' },
  { id: 'blue', color: '#3b82f6' },
  { id: 'green', color: '#10b981' },
  { id: 'orange', color: '#f59e0b' },
  { id: 'pink', color: '#ec4899' },
  { id: 'red', color: '#ef4444' },
];

const FONTS = [
  { id: 'inter', name: 'Inter' },
  { id: 'jakarta', name: 'Jakarta Sans' },
  { id: 'poppins', name: 'Poppins' },
  { id: 'dm-sans', name: 'DM Sans' },
  { id: 'space', name: 'Space Grotesk' },
];

function Navbar({ name, cursorEnabled, setCursorEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [accent, setAccent] = useState('violet');
  const [font, setFont] = useState('inter');
  const active = useActiveSection(SECTIONS.map(s => s.id));

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefers) || !saved) {
      setIsDark(true);
      document.body.classList.add('dark');
    } else {
      setIsDark(false);
      document.body.classList.remove('dark');
    }
    const savedAccent = localStorage.getItem('accent') || 'violet';
    const savedFont = localStorage.getItem('font') || 'inter';
    setAccent(savedAccent);
    setFont(savedFont);
    document.documentElement.setAttribute('data-accent', savedAccent);
    document.documentElement.setAttribute('data-font', savedFont);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    setIsDark(p => {
      const next = !p;
      if (next) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const setAccentTheme = (id) => {
    setAccent(id);
    document.documentElement.setAttribute('data-accent', id);
    localStorage.setItem('accent', id);
  };

  const setFontTheme = (id) => {
    setFont(id);
    document.documentElement.setAttribute('data-font', id);
    localStorage.setItem('font', id);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar" style={{ background: scrolled ? 'var(--bg-secondary)' : 'transparent', boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none', borderBottom: scrolled ? '1px solid var(--border-color)' : 'none' }}>
        <div className="nav-content">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
            {name ? name.split(' ')[0] : 'Portfolio'}
            <span style={{ color: 'var(--accent)' }}>.</span>
          </button>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem', marginRight: '2rem' }}>
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.9rem', fontWeight: active === id ? '600' : '500',
                    color: active === id ? 'var(--accent)' : 'var(--text-secondary)',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={toggle}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              )}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem', marginLeft: '0.5rem', alignItems: 'center' }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0, background: 'var(--bg-color)',
          borderBottom: '1px solid var(--border-color)', zIndex: 99, padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '1rem',
                borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                fontSize: '1rem', fontWeight: active === id ? '600' : '500',
                color: active === id ? 'var(--accent)' : 'var(--text-primary)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Settings Button */}
      <button
        onClick={() => setPanelOpen(p => !p)}
        style={{
          position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 55,
          background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%',
          padding: '0.75rem', cursor: 'pointer', color: 'var(--text-secondary)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
        aria-label="Customize"
      >
        <svg width="24" height="24" style={{ transform: panelOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.5s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      </button>

      {/* Settings Panel */}
      {panelOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setPanelOpen(false)} />
          <div style={{
            position: 'absolute', top: 0, right: 0, height: '100%', width: '300px',
            background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)',
            padding: '2rem', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>Customize</h3>
              <button onClick={() => setPanelOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Accent Color</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {COLORS.map(c => (
                  <button key={c.id} onClick={() => setAccentTheme(c.id)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c.color,
                      border: accent === c.id ? '2px solid var(--text-primary)' : 'none',
                      transform: accent === c.id ? 'scale(1.1)' : 'scale(1)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Animations</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Magic Cursor Animation</span>
                <button 
                  onClick={() => {
                    const next = !cursorEnabled;
                    setCursorEnabled(next);
                    localStorage.setItem('cursorEnabled', next);
                  }}
                  style={{
                    width: '40px', height: '24px', borderRadius: '12px', background: cursorEnabled ? 'var(--accent)' : 'var(--bg-color)',
                    border: '1px solid var(--border-color)', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px',
                    left: cursorEnabled ? '18px' : '2px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Font Family</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {FONTS.map(f => (
                  <button key={f.id} onClick={() => setFontTheme(f.id)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px',
                      background: font === f.id ? 'var(--card-bg-hover)' : 'transparent',
                      color: font === f.id ? 'var(--accent)' : 'var(--text-secondary)',
                      border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: font === f.id ? '600' : '400'
                    }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);
