import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVars = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
};

const defaultTiltOptions = {
  max: 5,
  perspective: 1500,
  scale: 1.01,
  speed: 800,
  transition: true,
};

const getBgImageForExperience = (job) => {
  if (job.title.toLowerCase().includes("instructor")) return `${import.meta.env.BASE_URL}Activities/part-time-insteractor.jpg`;
  return null;
};

const getBgImageForEducation = (edu) => {
  if (edu.institution.includes("ITI")) return `${import.meta.env.BASE_URL}Activities/iti-photo.jpg`;
  if (edu.institution.includes("Mansoura University")) return `${import.meta.env.BASE_URL}Activities/gradPhoto.jpg`;
  return null;
};

const Experience = ({ experience, education }) => {
  const [bgImage, setBgImage] = useState(null);

  return (
    <section id="experience" style={{ position: 'relative' }}>
      
      {/* Sticky Background Container */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, var(--bg-color) 0%, transparent 20%, transparent 80%, var(--bg-color) 100%), linear-gradient(to right, var(--bg-color) 0%, transparent 30%, transparent 70%, var(--bg-color) 100%)'
          }} />
          <AnimatePresence>
            {bgImage && (
              <motion.div
                key={bgImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url("${bgImage}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={itemVars} className="section-title">Experience & Education</motion.h2>
          
          <div className="timeline-creative">
            {/* Animated beam line */}
            <div className="timeline-beam"></div>

            {experience.map((job, idx) => {
              const img = getBgImageForExperience(job);
              return (
                <motion.div 
                  key={`exp-${idx}`} 
                  variants={itemVars} 
                  className="timeline-creative-item"
                  onMouseEnter={() => { if(img) setBgImage(img); }}
                  onMouseLeave={() => setBgImage(null)}
                  onTouchStart={() => { if(img) setBgImage(img); }}
                >
                  <div className="timeline-icon-node experience-node">
                    <FaBriefcase />
                  </div>
                  <Tilt options={defaultTiltOptions} className="timeline-card-wrapper">
                    <div className="timeline-glass-card">
                      <span className="timeline-date">{job.date}</span>
                      <h3 className="timeline-title">{job.title}</h3>
                      <div className="timeline-org">{job.company} — {job.location}</div>
                      <ul className="timeline-desc">
                        {job.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}

            {education.map((edu, idx) => {
              const img = getBgImageForEducation(edu);
              return (
                <motion.div 
                  key={`edu-${idx}`} 
                  variants={itemVars} 
                  className="timeline-creative-item"
                  onMouseEnter={() => { if(img) setBgImage(img); }}
                  onMouseLeave={() => setBgImage(null)}
                  onTouchStart={() => { if(img) setBgImage(img); }}
                >
                  <div className="timeline-icon-node education-node">
                    <FaGraduationCap />
                  </div>
                  <Tilt options={defaultTiltOptions} className="timeline-card-wrapper">
                    <div className="timeline-glass-card">
                      <span className="timeline-date">{edu.date}</span>
                      <h3 className="timeline-title">{edu.degree}</h3>
                      <div className="timeline-org">{edu.institution}</div>
                      <ul className="timeline-desc">
                        {edu.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
