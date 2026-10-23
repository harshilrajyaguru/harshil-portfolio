import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap } from 'lucide-react';
import { portfolioData, Experience } from '../../data/portfolioData';
import { Badge } from '../common/Badge';

export const ExperienceSection: React.FC = () => {
  const { experiences, personal } = portfolioData;

  return (
    <section id="experience" style={{ padding: '3.5rem 0' }}>
      <div className="content-container">
        {/* Section Divider */}
        <div className="section-divider">
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }} className="exp-grid">
          {/* Left Column: Work & Teaching Assistant Experience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {experiences.map((exp: Experience) => (
              <div
                key={exp.id}
                className="exp-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2.5px solid var(--border-dark)',
                  borderRadius: '20px',
                  boxShadow: '5px 5px 0px var(--border-dark)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={20} color="var(--text-main)" strokeWidth={2.5} />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: 0 }}>
                        {exp.role}
                      </h3>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      {exp.organization}
                    </div>
                  </div>

                  <Badge variant={exp.type === 'Industry' ? 'yellow' : 'lilac'}>
                    {exp.type}
                  </Badge>
                </div>

                {/* Sub-meta: Date and Location */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                {/* Bullet Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {exp.bulletPoints.map((point, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <p style={{ margin: 0, fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: '#F3F4F6',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '6px',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Education & Institutional Standing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div
              className="exp-card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '2.5px solid var(--border-dark)',
                borderRadius: '20px',
                boxShadow: '5px 5px 0px var(--border-dark)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
                  <GraduationCap size={24} strokeWidth={2.5} color="var(--text-main)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: 0 }}>
                    Education
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    LNMIIT, Jaipur, Rajasthan
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: '2px solid #F3F4F6',
                  paddingTop: '0.85rem'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {personal.college}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#4B5563', marginTop: '0.25rem' }}>
                  {personal.degree}
                </div>
              </div>

              {/* Core Coursework Highlights */}
              <div
                style={{
                  backgroundColor: '#F9FAFB',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '12px',
                  padding: '1rem'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                  RELEVANT COMPUTER SCIENCE COURSEWORK
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {[
                    'Distributed Systems',
                    'Operating Systems',
                    'Database Management Systems',
                    'Data Structures & Algorithms',
                    'Object-Oriented Programming',
                    'Computer Networks',
                    'Artificial Intelligence',
                    'System Design'
                  ].map((course) => (
                    <span
                      key={course}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          #experience {
            padding: 2.5rem 0 !important;
          }
          .exp-card {
            padding: 1.25rem 1rem !important;
            border-radius: 16px !important;
          }
          .exp-card h3 {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
