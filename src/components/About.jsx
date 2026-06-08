import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
  max: 5,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
};

const About = ({ summary }) => {
  return (
    <section id="about-details" className="container section-padding" style={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ margin: 0, width: 'auto' }}>About Me</h2>
          <div style={{ height: '1px', flexGrow: 1, background: 'linear-gradient(90deg, var(--border-color) 0%, transparent 100%)' }}></div>
        </div>

        <Tilt options={defaultTiltOptions}>
          <div className="about-creative-card">
            <div className="about-glow"></div>
            <div className="about-content">
              <svg className="about-quote-icon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="40" width="40" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--border-hover)', marginBottom: '1.5rem', opacity: 0.5 }}>
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
              <p className="about-text" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-primary)', position: 'relative', zIndex: 2 }}>
                {summary}
              </p>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
};

export default About;
