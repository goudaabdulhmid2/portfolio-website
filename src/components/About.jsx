import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
  max: 5,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
};

const keywords = [
  "Backend-focused", "full-stack", "ICPC community leader", "Honors",
  "Computer and Control Systems Engineering", "ITI's", "REST APIs",
  "Node.js", "Django", "Laravel"
];

const InteractiveText = ({ text }) => {
  let parts = [text];
  keywords.forEach(keyword => {
    const newParts = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const splitRegex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const splitText = part.split(splitRegex);
        splitText.forEach((s, idx) => {
          if (s.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(
              <motion.span
                key={keyword + idx}
                whileHover={{ scale: 1.05, color: '#8b5cf6', textShadow: '0px 0px 12px rgba(139, 92, 246, 0.6)' }}
                style={{ display: 'inline-block', fontWeight: '600', color: 'var(--accent-color)', cursor: 'default', transition: 'color 0.2s' }}
              >
                {s}
              </motion.span>
            );
          } else if (s) {
            newParts.push(s);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return <>{parts}</>;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ margin: 0, width: 'auto' }}>About Me</h2>
          <div style={{ height: '1px', flexGrow: 1, background: 'linear-gradient(90deg, var(--border-color) 0%, transparent 100%)' }}></div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              aspectRatio: '1/1',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <img
                src="/Activities/photo profile me.jpg"
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(139, 92, 246, 0.2), transparent)', pointerEvents: 'none' }}></div>
            </div>
          </motion.div>

          {/* About Text Card */}
          <div style={{ flex: '1 1 400px' }}>
            <Tilt options={defaultTiltOptions}>
              <div className="about-container-relative">
                <div className="about-creative-card" style={{ padding: '2.5rem' }}>
                  <div className="about-glow"></div>
                  <div className="about-content">
                    <svg className="about-quote-icon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="40" width="40" xmlns="http://www.w3.org/2000/svg" style={{ color: '#8b5cf6', marginBottom: '1.5rem', opacity: 0.8, filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' }}>
                      <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                    </svg>
                    <p className="about-text" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)', position: 'relative', zIndex: 2 }}>
                      <InteractiveText text={summary} />
                    </p>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;
