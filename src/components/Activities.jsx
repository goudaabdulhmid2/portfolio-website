import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { FaUsers } from 'react-icons/fa';

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

const activityLogos = {
  "ICPC Mansoura Community": "/Activities/ICPC Mansoura Logo.jpg",
  "CAT Reloaded": "/Activities/cat reloaded logo.jpg"
};

const Activities = ({ activities }) => {
  return (
    <section id="activities" className="container section-padding">
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVars} className="section-title">Leadership & Activities</motion.h2>
        
        <div className="timeline-creative">
          <div className="timeline-beam"></div>

          {activities.map((activity, idx) => {
            const logo = activityLogos[activity.organization];
            return (
              <motion.div key={`act-${idx}`} variants={itemVars} className="timeline-creative-item">
                <div className="timeline-icon-node experience-node" style={{ 
                  borderColor: '#8b5cf6', 
                  color: '#8b5cf6', 
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
                  padding: logo ? '2px' : '0',
                  background: logo ? '#fff' : 'var(--bg-secondary)',
                  overflow: 'hidden'
                }}>
                  {logo ? (
                    <img src={logo} alt={activity.organization} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                  ) : (
                    <FaUsers />
                  )}
                </div>
                <Tilt options={defaultTiltOptions} className="timeline-card-wrapper">
                  <div className="timeline-glass-card">
                    <span className="timeline-date">{activity.date}</span>
                    <h3 className="timeline-title">{activity.title}</h3>
                    <div className="timeline-org" style={{ marginBottom: '1rem' }}>
                      {activity.organization}
                    </div>
                    <p className="timeline-desc" style={{ lineHeight: '1.6' }}>
                      {activity.description}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Activities;
