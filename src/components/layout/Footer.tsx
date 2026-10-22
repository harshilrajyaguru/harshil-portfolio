import { Code2, Mail, ArrowUp, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = portfolioData.personal.socials;

  return (
    <footer style={{ padding: '3rem 0 2rem 0' }}>
      <div className="content-container">
        {/* White brutalist footer card container (Matching reference) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2.5px solid var(--border-dark)',
            borderRadius: '24px',
            boxShadow: '6px 6px 0px var(--border-dark)',
            padding: '2.5rem 2rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}
          >
            {/* Brand & Direct Contact */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  marginBottom: '0.5rem'
                }}
              >
                <span>HARSHIL</span>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-yellow)',
                    border: '1.5px solid var(--border-dark)'
                  }}
                />
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Email: <a href={portfolioData.personal.contactUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none' }}>{portfolioData.personal.email}</a>
              </p>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Phone: <a href={portfolioData.personal.phoneCallUrl} style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none' }}>{portfolioData.personal.phone}</a>
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {portfolioData.personal.college} · {portfolioData.personal.degree}
              </p>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', alignItems: 'center' }}>
              <a href="#home" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>Home</a>
              <a href="#about" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>About</a>
              <a
                href="#principles"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('reset-principles-carousel'));
                  document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}
              >
                Principles
              </a>
              <a href="#projects" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>Projects</a>
              <a
                href={portfolioData.personal.resumeUrl}
                download={portfolioData.personal.resumeFilename}
                style={{
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Resume
              </a>
              <a href="#contact" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>Contact</a>
            </div>

            {/* Circular Social Buttons (Matching reference) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--border-dark)',
                    boxShadow: '3px 3px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-main)',
                    transition: 'var(--transition-tactile)'
                  }}
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={20} />
                </a>
              )}

              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#DDD6FE',
                    border: '2px solid var(--border-dark)',
                    boxShadow: '3px 3px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-main)',
                    transition: 'var(--transition-tactile)'
                  }}
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} />
                </a>
              )}

              {socials.leetcode && (
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#FFB800',
                    border: '2px solid var(--border-dark)',
                    boxShadow: '3px 3px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-main)',
                    transition: 'var(--transition-tactile)'
                  }}
                  title="LeetCode (700+ Solved)"
                  aria-label="LeetCode Profile"
                >
                  <Code2 size={20} strokeWidth={2.5} />
                </a>
              )}

              <a
                href={portfolioData.personal.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#A7F3D0',
                  border: '2px solid var(--border-dark)',
                  boxShadow: '3px 3px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'var(--transition-tactile)'
                }}
                title="Send Email via Gmail"
                aria-label="Send Email via Gmail"
              >
                <Mail size={20} strokeWidth={2.5} />
              </a>

              <a
                href={portfolioData.personal.phoneCallUrl}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FED7AA',
                  border: '2px solid var(--border-dark)',
                  boxShadow: '3px 3px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  transition: 'var(--transition-tactile)'
                }}
                title={`Call Harshil at ${portfolioData.personal.phone}`}
                aria-label={`Call Harshil at ${portfolioData.personal.phone}`}
              >
                <Phone size={20} strokeWidth={2.5} />
              </a>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-canvas)',
                  border: '2px solid var(--border-dark)',
                  boxShadow: '3px 3px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
                title="Back to Top"
                aria-label="Back to Top"
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Subtext divider & copyright */}
          <div
            style={{
              borderTop: '2px solid #E5E7EB',
              paddingTop: '1.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}
          >
            <div>
              © 2026 Harshil Rajyaguru.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)' }}>
              LNMIIT · B.Tech CSE · Distributed Systems
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
