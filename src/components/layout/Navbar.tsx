import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Sparkles } from 'lucide-react';
import { NeoButton } from '../common/NeoButton';
import { portfolioData } from '../../data/portfolioData';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Principles', href: '#principles' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#principles') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('reset-principles-carousel'));
      const el = document.getElementById('principles');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(206, 235, 217, 0.94)' : 'var(--bg-canvas)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '2.5px solid var(--border-dark)' : '2.5px solid transparent',
        transition: 'all 0.2s ease',
        padding: '0.85rem 0'
      }}
    >
      <div className="content-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo: [portrait] HARSHIL */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: '0.04em'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--border-dark)',
              boxShadow: '2px 2px 0px var(--border-dark)',
              backgroundColor: 'var(--bg-canvas)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/images/harshil-portrait.png"
              alt="Harshil Rajyaguru"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <span>HARSHIL</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-yellow)',
              border: '1.5px solid var(--border-dark)',
              display: 'inline-block',
              marginLeft: '0.1rem'
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--text-main)',
                transition: 'var(--transition-tactile)',
                position: 'relative',
                padding: '0.25rem 0.2rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textDecorationThickness = '2px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Resume Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-actions">
          <NeoButton
            variant="lilac"
            size="sm"
            href={portfolioData.personal.resumeUrl}
            download={portfolioData.personal.resumeFilename}
            icon={<Sparkles size={14} />}
            title="Download Harshil's Resume PDF"
          >
            Resume
          </NeoButton>
          <NeoButton
            variant="primary"
            size="sm"
            href={portfolioData.personal.contactUrl}
            external={true}
            icon={<Mail size={15} />}
          >
            Say Hello
          </NeoButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            backgroundColor: '#FFB800',
            border: '2px solid var(--border-dark)',
            borderRadius: '10px',
            boxShadow: '2px 2px 0px var(--border-dark)',
            padding: '0.45rem',
            cursor: 'pointer'
          }}
          className="mobile-hamburger-btn"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-canvas)',
            borderBottom: '3px solid var(--border-dark)',
            boxShadow: '0 8px 0 rgba(0,0,0,0.1)',
            padding: '1.5rem',
            zIndex: 999
          }}
          className="mobile-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavLinkClick(e, link.href);
                }}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid var(--border-dark)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '3px 3px 0px var(--border-dark)'
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <NeoButton
                variant="lilac"
                size="md"
                className="w-full"
                href={portfolioData.personal.resumeUrl}
                download={portfolioData.personal.resumeFilename}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </NeoButton>
              <NeoButton
                variant="primary"
                size="md"
                className="w-full"
                href={portfolioData.personal.contactUrl}
                external={true}
                icon={<Mail size={16} />}
              >
                Say Hello
              </NeoButton>
            </div>
          </div>
        </div>
      )}

      {/* Media query styling for navbar */}
      <style>{`
        @media (max-width: 820px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
