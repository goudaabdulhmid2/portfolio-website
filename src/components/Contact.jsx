import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ personalInfo }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('submitting');
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Get In Touch</h2>
          
          <form 
            className="contact-form"
            action="https://formspree.io/f/xpqerjly" 
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input type="text" name="Name" required placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" name="Email" required placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea name="Message" required rows="5" placeholder="Message" className="form-input"></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p style={{ color: '#10b981', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>Message sent successfully!</p>}
            {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>Oops! There was a problem submitting your form.</p>}
          </form>

          <div className="social-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Contact;
