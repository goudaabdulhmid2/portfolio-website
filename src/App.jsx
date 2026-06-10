import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion, AnimatePresence } from 'framer-motion';

import About from './components/About';
import Activities from './components/Activities';
import Achievements from './components/Achievements';

import Navbar from './components/Navbar';
import SplashCursor from './components/SplashCursor';
import Chatbot from './components/Chatbot';
import TechMarquee from './components/TechMarquee';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);

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

    const savedCursor = localStorage.getItem('cursorEnabled');
    if (savedCursor !== null) {
      setCursorEnabled(savedCursor === 'true');
    }
  }, []);

  if (loading) return null;

  if (!data) return <div>Failed to load data.</div>;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {cursorEnabled && <SplashCursor />}
        <Navbar name={data.personalInfo.name} cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />

        <main>
          <Hero personalInfo={data.personalInfo} />
          <About summary={data.summary} />
          <TechMarquee />
          <Skills skills={data.skills} />
          <Experience experience={data.experience} education={data.education} />
          <Projects projects={data.projects} />
          <Achievements 
            competitiveProgramming={data.competitiveProgramming} 
            competitiveProfiles={data.competitiveProfiles} 
          />
          <Activities activities={data.activities} />
        </main>
        
        <Contact personalInfo={data.personalInfo} />
        <Chatbot data={data} />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
