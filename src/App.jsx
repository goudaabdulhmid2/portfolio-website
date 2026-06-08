import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

import About from './components/About';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/portfolio-data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Loading portfolio...
      </div>
    );
  }

  if (!data) return <div>Failed to load data.</div>;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <nav className="navbar">
          <div className="nav-content">
            <div className="logo">{data.personalInfo.name.split(' ')[0]}.</div>
            <div className="nav-links">
              <a href="#about-details" className="nav-link">About</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#projects" className="nav-link">Projects</a>
            </div>
          </div>
        </nav>

        <main>
          <Hero personalInfo={data.personalInfo} />
          <About summary={data.summary} />
          <Skills skills={data.skills} />
          <Experience experience={data.experience} education={data.education} />
          <Projects projects={data.projects} />
        </main>
        
        <Contact personalInfo={data.personalInfo} />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
