import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  RotateCcw,
  ChevronsLeftRight,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Database,
  Lock,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface VetanamImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VetanamImpactModal: React.FC<VetanamImpactModalProps> = ({ isOpen, onClose }) => {
  // 100 = 100% BEFORE visible (divider at extreme right), 0 = 100% AFTER visible (divider at extreme left)
  const [splitPercent, setSplitPercent] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animStep, setAnimStep] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  // Stop any active animation safely
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

  // Stepped animation cycle for micro-interactions
  useEffect(() => {
    if (!isOpen) return;
    setAnimStep(0);
    const interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, 1800);

    return () => clearInterval(interval);
  }, [isOpen, replayKey]);

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

    const duration = 1400; // 1.4 seconds (within 1.2–1.6s range)
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));

      // Cubic ease-in-out curve for natural sweep
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Sweeps divider from 100% (far right) down to 0% (far left), revealing AFTER
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
      className="impact-modal-overlay"
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
        className="impact-modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '3px solid var(--border-dark)',
          borderRadius: '24px',
          boxShadow: '8px 8px 0px var(--border-dark)',
          maxWidth: '1120px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
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
          className="impact-icon-btn impact-close-btn"
          title="Close Impact Overlay (Esc)"
          aria-label="Close"
        >
          <X size={20} strokeWidth={3} color="var(--text-main)" />
        </button>

        {/* Header Block */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
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
              01 / PAYMENT RELIABILITY
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-muted)'
              }}
            >
              VETANAM DISTRIBUTED LEDGER · ARCHITECTURAL IMPACT
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              lineHeight: 1.25,
              margin: 0
            }}
          >
            Engineering Correctness Under Concurrency
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              margin: '0.35rem 0 0 0',
              lineHeight: 1.45
            }}
          >
            An interactive before-and-after analysis of how Vetanam prevents double-spends, race conditions, and ledger corruption.
          </p>
        </div>

        {/* 1. TOP TOOLBAR CONTROLS — Only [ Before ] [ After ] [ Replay ↻ ] */}
        <div
          className="impact-toolbar"
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

        {/* 2. INTERACTIVE COMPARISON AREA WITH SEPARATE, INDEPENDENTLY CLIPPED PANELS */}
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
            minHeight: '480px'
          }}
        >
          {/* BEFORE Panel (Left Side): Clipped from the right at (100 - splitPercent)% */}
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
            {renderBeforeContent(animStep, replayKey)}
          </div>

          {/* AFTER Panel (Right Side): Clipped from the left at splitPercent% */}
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
            {renderAfterContent(animStep, replayKey)}
          </div>

          {/* Draggable Vertical Divider Line */}
          <div
            className="comparison-divider"
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
              pointerEvents: isAnimating ? 'none' : 'auto',
              touchAction: 'none'
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
            {/* Circular Thumb (Clamped inside borders so it never gets clipped) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid var(--border-dark)',
                boxShadow: '2px 2px 0px var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAnimating ? 'wait' : 'ew-resize',
                touchAction: 'none',
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

        @media (max-width: 768px) {
          .impact-modal-overlay {
            padding: 0.5rem !important;
          }
          .impact-modal-card {
            padding: 1.15rem 0.85rem !important;
            border-radius: 18px !important;
            max-height: 94vh !important;
            gap: 0.85rem !important;
          }
          .impact-close-btn {
            top: 0.75rem !important;
            right: 0.75rem !important;
            width: 36px !important;
            height: 36px !important;
          }
          .comparison-container {
            min-height: 500px !important;
            height: min(540px, 60vh) !important;
            border-radius: 14px !important;
          }
          .comparison-panel {
            padding: 0.85rem 0.65rem !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .impact-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 0.65rem !important;
          }
          .toolbar-btn {
            min-height: 40px !important;
            padding: 0.4rem 0.75rem !important;
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 400px) {
          .impact-toolbar {
            padding: 0.5rem !important;
            gap: 0.4rem !important;
          }
          .toolbar-btn {
            padding: 0.35rem 0.55rem !important;
            font-size: 0.76rem !important;
          }
          .divider-thumb {
            width: 40px !important;
            height: 40px !important;
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
// Sub-render: BEFORE Panel Content (Failure Modes in Naive Systems)
// -------------------------------------------------------------
function renderBeforeContent(animStep: number, replayKey: number) {
  const activeRisk = animStep % 4;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Independent BEFORE Header */}
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
            01 / BEFORE · NAIVE EXECUTION
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#991B1B', fontWeight: 800 }}>
            UNCOORDINATED SYSTEM RISKS
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
            fontWeight: 900,
            color: '#7F1D1D',
            margin: 0,
            lineHeight: 1.3
          }}
        >
          What can go wrong when money moves concurrently?
        </h3>
        <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.825rem', color: '#991B1B', lineHeight: 1.4 }}>
          Potential failure modes in distributed transfers lacking idempotency, OCC locks, and transactional atomicity.
        </p>
      </div>

      {/* Interactive Simulation Grid of 4 Failure Modes */}
      <div
        className="impact-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '0.75rem'
        }}
        key={`before-grid-${replayKey}`}
      >
        {/* Risk 1: RACE CONDITION */}
        <div
          style={{
            backgroundColor: activeRisk === 0 ? '#FEF2F2' : '#FFFFFF',
            border: activeRisk === 0 ? '2.5px solid #991B1B' : '2px solid #DC2626',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeRisk === 0 ? '4px 4px 0px #991B1B' : '2.5px 2.5px 0px #991B1B',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #DC2626'
              }}
            >
              RACE CONDITION
            </span>
            <AlertTriangle size={15} color="#DC2626" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Uncoordinated Balance Read
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Two concurrent requests read Account balance ($100) simultaneously. Both deduct $80 without OCC locking, driving the final balance to <strong>-$60</strong> (Double-Spend).
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#FEF2F2',
              border: '1px dashed #DC2626',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#991B1B',
              fontWeight: 700
            }}
          >
            Req A ($80) &amp; Req B ($80) → Balance -$60 ⚠️
          </div>
        </div>

        {/* Risk 2: DUPLICATE RETRY */}
        <div
          style={{
            backgroundColor: activeRisk === 1 ? '#FEF2F2' : '#FFFFFF',
            border: activeRisk === 1 ? '2.5px solid #991B1B' : '2px solid #DC2626',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeRisk === 1 ? '4px 4px 0px #991B1B' : '2.5px 2.5px 0px #991B1B',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #DC2626'
              }}
            >
              DUPLICATE RETRY
            </span>
            <RefreshCw size={15} color="#DC2626" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Lack of Idempotency Tracking
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Client network glitch causes a 504 timeout; the client auto-retries. Without an <code>Idempotency-Key</code> cache, the transfer is debited a second time.
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#FEF2F2',
              border: '1px dashed #DC2626',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#991B1B',
              fontWeight: 700
            }}
          >
            Retry Treated as Fresh Transfer → Double Debit ⚠️
          </div>
        </div>

        {/* Risk 3: PARTIAL UPDATE RISK */}
        <div
          style={{
            backgroundColor: activeRisk === 2 ? '#FEF2F2' : '#FFFFFF',
            border: activeRisk === 2 ? '2.5px solid #991B1B' : '2px solid #DC2626',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeRisk === 2 ? '4px 4px 0px #991B1B' : '2.5px 2.5px 0px #991B1B',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #DC2626'
              }}
            >
              PARTIAL UPDATE RISK
            </span>
            <Database size={15} color="#DC2626" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Broken Invariant (Σ Debits ≠ Σ Credits)
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Sender is debited, but a database timeout or server crash aborts execution before the recipient is credited, leaving money in limbo.
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#FEF2F2',
              border: '1px dashed #DC2626',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#991B1B',
              fontWeight: 700
            }}
          >
            Debit Committed / Credit Lost → Σ Debits ≠ Σ Credits ⚠️
          </div>
        </div>

        {/* Risk 4: BLOCKING WORK */}
        <div
          style={{
            backgroundColor: activeRisk === 3 ? '#FEF2F2' : '#FFFFFF',
            border: activeRisk === 3 ? '2.5px solid #991B1B' : '2px solid #DC2626',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeRisk === 3 ? '4px 4px 0px #991B1B' : '2.5px 2.5px 0px #991B1B',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #DC2626'
              }}
            >
              BLOCKING WORK
            </span>
            <ShieldCheck size={15} color="#DC2626" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Synchronous Overhead in Hot Path
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Sending emails, generating PDF audit records, and firing webhooks synchronously inside the payment request thread pool causes high p95 latency spikes (&gt;2,500ms).
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#FEF2F2',
              border: '1px dashed #DC2626',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#991B1B',
              fontWeight: 700
            }}
          >
            HTTP Request Blocked on External Webhooks ⚠️
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Sub-render: AFTER Panel Content (Vetanam Production Architecture)
// -------------------------------------------------------------
function renderAfterContent(animStep: number, replayKey: number) {
  const activeStage = animStep % 4;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Independent AFTER Header */}
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
            01 / AFTER · VETANAM PRODUCTION ENGINE
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#047857', fontWeight: 800 }}>
            ZERO-DOUBLE-SPEND GUARANTEE
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
            fontWeight: 900,
            color: '#064E3B',
            margin: 0,
            lineHeight: 1.3
          }}
        >
          Correctness by design. Performance under concurrency.
        </h3>

        {/* Animated Pipeline Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexWrap: 'wrap',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            margin: '0.4rem 0 0.15rem 0'
          }}
        >
          <span
            style={{
              backgroundColor: activeStage === 0 ? 'var(--bg-yellow)' : '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              padding: '0.15rem 0.45rem',
              borderRadius: '5px',
              transition: 'var(--transition-tactile)'
            }}
          >
            1. Redis Key
          </span>
          <ArrowRight size={13} />
          <span
            style={{
              backgroundColor: activeStage === 1 ? '#BBF7D0' : '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              padding: '0.15rem 0.45rem',
              borderRadius: '5px',
              transition: 'var(--transition-tactile)'
            }}
          >
            2. OCC Version
          </span>
          <ArrowRight size={13} />
          <span
            style={{
              backgroundColor: activeStage === 2 ? '#FED7AA' : '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              padding: '0.15rem 0.45rem',
              borderRadius: '5px',
              transition: 'var(--transition-tactile)'
            }}
          >
            3. Atomic Mongo
          </span>
          <ArrowRight size={13} />
          <span
            style={{
              backgroundColor: activeStage === 3 ? '#DDD6FE' : '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              padding: '0.15rem 0.45rem',
              borderRadius: '5px',
              transition: 'var(--transition-tactile)'
            }}
          >
            4. BullMQ Queue
          </span>
        </div>
        <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.825rem', color: '#047857', lineHeight: 1.4 }}>
          Payment Request → Idempotency Check → Fraud Evaluation → Atomic Double-Entry Ledger → Asynchronous Workers
        </p>
      </div>

      {/* Pipeline Architecture Cards */}
      <div
        className="impact-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '0.75rem'
        }}
        key={`after-grid-${replayKey}`}
      >
        {/* 1. Idempotency — Redis */}
        <div
          style={{
            backgroundColor: activeStage === 0 ? '#F0FDF4' : '#FFFFFF',
            border: activeStage === 0 ? '2.5px solid #047857' : '2px solid #059669',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeStage === 0 ? '4px 4px 0px #047857' : '2.5px 2.5px 0px #047857',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#EDE9FE',
                color: '#6D28D9',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #6D28D9'
              }}
            >
              REDIS IDEMPOTENCY
            </span>
            <Zap size={15} color="#059669" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            24h TTL Key Locking
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Client provides an <code>Idempotency-Key</code>. Redis stores completed responses for 24h. Repeated retries receive the cached response; in-flight duplicates receive 409 Conflict.
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#ECFDF5',
              border: '1px solid #059669',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#065F46',
              fontWeight: 700
            }}
          >
            SET key NX EX 86400 → Cached Result Returned ✓
          </div>
        </div>

        {/* 2. Concurrency Control — OCC */}
        <div
          style={{
            backgroundColor: activeStage === 1 ? '#F0FDF4' : '#FFFFFF',
            border: activeStage === 1 ? '2.5px solid #047857' : '2px solid #059669',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeStage === 1 ? '4px 4px 0px #047857' : '2.5px 2.5px 0px #047857',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#DCFCE7',
                color: '#166534',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #166534'
              }}
            >
              OCC VERSION GUARD
            </span>
            <Lock size={15} color="#059669" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Optimistic Concurrency Control
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Account updates require <code>version: N</code>. If a concurrent transaction changes the version first, the second update fails the predicate and safely aborts.
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#ECFDF5',
              border: '1px solid #059669',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#065F46',
              fontWeight: 700
            }}
          >
            WHERE version = 4 → version 5 (Race Safely Aborted) ✓
          </div>
        </div>

        {/* 3. Financial Consistency — MongoDB Transactions */}
        <div
          style={{
            backgroundColor: activeStage === 2 ? '#F0FDF4' : '#FFFFFF',
            border: activeStage === 2 ? '2.5px solid #047857' : '2px solid #059669',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeStage === 2 ? '4px 4px 0px #047857' : '2.5px 2.5px 0px #047857',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #92400E'
              }}
            >
              DOUBLE-ENTRY MONGO
            </span>
            <Database size={15} color="#059669" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Atomic Balanced Ledger
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Debit and credit ledger entries are posted in an atomic session. Invariant verified: <strong>Σ Debits = Σ Credits</strong>. All sums stored as integer minor units (no float errors).
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#ECFDF5',
              border: '1px solid #059669',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#065F46',
              fontWeight: 700
            }}
          >
            Σ Debits (10,000) = Σ Credits (10,000) Minor Units ✓
          </div>
        </div>

        {/* 4. Fraud Evaluation & Async Workers */}
        <div
          style={{
            backgroundColor: activeStage === 3 ? '#F0FDF4' : '#FFFFFF',
            border: activeStage === 3 ? '2.5px solid #047857' : '2px solid #059669',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: activeStage === 3 ? '4px 4px 0px #047857' : '2.5px 2.5px 0px #047857',
            transition: 'var(--transition-tactile)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #059669'
              }}
            >
              BULLMQ + RULES
            </span>
            <ShieldCheck size={15} color="#059669" />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Deterministic Rules &amp; Async Queue
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.35 }}>
            Rule engine evaluates discrete outcomes: <code>ALLOW</code>, <code>FLAG</code>, <code>BLOCK</code>. Audit logs &amp; notifications offloaded to BullMQ background workers with retry/backoff.
          </p>
          <div
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#ECFDF5',
              border: '1px solid #059669',
              borderRadius: '6px',
              padding: '0.3rem 0.5rem',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: '#065F46',
              fontWeight: 700
            }}
          >
            Critical Path &lt;100ms · Audit in BullMQ Queue ✓
          </div>
        </div>
      </div>
    </div>
  );
}
