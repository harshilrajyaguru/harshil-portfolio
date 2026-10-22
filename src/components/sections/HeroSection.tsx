import React from 'react';
import { Mail, ArrowDownRight, Code2, Mouse, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { NeoButton } from '../common/NeoButton';
import { HeroIllustration } from '../illustrations/HeroIllustration';
import { RoleTypewriter } from '../common/RoleTypewriter';
import { portfolioData } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  const { personal } = portfolioData;

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#DDD6FE', '#26734D', '#38BDF8']
    });
  };

  return (
    <section id="home" style={{ paddingTop: '3rem', paddingBottom: '3.5rem', position: 'relative' }}>
      <div className="content-container">
        {/* Two-Column Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            alignItems: 'center',
            gap: '2.5rem'
          }}
          className="hero-grid"
        >
          {/* Left Column: Greeting, Big Name, CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top Greeting: "HI ! , i'm" */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '0.04em'
              }}
            >
              {personal.shortGreeting}
            </div>

            {/* Giant Expressive Name */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              {personal.firstName} <br />
              <span
                style={{
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {personal.lastName}
                <svg
                  viewBox="0 0 260 20"
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '-6px',
                    width: '100%',
                    height: '14px',
                    pointerEvents: 'none'
                  }}
                >
                  <path
                    d="M 5 12 Q 130 2 255 12"
                    fill="none"
                    stroke="#FFB800"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Concise Engineering Tagline */}
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: '540px',
                margin: 0,
                fontWeight: 500
              }}
            >
              I build the systems <em>behind</em> the screen, <strong>experiment with ideas, and turn problems into products.</strong> Take a look around and explore what I&apos;ve been creating.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
              <NeoButton
                variant="primary"
                size="lg"
                href={personal.contactUrl}
                external={true}
                onClick={triggerConfetti}
                icon={<Mail size={18} strokeWidth={2.5} />}
              >
                Say Hello
              </NeoButton>

              <NeoButton
                variant="lilac"
                size="lg"
                href={personal.phoneCallUrl}
                icon={<Phone size={18} strokeWidth={2.5} />}
                title={`Call Harshil at ${personal.phone}`}
              >
                Call Me
              </NeoButton>

              <NeoButton
                variant="secondary"
                size="lg"
                href="#projects"
                icon={<ArrowDownRight size={18} strokeWidth={2.5} />}
              >
                My Work
              </NeoButton>
            </div>

            {/* Vertical Scroll Down Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginTop: '1.75rem',
                color: 'var(--text-muted)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid var(--border-dark)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '2px 2px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mouse size={16} strokeWidth={2.5} color="var(--text-main)" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}
              >
                SCROLL DOWN · EXPLORE ARCHITECTURES
              </span>
            </div>
          </div>

          {/* Right Column: Hero Illustration + Role Typewriter + Social Badge Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HeroIllustration />

            {/* Terminal-Style Animated Role Typewriter */}
            <RoleTypewriter />

            {/* Social Links Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.85rem' }}>
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2.5px solid var(--border-dark)',
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
                  <GithubIcon size={22} />
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#DDD6FE',
                    border: '2.5px solid var(--border-dark)',
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
                  <LinkedinIcon size={22} />
                </a>
              )}

              {personal.socials.leetcode && (
                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#FFB800',
                    border: '2.5px solid var(--border-dark)',
                    boxShadow: '3px 3px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-main)',
                    transition: 'var(--transition-tactile)'
                  }}
                  title="LeetCode Profile (700+ DSA)"
                  aria-label="LeetCode Profile"
                >
                  <Code2 size={22} strokeWidth={2.5} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid h1 {
            font-size: 2.8rem !important;
          }
          .hero-grid > div:first-child {
            align-items: center;
          }
          .hero-grid p {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};
