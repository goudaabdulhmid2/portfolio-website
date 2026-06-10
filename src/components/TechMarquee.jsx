import React, { memo } from 'react';
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

const techs = [
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiPython, name: 'Python' },
  { icon: SiPhp, name: 'PHP' },
  { icon: SiNodedotjs, name: 'Node.js' },
  // { icon: SiReact, name: 'React' },
  // { icon: SiNextdotjs, name: 'Next.js' },
  // { icon: SiVuedotjs, name: 'Vue.js' },
  { icon: SiDjango, name: 'Django' },
  { icon: SiLaravel, name: 'Laravel' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiMysql, name: 'MySQL' },
  { icon: SiDocker, name: 'Docker' }
];

function TechMarquee() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '2rem 0' }}>
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}
      >
        {[...techs, ...techs, ...techs].map(({ icon: Icon, name }, i) => (
          <div
            key={`${name}-${i}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)',
              borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: 'var(--text-secondary)'
            }}
          >
            <Icon size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: '500', whiteSpace: 'nowrap' }}>{name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default memo(TechMarquee);
