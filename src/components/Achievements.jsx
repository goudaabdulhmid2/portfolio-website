import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Achievements = ({ competitiveProgramming, competitiveProfiles }) => {
  return (
    <section id="achievements" className="container section-padding" style={{ paddingTop: '0' }}>
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVars} className="section-title">Competitive Programming</motion.h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          
          <motion.div variants={itemVars} style={{ flex: '1 1 400px' }}>
            <div className="skills-grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {competitiveProgramming.map((achievement, idx) => (
                <div key={`cp-${idx}`} className="skill-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'var(--card-bg)' }}>
                  <div style={{ flexShrink: 0, width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                    <FaTrophy size={24} color="#fbbf24" />
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
                    {achievement}
                  </p>
                </div>
              ))}
            </div>

            {/* Profile Links */}
            {competitiveProfiles && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                {competitiveProfiles.map((profile, idx) => (
                  <a 
                    key={idx} 
                    href={profile.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="skill-card"
                    style={{
                      display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.25rem',
                      background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                      borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem',
                      fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {profile.name}
                    <svg style={{ marginLeft: '0.5rem' }} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVars} style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '450px', 
              aspectRatio: '4/3', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              border: '1px solid var(--border-color)', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
            }}>
              <img 
                src="/Activities/ICPC Photo for me.jpg" 
                alt="Competitive Programming" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }}></div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
