import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
  max: 10,
  perspective: 1500,
  scale: 1.02,
  speed: 800,
  transition: true,
};

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
};

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="container section-padding">
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
      >
        <motion.h2 variants={itemVars} className="section-title">Featured Work</motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div key={idx} variants={itemVars}>
              <Tilt options={defaultTiltOptions} style={{ height: '100%' }}>
                <div className="project-card" style={{ height: '100%' }}>
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech">
                      {project.techStack.map(tech => (
                        <span key={tech} className="skill-tag" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>{tech}</span>
                      ))}
                    </div>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                    >
                      View Source
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
