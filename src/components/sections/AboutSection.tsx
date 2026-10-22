import React from 'react';
import { FileText, Building2 } from 'lucide-react';
import { TriadDiagram } from '../illustrations/TriadDiagram';
import { NeoButton } from '../common/NeoButton';
import { Badge } from '../common/Badge';
import { portfolioData } from '../../data/portfolioData';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" style={{ padding: '3rem 0 4rem 0' }}>
      <div className="content-container">
        {/* Section Divider (Matching reference: — About Me —) */}
        <div className="section-divider">
          <h2 className="section-title">About Me</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.95fr 1.05fr',
            alignItems: 'center',
            gap: '3rem'
          }}
          className="about-grid"
        >
          {/* Left Column: Triad Graphic */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TriadDiagram />
          </div>

          {/* Right Column: Bio, Education & Resume Trigger with Signature */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Engineering Philosophy Focus Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Badge variant="green">Distributed Systems</Badge>
              <Badge variant="yellow">Concurrency & OCC</Badge>
              <Badge variant="lilac">Agentic AI & Safety</Badge>
            </div>

            {/* Concise Bio */}
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-main)',
                margin: 0,
                fontWeight: 500
              }}
            >
              {personal.bio}
            </p>

            {/* College Card (Simplified) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--border-dark)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                boxShadow: '3px 3px 0px var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-lilac)',
                  border: '2px solid var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Building2 size={22} color="var(--text-main)" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  The LNM Institute of Information Technology (LNMIIT)
                </div>
              </div>
            </div>

            {/* Resume Button + Handwritten Signature (Matching reference layout) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                marginTop: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <NeoButton
                variant="primary"
                size="md"
                href={personal.resumeUrl}
                download={personal.resumeFilename}
                icon={<FileText size={18} strokeWidth={2.5} />}
                title="Download Harshil's Resume"
              >
                My Resume
              </NeoButton>

              {/* Hand-drawn Signature matching reference's "Halim Yusuf" */}
              <div
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  letterSpacing: '0.02em',
                  transform: 'rotate(-4deg)',
                  userSelect: 'none'
                }}
              >
                Harshil Rajyaguru
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
