import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Zap, Bot, Radio, CheckCircle, Database, Activity } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { portfolioData, Project } from '../../data/portfolioData';
import { Badge } from '../common/Badge';
import { VetanamImpactModal } from '../impact/VetanamImpactModal';
import { SaarthiImpactModal } from '../impact/SaarthiImpactModal';

export const ProjectsSection: React.FC = () => {
  const { projects, personal } = portfolioData;
  const [isVetanamImpactOpen, setIsVetanamImpactOpen] = useState(false);
  const [isSaarthiImpactOpen, setIsSaarthiImpactOpen] = useState(false);

  // Custom visual diagram for each project
  const renderArchitectureVisual = (projectId: string) => {
    if (projectId === 'vetanam') {
      return (
        <div
          style={{
            backgroundColor: '#F3F4F6',
            border: '2px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '1.25rem',
            height: '100%',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle grid texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              opacity: 0.35
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Top Bar: Inbound Transfers -> OCC Lock */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#FFFFFF',
                  padding: '0.2rem 0.5rem',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '6px'
                }}
              >
                1,000+ k6 CONCURRENT TRANSFERS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#A7F3D0',
                  color: '#065F46',
                  padding: '0.2rem 0.5rem',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '6px'
                }}
              >
                ZERO DOUBLE-SPEND
              </span>
            </div>

            {/* Architecture Flow Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--border-dark)',
                borderRadius: '12px',
                padding: '0.85rem',
                boxShadow: '3px 3px 0px var(--border-dark)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  DOUBLE-ENTRY LEDGER PIPELINE
                </span>
                <Badge variant="green">OCC Guard</Badge>
              </div>

              {/* Pipeline Nodes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#EDE9FE', border: '1.5px solid var(--border-dark)', borderRadius: '8px', padding: '0.5rem' }}>
                  <Zap size={16} style={{ margin: '0 auto', color: '#6D28D9' }} />
                  <div style={{ fontSize: '0.7rem', fontWeight: 800 }}>Redis / BullMQ</div>
                  <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>p95 &lt; 100ms</div>
                </div>
                <div style={{ backgroundColor: '#FEF3C7', border: '1.5px solid var(--border-dark)', borderRadius: '8px', padding: '0.5rem' }}>
                  <ShieldCheck size={16} style={{ margin: '0 auto', color: '#B45309' }} />
                  <div style={{ fontSize: '0.7rem', fontWeight: 800 }}>Gemini AI</div>
                  <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>Fraud Check</div>
                </div>
                <div style={{ backgroundColor: '#D1FAE5', border: '1.5px solid var(--border-dark)', borderRadius: '8px', padding: '0.5rem' }}>
                  <Database size={16} style={{ margin: '0 auto', color: '#047857' }} />
                  <div style={{ fontSize: '0.7rem', fontWeight: 800 }}>MongoDB Ledger</div>
                  <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>Audit Log</div>
                </div>
              </div>
            </div>

            {/* Verification Stats pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}
            >
              <span>Automated Tests: 77 Passed</span>
              <span style={{ color: '#059669' }}>● 100% Pass Rate</span>
            </div>
          </div>
        </div>
      );
    }

    if (projectId === 'saarthi') {
      return (
        <div
          style={{
            backgroundColor: '#F3F4F6',
            border: '2px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '1.25rem',
            height: '100%',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              opacity: 0.35
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#FFFFFF',
                  padding: '0.2rem 0.5rem',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '6px'
                }}
              >
                5-AGENT ADK ORCHESTRATOR
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#DDD6FE',
                  padding: '0.2rem 0.5rem',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '6px'
                }}
              >
                AWS BEDROCK
              </span>
            </div>

            {/* Multi-Agent Orchestration Visual */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--border-dark)',
                borderRadius: '12px',
                padding: '0.85rem',
                boxShadow: '3px 3px 0px var(--border-dark)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  3-LAYER RESPONSIBLE AI PIPELINE
                </span>
                <Bot size={16} color="#6D28D9" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.72rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F9FAFB', padding: '0.35rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                  <CheckCircle size={14} color="#059669" />
                  <span><strong>Layer 1:</strong> Deterministic Rules & Schema Validation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F9FAFB', padding: '0.35rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                  <CheckCircle size={14} color="#059669" />
                  <span><strong>Layer 2:</strong> Factual Consistency & Hallucination Checks</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F9FAFB', padding: '0.35rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                  <CheckCircle size={14} color="#059669" />
                  <span><strong>Layer 3:</strong> Adversarial LLM Review + Human Escalation</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}
            >
              <span>76 Integration Tests</span>
              <span style={{ color: '#059669' }}>● Contention-Free Writing</span>
            </div>
          </div>
        </div>
      );
    }

    // 6G VANET Simulation
    return (
      <div
        style={{
          backgroundColor: '#F3F4F6',
          border: '2px solid var(--border-dark)',
          borderRadius: '16px',
          padding: '1.25rem',
          height: '100%',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.35
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                backgroundColor: '#FFFFFF',
                padding: '0.2rem 0.5rem',
                border: '1.5px solid var(--border-dark)',
                borderRadius: '6px'
              }}
            >
              6G VANET SIMULATION
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                backgroundColor: '#FEF3C7',
                padding: '0.2rem 0.5rem',
                border: '1.5px solid var(--border-dark)',
                borderRadius: '6px'
              }}
            >
              1.02M+ RECORDS
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--border-dark)',
              borderRadius: '12px',
              padding: '0.85rem',
              boxShadow: '3px 3px 0px var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                MULTI-SIMULATOR PIPELINE
              </span>
              <Radio size={16} color="#D97706" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #121826', borderRadius: '6px', padding: '0.3rem', fontSize: '0.68rem', fontWeight: 800 }}>
                SUMO
              </div>
              <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #121826', borderRadius: '6px', padding: '0.3rem', fontSize: '0.68rem', fontWeight: 800 }}>
                Simu5G
              </div>
              <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #121826', borderRadius: '6px', padding: '0.3rem', fontSize: '0.68rem', fontWeight: 800 }}>
                Veins
              </div>
              <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #121826', borderRadius: '6px', padding: '0.3rem', fontSize: '0.68rem', fontWeight: 800 }}>
                OMNeT++
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#4B5563', marginTop: '0.5rem', textAlign: 'center' }}>
              49 Extracted Features for Explainable Intrusion Detection
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}
          >
            <span>Millimetre-Wave / THz</span>
            <span style={{ color: '#059669' }}>● High-Mobility Sync</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" style={{ padding: '3.5rem 0' }}>
      <div className="content-container">
        {/* Section Divider (Matching reference: — Project Showcase —) */}
        <div className="section-divider">
          <h2 className="section-title">Project Showcase</h2>
        </div>

        {/* Stack of Project Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {projects.map((project: Project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '2.5px solid var(--border-dark)',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px var(--border-dark)',
                padding: '2rem',
                transition: 'var(--transition-tactile)'
              }}
              className="project-card"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.3fr',
                  gap: '2.25rem',
                  alignItems: 'center'
                }}
                className="project-card-grid"
              >
                {/* Left Column: Architecture Diagram / System Preview */}
                <div>
                  {renderArchitectureVisual(project.id)}
                </div>

                {/* Right Column: Project Meta, Problem & Solution, Metrics, Tags, Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Category Pill (Matching reference: Featured Project in green/purple) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Badge variant={project.badgeColor}>
                      {project.category}
                    </Badge>
                    {project.isPrimary && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          color: '#059669',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <ShieldCheck size={14} /> Primary Highlight
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.9rem',
                        fontWeight: 900,
                        margin: '0 0 0.35rem 0',
                        lineHeight: 1.15
                      }}
                    >
                      {project.title}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-display)'
                      }}
                    >
                      {project.subtitle}
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: 'var(--text-main)',
                      margin: 0
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Verified Metrics Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                      gap: '0.65rem',
                      margin: '0.25rem 0'
                    }}
                  >
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        style={{
                          backgroundColor: '#F9FAFB',
                          border: '1.5px solid var(--border-dark)',
                          borderRadius: '10px',
                          padding: '0.5rem',
                          textAlign: 'center'
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.05rem',
                            fontWeight: 900,
                            color: 'var(--text-main)'
                          }}
                        >
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technology Stack Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: '#F3F4F6',
                          border: '1px solid var(--border-dark)',
                          borderRadius: '6px',
                          padding: '0.2rem 0.55rem',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--text-main)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Action Links (Matching Behance / GitHub / External icons in reference) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn project-btn-source"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          padding: '0.45rem 0.85rem',
                          backgroundColor: 'var(--bg-yellow)',
                          border: '2px solid var(--border-dark)',
                          borderRadius: '10px',
                          boxShadow: '2px 2px 0px var(--border-dark)',
                          transition: 'var(--transition-tactile)',
                          cursor: 'pointer'
                        }}
                      >
                        <GithubIcon size={16} />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          padding: '0.35rem 0.75rem',
                          backgroundColor: '#F3F4F6',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px'
                        }}
                      >
                        Academic Research Dataset
                      </span>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn project-btn-demo"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          padding: '0.45rem 0.85rem',
                          backgroundColor: 'var(--bg-lilac)',
                          border: '2px solid var(--border-dark)',
                          borderRadius: '10px',
                          boxShadow: '2px 2px 0px var(--border-dark)',
                          transition: 'var(--transition-tactile)',
                          cursor: 'pointer'
                        }}
                      >
                        <ExternalLink size={16} strokeWidth={2.4} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.id === 'vetanam' && (
                      <button
                        type="button"
                        onClick={() => setIsVetanamImpactOpen(true)}
                        className="project-action-btn project-btn-impact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          padding: '0.45rem 0.85rem',
                          backgroundColor: '#A7F3D0',
                          border: '2px solid var(--border-dark)',
                          borderRadius: '10px',
                          boxShadow: '2px 2px 0px var(--border-dark)',
                          transition: 'var(--transition-tactile)',
                          cursor: 'pointer'
                        }}
                      >
                        <Activity size={16} strokeWidth={2.4} />
                        <span>Impact</span>
                      </button>
                    )}

                    {project.id === 'saarthi' && (
                      <button
                        type="button"
                        onClick={() => setIsSaarthiImpactOpen(true)}
                        className="project-action-btn project-btn-impact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          padding: '0.45rem 0.85rem',
                          backgroundColor: '#A7F3D0',
                          border: '2px solid var(--border-dark)',
                          borderRadius: '10px',
                          boxShadow: '2px 2px 0px var(--border-dark)',
                          transition: 'var(--transition-tactile)',
                          cursor: 'pointer'
                        }}
                      >
                        <Activity size={16} strokeWidth={2.4} />
                        <span>Impact</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link: View More Projects (Directly matching reference: "View More Project ↗") */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          {personal.socials.github && (
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderBottom: '3px solid var(--border-dark)',
                paddingBottom: '0.2rem'
              }}
            >
              <span>View More Projects on GitHub</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        .project-action-btn {
          cursor: pointer;
          user-select: none;
        }
        .project-action-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px var(--border-dark) !important;
        }
        .project-action-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border-dark) !important;
        }
        .project-action-btn:focus-visible {
          outline: 2px dashed var(--border-dark);
          outline-offset: 3px;
        }
        .project-btn-source:hover {
          background-color: var(--bg-yellow-hover) !important;
        }
        .project-btn-demo:hover {
          background-color: var(--bg-lilac-dark) !important;
        }
        .project-btn-impact:hover {
          background-color: #6EE7B7 !important;
        }
        @media (max-width: 900px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>

      {/* Vetanam Interactive Impact Overlay */}
      <VetanamImpactModal
        isOpen={isVetanamImpactOpen}
        onClose={() => setIsVetanamImpactOpen(false)}
      />

      {/* Saarthi Interactive Impact Overlay */}
      <SaarthiImpactModal
        isOpen={isSaarthiImpactOpen}
        onClose={() => setIsSaarthiImpactOpen(false)}
      />
    </section>
  );
};
