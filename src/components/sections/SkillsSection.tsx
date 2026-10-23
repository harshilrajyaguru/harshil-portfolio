import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Bot, 
  Code, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Boxes,
  Workflow,
  Sparkles
} from 'lucide-react';
import { portfolioData, SkillCategory } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const { skills } = portfolioData;
  const [activeCategoryId, setActiveCategoryId] = useState<string>(skills[0].id);

  const activeCategory = skills.find((c) => c.id === activeCategoryId) || skills[0];

  // Helper for rendering stylized tech icons for the lilac tiles
  const renderSkillIcon = (iconKey: string) => {
    switch (iconKey) {
      case 'node':
      case 'express':
        return <Server size={32} strokeWidth={2.2} />;
      case 'fastapi':
        return <Zap size={32} strokeWidth={2.2} />;
      case 'spring':
        return <Boxes size={32} strokeWidth={2.2} />;
      case 'redis':
      case 'queue':
        return <Layers size={32} strokeWidth={2.2} />;
      case 'mongodb':
      case 'sql':
      case 'database':
        return <Database size={32} strokeWidth={2.2} />;
      case 'docker':
        return <Boxes size={32} strokeWidth={2.2} />;
      case 'agents':
      case 'bot':
        return <Bot size={32} strokeWidth={2.2} />;
      case 'gemini':
      case 'aws':
        return <Sparkles size={32} strokeWidth={2.2} />;
      case 'concurrency':
      case 'guardrail':
      case 'security':
        return <ShieldCheck size={32} strokeWidth={2.2} />;
      case 'git':
      case 'workflow':
        return <Workflow size={32} strokeWidth={2.2} />;
      case 'terminal':
      case 'cpp':
      case 'java':
      case 'python':
      case 'typescript':
      case 'javascript':
        return <Terminal size={32} strokeWidth={2.2} />;
      default:
        return <Code size={32} strokeWidth={2.2} />;
    }
  };

  // Helper for 2-3 letter bold abbreviation if applicable (like JS, TS, HTML in reference)
  const getAbbreviation = (name: string) => {
    if (name === 'JavaScript') return 'JS';
    if (name === 'TypeScript') return 'TS';
    if (name === 'Node.js') return 'Node';
    if (name === 'C++') return 'C++';
    if (name === 'Java') return 'Java';
    if (name === 'Python') return 'Py';
    if (name === 'FastAPI') return 'API';
    if (name === 'BullMQ') return 'MQ';
    if (name === 'Docker') return 'Dock';
    if (name === 'Redis') return 'Rds';
    return null;
  };

  return (
    <section id="skills" style={{ padding: '3.5rem 0' }}>
      <div className="content-container">
        {/* Section Divider (Matching reference: — Skills & Tools —) */}
        <div className="section-divider">
          <h2 className="section-title">Skills & Tools</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.35fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="skills-grid"
        >
          {/* Left Column: Category Selectors & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {skills.map((category: SkillCategory) => {
              const isSelected = category.id === activeCategoryId;
              return (
                <div
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className="skill-cat-card"
                  style={{
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    border: isSelected ? '2.5px solid var(--border-dark)' : '2px dashed rgba(18,24,38,0.25)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: isSelected ? '4px 4px 0px var(--border-dark)' : 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition-tactile)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: isSelected ? 'var(--text-main)' : 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{category.name}</span>
                    {isSelected && (
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bg-yellow)',
                          border: '1.5px solid var(--border-dark)'
                        }}
                      />
                    )}
                  </div>
                  {isSelected && (
                    <p
                      style={{
                        margin: '0.65rem 0 0 0',
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                        color: 'var(--text-muted)',
                        fontWeight: 500
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Chunky Lilac Skill Tiles (Matching reference layout) */}
          <div>
            <div
              className="skills-tiles-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {activeCategory.skills.map((skill) => {
                const abbr = getAbbreviation(skill.name);
                return (
                  <div
                    key={skill.name}
                    className="skill-tile"
                    style={{
                      backgroundColor: 'var(--bg-lilac)',
                      border: '2.5px solid var(--border-dark)',
                      borderRadius: '18px',
                      boxShadow: '4px 4px 0px var(--border-dark)',
                      padding: '1.25rem 0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.65rem',
                      textAlign: 'center',
                      cursor: 'default',
                      transition: 'var(--transition-tactile)',
                      minHeight: '115px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(-3px, -3px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0px var(--border-dark)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-lilac-dark)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0px, 0px)';
                      e.currentTarget.style.boxShadow = '4px 4px 0px var(--border-dark)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-lilac)';
                    }}
                  >
                    {abbr ? (
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.6rem',
                          fontWeight: 900,
                          color: 'var(--text-main)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1
                        }}
                      >
                        {abbr}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {renderSkillIcon(skill.iconKey)}
                      </div>
                    )}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        lineHeight: 1.2
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick helper note */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1.5px dashed var(--border-dark)',
                borderRadius: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Cpu size={16} color="var(--text-main)" />
              <span>
                Verified skill proficiency applied across production systems, research pipelines, and 700+ DSA solutions.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          #skills {
            padding: 2.5rem 0 !important;
          }
          .skill-cat-card {
            padding: 0.9rem 1rem !important;
            border-radius: 14px !important;
          }
          .skills-tiles-grid {
            grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)) !important;
            gap: 0.75rem !important;
          }
          .skill-tile {
            min-height: 100px !important;
            padding: 0.95rem 0.5rem !important;
            border-radius: 14px !important;
          }
        }
        @media (max-width: 360px) {
          .skills-tiles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
};
