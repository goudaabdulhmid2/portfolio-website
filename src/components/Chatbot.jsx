import React, { memo, useState, useRef, useEffect } from 'react';

function Chatbot({ data }) {
  const findAnswer = (q) => {
    if (!data) return "I don't have access to the data right now.";
    const lower = q.toLowerCase();
    
    if (lower.includes('skill')) {
      const skillsList = Object.keys(data.skills).join(', ');
      return `AbdulHamid's skills include: ${skillsList}.`;
    }
    if (lower.includes('exp') || lower.includes('work')) {
      const exps = data.experience.map(e => `${e.title} at ${e.company}`).join(', and ');
      return `He has worked as: ${exps}.`;
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('hire')) {
      return `You can reach him at ${data.personalInfo.email} or call ${data.personalInfo.phone}.`;
    }
    if (lower.includes('project')) {
      const projs = data.projects.map(p => p.title).join(', ');
      return `He built several projects such as: ${projs}.`;
    }
    if (lower.includes('about') || lower.includes('who') || lower.includes('summary')) {
      return data.summary;
    }
    if (lower.includes('edu') || lower.includes('university') || lower.includes('degree') || lower.includes('study')) {
      return `He studied ${data.education[0].degree} at ${data.education[0].institution} (${data.education[0].duration}).`;
    }
    if (lower.includes('activit')) {
      return `He was a ${data.activities[0].title} at ${data.activities[0].organization}.`;
    }
    if (lower.includes('competitive') || lower.includes('problem solving') || lower.includes('icpc') || lower.includes('codeforces')) {
      return data.competitiveProgramming.join(' ');
    }
    return "I'm a simple CV assistant. You can ask me about his skills, experience, projects, education, competitive programming, or contact info!";
  };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! Ask me anything about AbdulHamid's skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      const answer = findAnswer(q);
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    }, 300);
  };

  const handleSend = () => send(input);

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 50, width: '360px', maxWidth: 'calc(100vw - 3rem)',
          background: 'var(--bg-secondary)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>CV Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '380px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '0.75rem 1rem', fontSize: '0.85rem', lineHeight: '1.4',
                  backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--card-bg-hover)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {['Skills?', 'Experience?', 'Contact?'].map((q) => (
                  <button key={q} onClick={() => send(q)}
                    style={{
                      fontSize: '0.75rem', background: 'transparent', color: 'var(--accent)',
                      border: '1px solid var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '16px', cursor: 'pointer'
                    }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <input ref={inputRef} type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my CV..."
              style={{
                flex: 1, padding: '0.5rem 1rem', fontSize: '0.85rem', border: '1px solid var(--border-color)',
                borderRadius: '12px', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none'
              }} />
            <button onClick={handleSend} disabled={!input.trim()}
              style={{
                padding: '0.5rem 1rem', background: 'var(--accent)', color: '#fff', borderRadius: '12px',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed', opacity: input.trim() ? 1 : 0.5
              }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50, width: '48px', height: '48px',
          borderRadius: '12px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
        {open ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        )}
      </button>
    </>
  );
}

export default memo(Chatbot);
