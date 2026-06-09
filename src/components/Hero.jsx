import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

import { useTextScramble } from '../hooks/useTextScramble';

const HERO_IMAGES = [
  `${import.meta.env.BASE_URL}Activities/Icpc  Mansoura Team Cover.jpg`,
  `${import.meta.env.BASE_URL}Activities/iti-photo.jpg`
];

const Hero = ({ personalInfo }) => {
  const scrambledName = useTextScramble(personalInfo.name, { delay: 200, duration: 1200 });
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero container" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100vw', height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <AnimatePresence>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, var(--bg-color) 20%, transparent 80%), url("${HERO_IMAGES[bgIndex]}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </AnimatePresence>
      </div>
      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
            Hi, my name is
          </p>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {scrambledName}.
          </h1>
          <div style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <Typewriter
              options={{
                strings: [
                  'I build scalable backend systems.',
                  'I am a Full-Stack Developer.',
                  'Former ICPC Community Leader.',
                  'I write clean, efficient code.'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
                delay: 60
              }}
            />
          </div>

          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: 'var(--accent)', color: '#fff', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '600' }}>
              View Work
            </a>
            <a href={`${import.meta.env.BASE_URL}cv.pdf`} download="AbdulHamid_Gouda_CV.pdf" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download CV
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
