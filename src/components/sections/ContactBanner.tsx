import React, { useState } from 'react';
import { Mail, Check, Copy, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NeoButton } from '../common/NeoButton';
import { portfolioData } from '../../data/portfolioData';

export const ContactBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.personal.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FFB800', '#FFFFFF', '#DDD6FE']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" style={{ padding: '3.5rem 0 2rem 0' }}>
      <div className="content-container">
        {/* Darker green contact CTA band (Matching reference directly) */}
        <div
          className="contact-card"
          style={{
            backgroundColor: 'var(--bg-green-cta)',
            border: '3px solid var(--border-dark)',
            borderRadius: '28px',
            boxShadow: '8px 8px 0px var(--border-dark)',
            padding: '3.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.75rem'
          }}
        >
          {/* Subtle background circuit/grid watermark */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none'
            }}
          />

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              maxWidth: '700px',
              margin: 0,
              position: 'relative',
              zIndex: 1
            }}
          >
            I&apos;m Available for <br />
            <span style={{ color: '#FCD34D' }}>Software Engineering</span> Roles
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '560px',
              lineHeight: 1.6,
              margin: 0,
              position: 'relative',
              zIndex: 1
            }}
          >
            Interested in backend infrastructure, distributed consensus, high-throughput payment ledgers, or AI engineering? Let&apos;s build together.
          </p>

          {/* Button and Curved Doodle Arrow Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            {/* Playful curved hand-drawn white doodle arrow (Matching reference) */}
            <div
              style={{
                position: 'absolute',
                left: '-90px',
                bottom: '10px',
                width: '75px',
                height: '75px',
                pointerEvents: 'none'
              }}
              className="doodle-arrow"
            >
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <path
                  d="M 15,85 Q 5,20 60,18"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 45,8 L 65,18 L 48,32"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* CTAs: Direct Mailto + Call Me + Copy Email */}
            <div className="contact-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
              <NeoButton
                variant="primary"
                size="lg"
                href={portfolioData.personal.contactUrl}
                external={true}
                icon={<Mail size={20} strokeWidth={2.5} />}
                className="contact-cta-btn"
                title="Send email via Gmail compose"
              >
                Contact Me
              </NeoButton>

              <NeoButton
                variant="lilac"
                size="lg"
                href={portfolioData.personal.phoneCallUrl}
                icon={<Phone size={20} strokeWidth={2.5} />}
                title={`Call Harshil at ${portfolioData.personal.phone}`}
                className="contact-cta-btn"
              >
                Call Me
              </NeoButton>

              <button
                onClick={handleCopyEmail}
                className="contact-copy-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)',
                  transition: 'var(--transition-tactile)',
                  minHeight: '44px'
                }}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={18} color="#A7F3D0" /> : <Copy size={18} />}
                <span>{copied ? 'Copied to Clipboard!' : email}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .doodle-arrow {
            display: none;
          }
        }
        @media (max-width: 600px) {
          #contact {
            padding: 2.25rem 0 1.5rem 0 !important;
          }
          .contact-card {
            padding: 2.25rem 1.25rem !important;
            border-radius: 20px !important;
            gap: 1.25rem !important;
          }
          .contact-actions {
            gap: 0.75rem !important;
            width: 100%;
          }
          .contact-copy-btn {
            max-width: 100%;
            font-size: 0.8rem !important;
            padding: 0.75rem 1rem !important;
            word-break: break-all;
          }
        }
        @media (max-width: 380px) {
          .contact-actions {
            flex-direction: column;
            width: 100%;
          }
          .contact-actions > * {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
