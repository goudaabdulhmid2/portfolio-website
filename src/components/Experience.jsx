import React from 'react';
import { motion } from 'framer-motion';

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVars = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
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
        
        <div className="timeline">
          {experience.map((job, idx) => (
            <motion.div key={`exp-${idx}`} variants={itemVars} className="timeline-item">
              <span className="timeline-date">{job.date}</span>
              <h3 className="timeline-title">{job.title}</h3>
              <div className="timeline-org">{job.company} — {job.location}</div>
              <ul className="timeline-desc">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          ))}

          {education.map((edu, idx) => (
            <motion.div key={`edu-${idx}`} variants={itemVars} className="timeline-item">
              <span className="timeline-date">{edu.date}</span>
              <h3 className="timeline-title">{edu.degree}</h3>
              <div className="timeline-org">{edu.institution}</div>
              <ul className="timeline-desc">
                {edu.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
