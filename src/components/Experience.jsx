import React from 'react';
import { motion } from 'framer-motion';
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

const Experience = ({ experience, education }) => {
  return (
    <section id="experience" className="container section-padding">
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

          {experience.map((job, idx) => (
            <motion.div key={`exp-${idx}`} variants={itemVars} className="timeline-creative-item">
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
          ))}

          {education.map((edu, idx) => (
            <motion.div key={`edu-${idx}`} variants={itemVars} className="timeline-creative-item">
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
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
