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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

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
            minWidth: '44px',
            minHeight: '44px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          className="mobile-hamburger-btn"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 24, 38, 0.4)',
            backdropFilter: 'blur(3px)',
            zIndex: 998
          }}
          className="mobile-drawer-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            maxHeight: 'calc(100vh - 75px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: 'var(--bg-canvas)',
            borderBottom: '3px solid var(--border-dark)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
            padding: '1.25rem 1.25rem 2rem 1.25rem',
            zIndex: 999
          }}
          className="mobile-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '440px', margin: '0 auto' }}>
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
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  padding: '0.65rem 1rem',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '12px',
                  border: '2px solid var(--border-dark)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '3px 3px 0px var(--border-dark)',
                  transition: 'var(--transition-tactile)'
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <NeoButton
                  variant="lilac"
                  size="md"
                  style={{ width: '100%', minHeight: '44px' }}
                  href={portfolioData.personal.resumeUrl}
                  download={portfolioData.personal.resumeFilename}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume
                </NeoButton>
              </div>
              <div style={{ flex: 1 }}>
                <NeoButton
                  variant="primary"
                  size="md"
                  style={{ width: '100%', minHeight: '44px' }}
                  href={portfolioData.personal.contactUrl}
                  external={true}
                  icon={<Mail size={16} />}
                >
                  Say Hello
                </NeoButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media query styling for navbar */}
      <style>{`
        .desktop-nav {
          gap: clamp(1rem, 1.8vw, 1.75rem) !important;
        }
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          header a[href="#home"] {
            font-size: 1.25rem !important;
            gap: 0.5rem !important;
          }
        }
        @media (max-width: 360px) {
          header a[href="#home"] {
            font-size: 1.15rem !important;
          }
        }
      `}</style>
    </header>
  );
};
