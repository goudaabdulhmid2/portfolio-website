import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const PER_PAGE = 6;

const defaultTiltOptions = {
  max: 8,
  perspective: 1200,
  scale: 1.02,
  speed: 1000,
  transition: true,
};

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

function ProjectCard({ proj, onClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div variants={itemVars} style={{ height: '100%' }}>
      <Tilt options={defaultTiltOptions} style={{ height: '100%' }}>
        <div 
          ref={cardRef}
          onClick={() => onClick(proj)} 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="card-hover"
          style={{
            position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
            background: 'var(--card-bg)', borderRadius: '1rem', border: '1px solid var(--border-color)',
            overflow: 'hidden', cursor: 'pointer'
          }}
        >
          {/* Spotlight Glow Effect */}
          <div 
            style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              background: isHovered 
                ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 40%)` 
                : 'transparent',
              transition: 'background 0.3s ease'
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {proj.image ? (
              <div className="project-img-wrapper" style={{ position: 'relative' }}>
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--card-bg), transparent)', opacity: 0.8 }} />
              </div>
            ) : (
              <div style={{ height: '180px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '500' }}>Preview</span>
              </div>
            )}
            
            <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {proj.techStack.slice(0, 3).map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', padding: '0.125rem 0.5rem',
                    background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)', 
                    borderRadius: '0.375rem', fontSize: '0.65rem', fontWeight: '600'
                  }}>
                    {t}
                  </span>
                ))}
                {proj.techStack.length > 3 && (
                  <span style={{ padding: '0.125rem 0.5rem', color: 'var(--text-secondary)', borderRadius: '0.375rem', fontSize: '0.65rem', fontWeight: '600' }}>
                    +{proj.techStack.length - 3}
                  </span>
                )}
              </div>
              
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {proj.title}
              </h3>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', flexGrow: 1, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {proj.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                {proj.github && (
                  <span style={{
                      fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem'
                    }}
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    Source Code &rarr;
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

function ProjectModal({ proj, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div 
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
      }} 
      onClick={onClose}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'relative', width: '100%', maxWidth: '42rem', maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--bg-color)', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(139, 92, 246, 0.2)',
          border: '1px solid var(--border-color)', zIndex: 101
        }} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10, width: '2.5rem', height: '2.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
            background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', 
            cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {proj.image && (
          <div style={{ width: '100%', background: 'var(--bg-secondary)', position: 'relative' }}>
            <img 
              src={proj.image} 
              alt={proj.title}
              style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), transparent 50%)' }} />
          </div>
        )}

        <div style={{ padding: 'clamp(1.25rem, 5vw, 2rem)' }}>
          <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {proj.title}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {proj.techStack.map(t => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.35rem 0.75rem',
                background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)', border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600'
              }}>
                {t}
              </span>
            ))}
          </div>

          <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
            {proj.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem', fontWeight: '600', color: '#fff', background: 'var(--accent)',
                  borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Projects({ projects }) {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  const visible = projects.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" style={{ padding: '4rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Showcase
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem', margin: '0.5rem auto 0 auto', fontSize: '2.5rem' }}>Featured Projects</h2>
        </div>

        <motion.div 
          key={page}
          variants={containerVars}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}
        >
          {visible.map((proj, i) => (
            <ProjectCard key={proj.title + i} proj={proj} onClick={setSelected} />
          ))}
        </motion.div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '3.5rem' }}
          >
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              style={{
                padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '0.75rem', fontWeight: '600',
                border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'var(--card-bg)',
                cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.3 : 1, transition: 'all 0.2s'
              }}
              onMouseOver={e => { if(page !== 0) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; } }}
              onMouseOut={e => { if(page !== 0) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; } }}
            >
              &larr; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}
                style={{
                  width: '2.5rem', height: '2.5rem', fontSize: '0.9rem', borderRadius: '0.75rem', fontWeight: '700',
                  background: i === page ? 'var(--accent)' : 'var(--card-bg)',
                  color: i === page ? '#fff' : 'var(--text-secondary)',
                  border: i === page ? 'none' : '1px solid var(--border-color)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: i === page ? '0 4px 10px rgba(139, 92, 246, 0.3)' : 'none'
                }}
                onMouseOver={e => { if(i !== page) e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseOut={e => { if(i !== page) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
              style={{
                padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '0.75rem', fontWeight: '600',
                border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'var(--card-bg)',
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page === totalPages - 1 ? 0.3 : 1, transition: 'all 0.2s'
              }}
              onMouseOver={e => { if(page !== totalPages - 1) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; } }}
              onMouseOut={e => { if(page !== totalPages - 1) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; } }}
            >
              Next &rarr;
            </button>
          </motion.div>
        )}
      </div>

      {selected && <ProjectModal proj={selected} onClose={closeModal} />}
    </section>
  );
}

export default memo(Projects);
