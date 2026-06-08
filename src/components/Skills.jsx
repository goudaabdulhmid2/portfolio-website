import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiPython, SiPhp, SiCplusplus, 
  SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiLaravel, SiGraphql,
  SiHtml5, SiCss, SiTailwindcss, SiBootstrap, SiVuedotjs, SiReact, SiNextdotjs, SiAngular,
  SiMongodb, SiMysql, SiRedis, SiPrisma,
  SiGit, SiGithub, SiPostman, SiDocker, SiLinux, SiGnubash,
  SiOpenai
} from 'react-icons/si';
import { FaJava, FaServer, FaDatabase, FaCode, FaBrain } from 'react-icons/fa';
import { MdApi, MdArchitecture } from 'react-icons/md';

const iconMap = {
  "JavaScript": <SiJavascript color="#F7DF1E" />,
  "TypeScript": <SiTypescript color="#3178C6" />,
  "Python": <SiPython color="#3776AB" />,
  "PHP": <SiPhp color="#777BB4" />,
  "C++": <SiCplusplus color="#00599C" />,
  "Java": <FaJava color="#007396" />,
  "Node.js": <SiNodedotjs color="#339933" />,
  "Express.js": <SiExpress color="#ffffff" />,
  "NestJS": <SiNestjs color="#E0234E" />,
  "Django": <SiDjango color="#092E20" />,
  "Laravel": <SiLaravel color="#FF2D20" />,
  "RESTful APIs": <MdApi color="#00B4D8" />,
  "GraphQL": <SiGraphql color="#E10098" />,
  "HTML": <SiHtml5 color="#E34F26" />,
  "CSS": <SiCss color="#1572B6" />,
  "Tailwind CSS": <SiTailwindcss color="#06B6D4" />,
  "Bootstrap": <SiBootstrap color="#7952B3" />,
  "Vue.js": <SiVuedotjs color="#4FC08D" />,
  "React": <SiReact color="#61DAFB" />,
  "Next.js": <SiNextdotjs color="#ffffff" />,
  "Angular": <SiAngular color="#DD0031" />,
  "MongoDB": <SiMongodb color="#47A248" />,
  "MySQL": <SiMysql color="#4479A1" />,
  "Redis": <SiRedis color="#DC382D" />,
  "Prisma": <SiPrisma color="#2D3748" />,
  "Mongoose": <FaDatabase color="#880000" />,
  "Eloquent": <FaDatabase color="#FF2D20" />,
  "Git": <SiGit color="#F05032" />,
  "GitHub": <SiGithub color="#ffffff" />,
  "Postman": <SiPostman color="#FF6C37" />,
  "Docker": <SiDocker color="#2496ED" />,
  "Linux": <SiLinux color="#FCC624" />,
  "Bash": <SiGnubash color="#4EAA25" />,
  "Data Structures and Algorithms": <FaCode color="#A9A9A9" />,
  "OOP": <MdArchitecture color="#A9A9A9" />,
  "Design Patterns": <MdArchitecture color="#A9A9A9" />,
  "Agile": <FaServer color="#A9A9A9" />,
  "Prompt Engineering": <FaBrain color="#FF9900" />,
  "RAG": <FaBrain color="#FF9900" />,
  "AI API Integration": <SiOpenai color="#412991" />
};

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="container section-padding">
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVars} className="section-title">Technical Expertise</motion.h2>
        
        <div className="skills-grid">
          {Object.entries(skills).map(([category, skillList], idx) => (
            <motion.div key={idx} variants={itemVars} className="skill-card">
              <h3 className="skill-category">{category}</h3>
              <div className="skill-list">
                {skillList.map(skill => (
                  <span key={skill} className="skill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    {iconMap[skill] && <span style={{ display: 'flex', alignItems: 'center' }}>{iconMap[skill]}</span>}
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
