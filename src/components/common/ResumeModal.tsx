import React from 'react';
import { X, FileText, CheckCircle2, Clock, Mail, GraduationCap, Briefcase, Award } from 'lucide-react';
import { NeoButton } from './NeoButton';
import { Badge } from './Badge';
import { portfolioData } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(18, 24, 38, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        className="resume-modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid #121826',
          borderRadius: '24px',
          boxShadow: '8px 8px 0px #121826',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '2.5px solid #121826',
            backgroundColor: '#FFB800',
            boxShadow: '2px 2px 0px #121826',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 800
          }}
          title="Close"
          aria-label="Close resume preview"
        >
          <X size={20} strokeWidth={3} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#DDD6FE',
              border: '2px solid #121826',
              boxShadow: '3px 3px 0px #121826',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileText size={24} color="#121826" strokeWidth={2.5} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: 0 }}>
              Harshil Rajyaguru
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Verified Resume Profile · LNMIIT Computer Science & Engineering
            </p>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div
          style={{
            backgroundColor: '#FEF3C7',
            border: '2px solid #121826',
            borderRadius: '14px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}
        >
          <Clock size={20} color="#D97706" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.875rem', lineHeight: 1.5, color: '#78350F' }}>
            <strong>Official PDF Download:</strong> Direct PDF download is enabled. All information shown here is directly synchronized with Harshil&apos;s verified credentials.
          </div>
        </div>

        {/* Resume Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Education */}
          <div
            style={{
              padding: '1rem',
              border: '2px solid #121826',
              borderRadius: '14px',
              backgroundColor: '#F9FAFB'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <GraduationCap size={18} strokeWidth={2.5} />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Education</h4>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>The LNM Institute of Information Technology (LNMIIT)</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>B.Tech in Computer Science and Engineering (2023 – Present) · Jaipur, Rajasthan</div>
          </div>

          {/* Experience Highlights */}
          <div
            style={{
              padding: '1rem',
              border: '2px solid #121826',
              borderRadius: '14px',
              backgroundColor: '#F9FAFB'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Briefcase size={18} strokeWidth={2.5} />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Experience & Roles</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700 }}>Software Developer Intern · Cerebulb</span>
                  <Badge variant="lilac">Jan 2026 – July 2026</Badge>
                </div>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>
                  Built 10+ reusable React.js components and integrated 20+ RESTful APIs for industrial solutions demo platform.
                </p>
              </div>
              <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700 }}>Teaching Assistant - Artificial Intelligence · LNMIIT</span>
                  <Badge variant="green">Aug 2026 – Present</Badge>
                </div>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>
                  Mentoring 80+ students on AI algorithms, resolving 100+ debugging/systems questions per semester.
                </p>
              </div>
            </div>
          </div>

          {/* Key Engineering Outcomes */}
          <div
            style={{
              padding: '1rem',
              border: '2px solid #121826',
              borderRadius: '14px',
              backgroundColor: '#F9FAFB'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Award size={18} strokeWidth={2.5} />
              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Core Engineering Milestones</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Vetanam Payment Ledger:</strong> 0 double-spends across 1,000+ k6 transfers, &lt;100ms p95 latency at 500 concurrent transfers.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Saarthi Multi-Agent System:</strong> 5-agent orchestrator with 3-layer Responsible AI guardrails across 76 validation tests.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>700+ DSA Problems</strong> solved across LeetCode & GeeksforGeeks; Deloitte Hacksplosion 2026 Pre-Finalist.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          className="resume-modal-footer"
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '2px solid #121826',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {/* Functional PDF download button */}
          <NeoButton
            variant="secondary"
            size="md"
            href={portfolioData.personal.resumeUrl}
            download={portfolioData.personal.resumeFilename}
            title="Download Harshil's Resume PDF"
            icon={<FileText size={16} />}
          >
            Download PDF Resume
          </NeoButton>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <NeoButton
              variant="primary"
              size="md"
              href={portfolioData.personal.contactUrl}
              external={true}
              icon={<Mail size={16} />}
            >
              Email Harshil
            </NeoButton>
            <NeoButton variant="ghost" size="md" onClick={onClose}>
              Close
            </NeoButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .resume-modal-overlay {
            padding: 0.75rem !important;
          }
          .resume-modal-card {
            padding: 1.25rem 1rem !important;
            border-radius: 18px !important;
            max-height: 94vh !important;
          }
          .resume-modal-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .resume-modal-footer > * {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};
