import React from 'react';
import { Trophy, Code2, Network } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const { achievements } = portfolioData;

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 size={24} color="#121826" strokeWidth={2.5} />;
      case 1:
        return <Trophy size={24} color="#121826" strokeWidth={2.5} />;
      case 2:
      default:
        return <Network size={24} color="#121826" strokeWidth={2.5} />;
    }
  };

  const getTileBg = (index: number) => {
    switch (index) {
      case 0:
        return 'var(--bg-yellow)';
      case 1:
        return 'var(--bg-lilac)';
      case 2:
      default:
        return '#A7F3D0';
    }
  };

  return (
    <section id="achievements" style={{ padding: '3rem 0' }}>
      <div className="content-container">
        {/* Section Divider */}
        <div className="section-divider">
          <h2 className="section-title">Key Milestones & Achievements</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {achievements.map((item, index) => (
            <div
              key={item.title}
              style={{
                backgroundColor: '#FFFFFF',
                border: '2.5px solid var(--border-dark)',
                borderRadius: '20px',
                boxShadow: '5px 5px 0px var(--border-dark)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'var(--transition-tactile)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '7px 7px 0px var(--border-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px var(--border-dark)';
              }}
            >
              {/* Icon badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: getTileBg(index),
                    border: '2px solid var(--border-dark)',
                    boxShadow: '3px 3px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getIcon(index)}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    backgroundColor: '#F3F4F6',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #D1D5DB'
                  }}
                >
                  {item.highlight}
                </span>
              </div>

              {/* Metric & Title */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                    lineHeight: 1.15
                  }}
                >
                  {item.metric}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem'
                  }}
                >
                  {item.title}
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  margin: 0
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
