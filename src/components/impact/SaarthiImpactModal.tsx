import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  RotateCcw,
  ChevronsLeftRight,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Users,
  BookOpen,
  Laptop,
  FileText,
  Sparkles,
  GitMerge,
  AlertCircle,
  Cpu,
  Layers,
  Lock,
  RefreshCw
} from 'lucide-react';

interface SaarthiImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 6 Core Workflow Stages as defined in specifications
interface WorkflowStageInfo {
  number: string;
  name: string;
  title: string;
  category: 'observe' | 'specialist' | 'orchestrate' | 'safety' | 'deliver' | 'adapt';
  summary: string;
  details: string;
  schemaNote: string;
}

const WORKFLOW_STAGES: WorkflowStageInfo[] = [
  {
    number: '01',
    name: 'OBSERVE',
    title: 'Load Structured Classroom State',
    category: 'observe',
    summary: 'Loads classroom signals, learning-progress inputs, curriculum position, resource inventory, and session history.',
    details: 'Ingests real-time assessment data (e.g. Grade 5 at 42%, Grade 3 at 88%), current lesson objectives, and available devices into typed observations.',
    schemaNote: 'Validated via Pydantic ClassroomObservation schema.'
  },
  {
    number: '02',
    name: 'SPECIALIZED REASONING',
    title: '5 Agents Handle Distinct Responsibilities',
    category: 'specialist',
    summary: 'Progress, Curriculum, Resource, Activity, and Orchestrator agents independently reason over their designated domain.',
    details: 'Progress identifies difficulty; Curriculum evaluates advance/hold/remediate; Resource matches devices/materials; Activity drafts exercises; Orchestrator tracks coordination.',
    schemaNote: 'Each specialist emits a typed Recommendation without state mutation permissions.'
  },
  {
    number: '03',
    name: 'RESOLVE CONFLICTS',
    title: 'Single-Writer Orchestrator Prioritizes & Commits',
    category: 'orchestrate',
    summary: 'The Orchestrator resolves competing recommendations and is the SOLE authority permitted to commit shared-state updates.',
    details: 'Curriculum wants to advance while Progress signals a persistent decimal defect. Orchestrator applies priority policies, resolves contention, and writes state atomically.',
    schemaNote: 'Strict Pydantic schema validation; enforces single-writer OCC invariants.'
  },
  {
    number: '04',
    name: 'SAFETY VALIDATION',
    title: '3-Layer Responsible AI Safety Gate',
    category: 'safety',
    summary: 'Deterministic rules, factual checks, and adversarial LLM review independently verify generated activities.',
    details: 'Evaluates pedagogical accuracy, age appropriateness, and physical safety. Automatically triggers bounded regeneration or human escalation on failure.',
    schemaNote: 'Independent safety gate verdict (Score: 0.98 in demonstration scenario).'
  },
  {
    number: '05',
    name: 'DELIVER ONE CLEAR ACTION',
    title: 'Prioritized Teacher Action Card',
    category: 'deliver',
    summary: 'Teacher receives one unambiguous, safety-approved next step instead of fragmented, conflicting agent responses.',
    details: 'Synthesizes recommendations into a targeted 10-minute intervention card for the educator, keeping cognitive load minimal in a fast-moving classroom.',
    schemaNote: 'Emitted as high-priority TeacherActionNotification.'
  },
  {
    number: '06',
    name: 'MONITOR AND ADAPT',
    title: 'Adaptive Feedback Loop',
    category: 'adapt',
    summary: 'Subsequent classroom signals feed back into the adaptive loop, informing follow-up decisions.',
    details: 'As students complete the remediation activity or progress assessments, new signals trigger the next coordination cycle continuously.',
    schemaNote: 'Closes the feedback loop for multi-turn classroom orchestration.'
  }
];

export const SaarthiImpactModal: React.FC<SaarthiImpactModalProps> = ({ isOpen, onClose }) => {
  // 100 = 100% BEFORE visible (divider at right), 0 = 100% AFTER visible (divider at left)
  const [splitPercent, setSplitPercent] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Interactive stage selection & animation tracking
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1); // 0 to 5
  const [selectedEntityId, setSelectedEntityId] = useState<string>('orchestrator'); // inspector selection
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  // Stop active swipe animation safely
  const stopAnimation = useCallback(() => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  // Reset to full BEFORE state on every open
  useEffect(() => {
    if (isOpen) {
      stopAnimation();
      setSplitPercent(100);
      setActiveTab('before');
      setIsDragging(false);
      setActiveStageIndex(0);
      setIsAutoCycling(true);
    } else {
      stopAnimation();
    }
  }, [isOpen, stopAnimation]);

  // Escape key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        stopAnimation();
        setSplitPercent((prev) => {
          const next = Math.max(0, prev - 10);
          setActiveTab(next < 50 ? 'after' : 'before');
          return next;
        });
      } else if (e.key === 'ArrowRight') {
        stopAnimation();
        setSplitPercent((prev) => {
          const next = Math.min(100, prev + 10);
          setActiveTab(next < 50 ? 'after' : 'before');
          return next;
        });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, stopAnimation]);

  // Automated gentle cycle through workflow stages (resets on replayKey)
  useEffect(() => {
    if (!isOpen || !isAutoCycling) return;

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [isOpen, replayKey, isAutoCycling]);

  // Toolbar Handlers
  const handleSelectBefore = useCallback(() => {
    stopAnimation();
    setSplitPercent(100);
    setActiveTab('before');
  }, [stopAnimation]);

  const handleSelectAfter = useCallback(() => {
    stopAnimation();
    setSplitPercent(0);
    setActiveTab('after');
  }, [stopAnimation]);

  // Replay animation: Sweeps from 100% BEFORE to 100% AFTER over ~1.4 seconds
  const handleReplay = useCallback(() => {
    stopAnimation();
    setReplayKey((k) => k + 1);
    setIsAnimating(true);
    setSplitPercent(100);
    setActiveTab('before');
    setActiveStageIndex(0);
    setIsAutoCycling(true);

    const duration = 1400; // 1.4 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));

      // Cubic ease-in-out curve
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newSplit = Math.max(0, Math.min(100, 100 - eased * 100));
      setSplitPercent(newSplit);

      if (newSplit <= 50) {
        setActiveTab('after');
      } else {
        setActiveTab('before');
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSplitPercent(0);
        setActiveTab('after');
        setIsAnimating(false);
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [stopAnimation]);

  // Dragging handlers for divider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAnimation();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    stopAnimation();
    setIsDragging(true);
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (rawX / rect.width) * 100));
      setSplitPercent(pct);
      setActiveTab(pct < 50 ? 'after' : 'before');
    },
    [isDragging]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(18, 24, 38, 0.72)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'impactFadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid var(--border-dark)',
          borderRadius: '24px',
          boxShadow: '8px 8px 0px var(--border-dark)',
          maxWidth: '1160px',
          width: '100%',
          maxHeight: '94vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem'
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
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2.5px solid var(--border-dark)',
            backgroundColor: 'var(--bg-yellow)',
            boxShadow: '2px 2px 0px var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-tactile)',
            zIndex: 10
          }}
          className="impact-icon-btn"
          title="Close Impact Overlay (Esc)"
          aria-label="Close"
        >
          <X size={20} strokeWidth={3} color="var(--text-main)" />
        </button>

        {/* Header Block */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                backgroundColor: 'var(--bg-lilac)',
                color: 'var(--text-main)',
                border: '2px solid var(--border-dark)',
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                boxShadow: '1.5px 1.5px 0px var(--border-dark)'
              }}
            >
              02 / MULTI-GRADE CLASSROOM ORCHESTRATION
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-muted)'
              }}
            >
              THE PROBLEM → THE MULTI-AGENT SOLUTION → THE VALIDATION
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.35rem, 2.3vw, 1.8rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              lineHeight: 1.25,
              margin: 0
            }}
          >
            From Classroom Overload to Coordinated Action
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              margin: '0.3rem 0 0 0',
              lineHeight: 1.4
            }}
          >
            How Saarthi turns competing classroom needs into one prioritized, safety-checked next step for the teacher.
          </p>
        </div>

        {/* 1. TOP TOOLBAR CONTROLS — [ Before ] [ After ] [ Replay ↻ ] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0.65rem 0.85rem',
            backgroundColor: '#F3F4F6',
            border: '2px solid var(--border-dark)',
            borderRadius: '14px',
            boxShadow: '2px 2px 0px var(--border-dark)'
          }}
        >
          {/* Left: Mode Selection [ Before ] [ After ] */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleSelectBefore}
              className={`toolbar-btn ${activeTab === 'before' ? 'active-before' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 800,
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: '2px solid var(--border-dark)',
                cursor: 'pointer',
                transition: 'var(--transition-tactile)',
                backgroundColor: activeTab === 'before' ? '#FEE2E2' : '#FFFFFF',
                color: activeTab === 'before' ? '#991B1B' : 'var(--text-main)',
                boxShadow: activeTab === 'before' ? '2.5px 2.5px 0px var(--border-dark)' : '1px 1px 0px var(--border-dark)'
              }}
              title="Show full 100% BEFORE state"
            >
              <AlertTriangle size={15} color={activeTab === 'before' ? '#DC2626' : '#9CA3AF'} strokeWidth={2.5} />
              <span>Before</span>
            </button>

            <button
              type="button"
              onClick={handleSelectAfter}
              className={`toolbar-btn ${activeTab === 'after' ? 'active-after' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 800,
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: '2px solid var(--border-dark)',
                cursor: 'pointer',
                transition: 'var(--transition-tactile)',
                backgroundColor: activeTab === 'after' ? '#DCFCE7' : '#FFFFFF',
                color: activeTab === 'after' ? '#166534' : 'var(--text-main)',
                boxShadow: activeTab === 'after' ? '2.5px 2.5px 0px var(--border-dark)' : '1px 1px 0px var(--border-dark)'
              }}
              title="Show full 100% AFTER state"
            >
              <CheckCircle2 size={15} color={activeTab === 'after' ? '#16A34A' : '#9CA3AF'} strokeWidth={2.5} />
              <span>After</span>
            </button>
          </div>

          {/* Right: Replay ↻ Button */}
          <button
            type="button"
            onClick={handleReplay}
            disabled={isAnimating}
            className="toolbar-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: '2px solid var(--border-dark)',
              backgroundColor: isAnimating ? '#FDE047' : 'var(--bg-yellow)',
              color: 'var(--text-main)',
              cursor: isAnimating ? 'wait' : 'pointer',
              boxShadow: '2px 2px 0px var(--border-dark)',
              transition: 'var(--transition-tactile)',
              opacity: isAnimating ? 0.9 : 1
            }}
            title="Animate divider from 100% BEFORE to 100% AFTER"
          >
            <RotateCcw size={15} strokeWidth={2.5} className={isAnimating ? 'spin-icon' : ''} />
            <span>Replay ↻</span>
          </button>
        </div>

        {/* 2. INTERACTIVE COMPARISON CONTAINER WITH DUAL-LAYER INSET CLIPPING */}
        <div
          ref={containerRef}
          className="comparison-container"
          style={{
            position: 'relative',
            border: '2.5px solid var(--border-dark)',
            borderRadius: '16px',
            boxShadow: '4px 4px 0px var(--border-dark)',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            userSelect: 'none',
            minHeight: '620px'
          }}
        >
          {/* BEFORE Panel (Left Side): Clipped from right at (100 - splitPercent)% */}
          <div
            className="comparison-panel panel-before"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#FFF1F2',
              padding: '1.25rem',
              boxSizing: 'border-box',
              overflowY: 'auto',
              clipPath: `inset(0 ${Math.max(0, 100 - splitPercent)}% 0 0)`,
              WebkitClipPath: `inset(0 ${Math.max(0, 100 - splitPercent)}% 0 0)`,
              visibility: splitPercent <= 0.2 ? 'hidden' : 'visible',
              pointerEvents: splitPercent <= 2 ? 'none' : 'auto',
              zIndex: splitPercent >= 50 ? 3 : 2
            }}
          >
            {renderBeforeContent(replayKey)}
          </div>

          {/* AFTER Panel (Right Side): Clipped from left at splitPercent% */}
          <div
            className="comparison-panel panel-after"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#F0FDF4',
              padding: '1.25rem',
              boxSizing: 'border-box',
              overflowY: 'auto',
              clipPath: `inset(0 0 0 ${Math.min(100, splitPercent)}%)`,
              WebkitClipPath: `inset(0 0 0 ${Math.min(100, splitPercent)}%)`,
              visibility: splitPercent >= 99.8 ? 'hidden' : 'visible',
              pointerEvents: splitPercent >= 98 ? 'none' : 'auto',
              zIndex: splitPercent < 50 ? 3 : 2
            }}
          >
            {renderAfterContent(
              activeStageIndex,
              setActiveStageIndex,
              selectedEntityId,
              setSelectedEntityId,
              setIsAutoCycling,
              replayKey
            )}
          </div>

          {/* Draggable Vertical Divider Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${splitPercent}%`,
              transform: 'translateX(-50%)',
              width: '4px',
              backgroundColor: 'var(--border-dark)',
              zIndex: 10,
              cursor: isAnimating ? 'wait' : 'ew-resize',
              pointerEvents: isAnimating ? 'none' : 'auto'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="slider"
            tabIndex={0}
            aria-label="Before / After comparison divider"
            aria-valuenow={Math.round(splitPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Circular Thumb Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid var(--border-dark)',
                boxShadow: '2px 2px 0px var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAnimating ? 'wait' : 'ew-resize',
                transition: 'transform 0.15s ease'
              }}
              className="divider-thumb"
            >
              <ChevronsLeftRight size={18} strokeWidth={2.8} color="var(--text-main)" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes impactFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .toolbar-btn:hover:not(:disabled) {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 3px 3px 0px var(--border-dark) !important;
        }
        .toolbar-btn:active:not(:disabled) {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border-dark) !important;
        }

        .impact-icon-btn:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 3px 3px 0px var(--border-dark) !important;
        }
        .impact-icon-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border-dark) !important;
        }

        .divider-thumb:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
          background-color: var(--bg-yellow) !important;
        }

        .stage-pill {
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .stage-pill:hover {
          transform: translateY(-2px);
          box-shadow: 2px 2px 0px var(--border-dark) !important;
        }

        .agent-interactive-card {
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .agent-interactive-card:hover {
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px var(--border-dark) !important;
        }

        @media (max-width: 820px) {
          .comparison-container {
            min-height: 700px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// -------------------------------------------------------------
// 1. BEFORE PANEL: THE PROBLEM (FRAGMENTED DECISION-MAKING)
// -------------------------------------------------------------
function renderBeforeContent(replayKey: number) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', width: '100%', boxSizing: 'border-box' }}
      key={`before-panel-${replayKey}`}
    >
      {/* Header Block */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 900,
              color: '#B91C1C',
              backgroundColor: '#FEE2E2',
              border: '1.5px solid #991B1B',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px'
            }}
          >
            BEFORE / FRAGMENTED DECISION-MAKING
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#991B1B', fontWeight: 800 }}>
            UNCOORDINATED REASONING &amp; STATE CONFLICTS
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 2.1vw, 1.55rem)',
            fontWeight: 900,
            color: '#7F1D1D',
            margin: 0,
            lineHeight: 1.25
          }}
        >
          Too many moving parts. No single, reliable next step.
        </h3>

        <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#991B1B', lineHeight: 1.45 }}>
          Classroom decisions depend on multiple signals: student progress, curriculum priorities, available resources, and activity requirements. These needs can conflict, while the teacher is left to connect the information, resolve priorities, and decide what happens next.
        </p>
      </div>

      {/* 4 Concise Problem Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0.65rem'
        }}
      >
        {/* Card 1: FRAGMENTED REASONING */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #DC2626',
            borderRadius: '10px',
            padding: '0.75rem',
            boxShadow: '2.5px 2.5px 0px #991B1B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <Layers size={15} color="#DC2626" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#991B1B' }}>
              FRAGMENTED REASONING
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Progress, curriculum, resource availability, and activity planning require different kinds of decisions.
          </p>
        </div>

        {/* Card 2: CONFLICTING RECOMMENDATIONS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #DC2626',
            borderRadius: '10px',
            padding: '0.75rem',
            boxShadow: '2.5px 2.5px 0px #991B1B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <AlertCircle size={15} color="#DC2626" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#991B1B' }}>
              CONFLICTING RECOMMENDATIONS
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Advancing one learning path may conflict with the need to address a persistent learning gap.
          </p>
        </div>

        {/* Card 3: SHARED-STATE CONFLICTS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #DC2626',
            borderRadius: '10px',
            padding: '0.75rem',
            boxShadow: '2.5px 2.5px 0px #991B1B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <GitMerge size={15} color="#DC2626" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#991B1B' }}>
              SHARED-STATE CONFLICTS
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Multiple agents proposing updates need a controlled way to prevent inconsistent changes to classroom state.
          </p>
        </div>

        {/* Card 4: UNVERIFIED OUTPUTS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #DC2626',
            borderRadius: '10px',
            padding: '0.75rem',
            boxShadow: '2.5px 2.5px 0px #991B1B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <AlertTriangle size={15} color="#DC2626" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#991B1B' }}>
              UNVERIFIED OUTPUTS
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Generated activities need factual, age-appropriateness, and safety checks before reaching the teacher.
          </p>
        </div>
      </div>

      {/* Architectural Problem Illustration: Disconnected Inputs, Conflicting Writes, Unverified Outputs */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px dashed #DC2626',
          borderRadius: '12px',
          padding: '0.85rem',
          boxShadow: '2.5px 2.5px 0px rgba(185, 28, 28, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900, color: '#B91C1C' }}>
            SYSTEM VISUALIZATION · DISCONNECTED CHANNELS &amp; CONCURRENT WRITE HAZARDS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 800,
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              border: '1px solid #DC2626'
            }}
          >
            NO SINGLE WRITER
          </span>
        </div>

        {/* 3-Column Visual Flow: Inputs -> Independent Proposals (Collision) -> Unverified Delivery */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.65rem' }}>
          {/* Column 1: Disconnected Inputs */}
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '0.6rem' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#991B1B', marginBottom: '0.35rem' }}>
              DISCONNECTED INPUTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--text-main)' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.25rem 0.45rem', borderRadius: '4px', border: '1px dashed #DC2626' }}>
                • Student Mastery Tracker (Isolated)
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.25rem 0.45rem', borderRadius: '4px', border: '1px dashed #DC2626' }}>
                • Static Curriculum Syllabus
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.25rem 0.45rem', borderRadius: '4px', border: '1px dashed #DC2626' }}>
                • Contended Device &amp; Worksheet Inventory
              </div>
            </div>
          </div>

          {/* Column 2: Independent Recommendations & Conflicting Updates */}
          <div style={{ backgroundColor: '#FFF5F5', border: '1.5px solid #DC2626', borderRadius: '8px', padding: '0.6rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#991B1B' }}>
                CONFLICTING STATE WRITES
              </span>
              <AlertCircle size={13} color="#DC2626" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.7rem' }}>
              <div style={{ backgroundColor: '#FEE2E2', padding: '0.25rem 0.45rem', borderRadius: '4px', color: '#7F1D1D' }}>
                Proposal A: &ldquo;Advance Grade 5 to Division&rdquo;
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 900, color: '#DC2626' }}>
                ⚡ CONCURRENT CONFLICT ⚡
              </div>
              <div style={{ backgroundColor: '#FEE2E2', padding: '0.25rem 0.45rem', borderRadius: '4px', color: '#7F1D1D' }}>
                Proposal B: &ldquo;Hold Grade 5 on Decimal Rem.&rdquo;
              </div>
            </div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: '#B91C1C', fontFamily: 'var(--font-mono)' }}>
              ⚠️ Without single-writer orchestrator, simultaneous updates risk state corruption.
            </div>
          </div>

          {/* Column 3: Unverified Outputs Reaching Teacher */}
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '0.6rem' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#991B1B', marginBottom: '0.35rem' }}>
              UNCHECKED OUTPUTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.7rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.3rem 0.45rem', borderRadius: '4px', border: '1px solid #DC2626', color: '#7F1D1D' }}>
                Raw LLM Activity Generation: No deterministic age or physical safety evaluation.
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: '0.3rem 0.45rem', borderRadius: '4px', border: '1px dashed #DC2626', color: '#991B1B', fontWeight: 700 }}>
                High Cognitive Overload: Teacher must manually filter and arbitrate while teaching.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Illustrative Scenario Inputs Note (Grounded & Subordinate) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #FCA5A5',
          borderRadius: '8px',
          padding: '0.45rem 0.75rem',
          flexWrap: 'wrap',
          gap: '0.4rem',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: '#991B1B'
        }}
      >
        <span>
          <strong>Documented Dilemma Scenario:</strong> 40-min session with divergent progress — Grade 3 (88% ready to advance) vs. Grade 5 (42% persistent decimal deficit).
        </span>
        <span style={{ fontStyle: 'italic', color: '#B91C1C' }}>
          * Architectural design challenges; not claimed failures in a deployed school.
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. AFTER PANEL: THE MULTI-AGENT SOLUTION & THE VALIDATION
// -------------------------------------------------------------
function renderAfterContent(
  activeStageIndex: number,
  setActiveStageIndex: (idx: number) => void,
  selectedEntityId: string,
  setSelectedEntityId: (id: string) => void,
  setIsAutoCycling: (auto: boolean) => void,
  replayKey: number
) {
  const currentStage = WORKFLOW_STAGES[activeStageIndex];

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', boxSizing: 'border-box' }}
      key={`after-panel-${replayKey}`}
    >
      {/* Header Block */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 900,
              color: '#065F46',
              backgroundColor: '#A7F3D0',
              border: '1.5px solid #047857',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px'
            }}
          >
            AFTER / COORDINATED INTELLIGENCE
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#047857', fontWeight: 800 }}>
            5 SPECIALIST AGENTS · SINGLE-WRITER ORCHESTRATION · 3-LAYER SAFETY GATE
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 2.1vw, 1.55rem)',
            fontWeight: 900,
            color: '#064E3B',
            margin: 0,
            lineHeight: 1.25
          }}
        >
          Specialized agents. One coordinated decision.
        </h3>

        <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#047857', lineHeight: 1.45 }}>
          I designed Saarthi around a multi-agent workflow in which each agent owns a specific responsibility, a single-writer orchestrator resolves competing recommendations, and a separate safety pipeline checks the result before a prioritized action reaches the teacher.
        </p>
      </div>

      {/* Interactive 6-Stage Workflow Stepper Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.4rem',
          backgroundColor: '#FFFFFF',
          border: '2px solid var(--border-dark)',
          borderRadius: '12px',
          padding: '0.5rem',
          boxShadow: '2.5px 2.5px 0px var(--border-dark)'
        }}
      >
        {WORKFLOW_STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={stage.number}
              type="button"
              className="stage-pill"
              onClick={() => {
                setActiveStageIndex(idx);
                setIsAutoCycling(false);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.45rem 0.55rem',
                borderRadius: '8px',
                border: isActive ? '2px solid var(--border-dark)' : '1px solid #E5E7EB',
                backgroundColor: isActive ? '#A7F3D0' : '#F9FAFB',
                boxShadow: isActive ? '2px 2px 0px var(--border-dark)' : 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', width: '100%', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: isActive ? '#064E3B' : '#6B7280' }}>
                  {stage.number}
                </span>
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#047857' }} />}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                {stage.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Live Simulator & Interactive Inspector Callout */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #059669',
          borderRadius: '12px',
          padding: '0.85rem',
          boxShadow: '3px 3px 0px #047857'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#065F46',
                backgroundColor: '#D1FAE5',
                padding: '0.15rem 0.45rem',
                borderRadius: '5px',
                border: '1px solid #10B981'
              }}
            >
              ACTIVE STAGE {currentStage.number} — {currentStage.name}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-main)' }}>
              {currentStage.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#047857' }}>
              {currentStage.schemaNote}
            </span>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '0.78rem', color: '#374151', lineHeight: 1.4 }}>
          {currentStage.details}
        </p>
      </div>

      {/* 5 SPECIALIST AGENTS + INDEPENDENT SAFETY GATE (Architectural Distinction) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900, color: '#065F46' }}>
            5 SPECIALIST AGENTS &amp; INDEPENDENT SAFETY GATE
          </span>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Click any agent to inspect responsibility &amp; schema contract
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
            gap: '0.55rem'
          }}
        >
          {/* 1. Progress Agent */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('progress');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'progress' ? '#ECFDF5' : '#FFFFFF',
              border: selectedEntityId === 'progress' ? '2px solid #047857' : '1.5px solid #059669',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'progress' ? '2.5px 2.5px 0px #047857' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <Users size={14} color="#059669" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800 }}>Progress Agent</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              Identifies learning difficulties and persistent mastery trends across assessments.
            </p>
          </div>

          {/* 2. Curriculum Agent */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('curriculum');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'curriculum' ? '#ECFDF5' : '#FFFFFF',
              border: selectedEntityId === 'curriculum' ? '2px solid #047857' : '1.5px solid #059669',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'curriculum' ? '2.5px 2.5px 0px #047857' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <BookOpen size={14} color="#059669" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800 }}>Curriculum Agent</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              Evaluates whether to advance, hold, or assign targeted remediation.
            </p>
          </div>

          {/* 3. Resource Agent */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('resource');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'resource' ? '#ECFDF5' : '#FFFFFF',
              border: selectedEntityId === 'resource' ? '2px solid #047857' : '1.5px solid #059669',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'resource' ? '2.5px 2.5px 0px #047857' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <Laptop size={14} color="#059669" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800 }}>Resource Agent</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              Considers available equipment, devices, printed worksheets, and teacher time.
            </p>
          </div>

          {/* 4. Activity Agent */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('activity');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'activity' ? '#ECFDF5' : '#FFFFFF',
              border: selectedEntityId === 'activity' ? '2px solid #047857' : '1.5px solid #059669',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'activity' ? '2.5px 2.5px 0px #047857' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <FileText size={14} color="#059669" />
              <span style={{ fontSize: '0.76rem', fontWeight: 800 }}>Activity Agent</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              Creates targeted practice activities, rubrics, and scaffolded student instructions.
            </p>
          </div>

          {/* 5. Orchestrator Agent (Single-Writer) */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('orchestrator');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'orchestrator' ? '#EDE9FE' : '#FFFFFF',
              border: selectedEntityId === 'orchestrator' ? '2px solid #6D28D9' : '1.5px solid #7C3AED',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'orchestrator' ? '2.5px 2.5px 0px #6D28D9' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <Lock size={14} color="#6D28D9" />
              <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#4C1D95' }}>Orchestrator Agent</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#5B21B6', lineHeight: 1.3 }}>
              Sole writer: Resolves competing recommendations and coordinates state execution.
            </p>
          </div>

          {/* INDEPENDENT SAFETY GATE (Explicitly distinct from the 5 agents) */}
          <div
            className="agent-interactive-card"
            onClick={() => {
              setSelectedEntityId('safety-gate');
              setIsAutoCycling(false);
            }}
            style={{
              backgroundColor: selectedEntityId === 'safety-gate' ? '#DCFCE7' : '#FFFFFF',
              border: selectedEntityId === 'safety-gate' ? '2px solid #047857' : '1.5px solid #059669',
              borderRadius: '8px',
              padding: '0.6rem',
              boxShadow: selectedEntityId === 'safety-gate' ? '2.5px 2.5px 0px #047857' : '1px 1px 0px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <ShieldCheck size={14} color="#059669" />
              <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#064E3B' }}>Safety Gate</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#065F46', lineHeight: 1.3 }}>
              Independent 3-layer pipeline: deterministic rules, factual checks, adversarial LLM review.
            </p>
          </div>
        </div>
      </div>

      {/* Optional Illustrative Execution Box (Subordinate & Grounded) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #10B981',
          borderRadius: '10px',
          padding: '0.7rem 0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 900, color: '#065F46' }}>
            ILLUSTRATIVE EXECUTION SCENARIO · COMPETING PRIORITY RESOLUTION
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 800,
              backgroundColor: '#D1FAE5',
              color: '#065F46',
              padding: '0.1rem 0.4rem',
              borderRadius: '4px'
            }}
          >
            Demonstration Input: Grade 5 Score = 42% · Safety Score = 0.98
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.725rem' }}>
          <div style={{ backgroundColor: '#F9FAFB', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <strong>1. Signal &amp; Reason:</strong> Progress notes persistent decimal difficulty; Curriculum shifts recommendation from <em>ADVANCE</em> to <strong>HOLD &amp; REMEDIATE</strong>.
          </div>
          <div style={{ backgroundColor: '#F9FAFB', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <strong>2. Resource &amp; Activity:</strong> Resource allocates tablets to Grade 5 and worksheets to Grade 3; Activity generates 10-min <em>&ldquo;Decimal Place Value Fixer&rdquo;</em>.
          </div>
          <div style={{ backgroundColor: '#F9FAFB', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <strong>3. Validation &amp; Delivery:</strong> Safety Gate passes exercise (score 0.98); Orchestrator delivers single prioritized action card to teacher.
          </div>
        </div>

        {/* Final Prioritized Teacher Action Card */}
        <div
          style={{
            backgroundColor: '#FEF3C7',
            border: '2px solid var(--border-dark)',
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            boxShadow: '2px 2px 0px var(--border-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem'
          }}
        >
          <Sparkles size={16} color="#D97706" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.35 }}>
            <strong style={{ color: '#92400E' }}>DELIVERED TEACHER ACTION CARD:</strong> &ldquo;Lead 10-minute targeted decimal intervention with Grade 5 using &lsquo;Decimal Place Value Fixer&rsquo; on tablets. Grade 3 continues peer worksheets; Grade 4 maintains fraction practice.&rdquo;
          </div>
        </div>
      </div>

      {/* 3. DEDICATED VALIDATION AREA: "HOW I VALIDATED IT" (VISUALLY SEPARATED) */}
      <div
        style={{
          marginTop: '0.4rem',
          backgroundColor: '#FFFFFF',
          border: '2.5px solid var(--border-dark)',
          borderRadius: '14px',
          padding: '1.1rem',
          boxShadow: '4px 4px 0px var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 900,
                backgroundColor: 'var(--bg-yellow)',
                color: 'var(--text-main)',
                border: '1.5px solid var(--border-dark)',
                borderRadius: '5px',
                padding: '0.15rem 0.5rem',
                boxShadow: '1.5px 1.5px 0px var(--border-dark)'
              }}
            >
              HOW I VALIDATED IT
            </span>
            <span style={{ marginLeft: '0.6rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-muted)' }}>
              RIGOROUS SOFTWARE &amp; AI RELIABILITY ENGINEERING
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #10B981',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px'
            }}
          >
            100% SUITE PASS RATE
          </div>
        </div>

        {/* Hero Metric Callout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            backgroundColor: '#F9FAFB',
            border: '2px solid var(--border-dark)',
            borderRadius: '10px',
            padding: '0.85rem 1rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                lineHeight: 1
              }}
            >
              76
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: 'var(--text-main)'
              }}
            >
              AUTOMATED TESTS
            </span>
          </div>

          <div style={{ flex: 1, minWidth: '220px' }}>
            <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 700, lineHeight: 1.35 }}>
              Validated agent behavior, adaptive-loop integration, and live Amazon Bedrock execution.
            </p>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Source of truth: Documented in resume &amp; repository test suites.
            </span>
          </div>
        </div>

        {/* 3 Compact Validation Areas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.7rem'
          }}
        >
          {/* Validation Column 1: AGENT BEHAVIOR */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              borderRadius: '10px',
              padding: '0.75rem',
              boxShadow: '2px 2px 0px var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <Cpu size={15} color="#059669" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-main)' }}>
                AGENT BEHAVIOR
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Tests for the individual agents and their responsibilities, including progress evaluation, curriculum reasoning, resource selection, activity generation, and orchestration.
            </p>
            <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#065F46', fontWeight: 700 }}>
              • Dedicated Unit &amp; Schema Suites
            </div>
          </div>

          {/* Validation Column 2: END-TO-END ADAPTIVE LOOP */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              borderRadius: '10px',
              padding: '0.75rem',
              boxShadow: '2px 2px 0px var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <RefreshCw size={15} color="#2563EB" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-main)' }}>
                END-TO-END ADAPTIVE LOOP
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Tests covering the integration of observations, agent decisions, orchestration, safety validation, and subsequent state updates.
            </p>
            <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#1D4ED8', fontWeight: 700 }}>
              • Integration &amp; Classroom-Loop Suites
            </div>
          </div>

          {/* Validation Column 3: LIVE MODEL EXECUTION */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              borderRadius: '10px',
              padding: '0.75rem',
              boxShadow: '2px 2px 0px var(--border-dark)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <Sparkles size={15} color="#D97706" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-main)' }}>
                LIVE MODEL EXECUTION
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
              Validation of execution through Amazon Bedrock, as documented in my resume.
            </p>
            <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#B45309', fontWeight: 700 }}>
              • Bedrock Loops &amp; Guardrail Escalation
            </div>
          </div>
        </div>

        {/* Verification Footer Note */}
        <div
          style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            borderTop: '1px dashed #D1D5DB',
            paddingTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.35rem'
          }}
        >
          <span>
            Dedicated unit, integration, safety-gate, orchestrator, classroom-loop, and end-to-end test suites.
          </span>
          <span style={{ color: '#4B5563', fontWeight: 700 }}>
            * Software validation evidence; not an empirical claim of real-world teacher workload reduction.
          </span>
        </div>
      </div>
    </div>
  );
}
