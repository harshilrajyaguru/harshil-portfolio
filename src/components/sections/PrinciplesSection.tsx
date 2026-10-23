import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Brain,
  CheckCircle2,
  Minimize2,
  Search,
  BookOpen,
  Users,
  Shield,
  Workflow,
  Zap,
  Lightbulb,
  Target,
  Terminal,
  MessageSquareQuote,
  TrendingUp,
  HeartHandshake,
  Globe,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export const PrinciplesSection: React.FC = () => {
  const { principles } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const lastAdvanceTimeRef = useRef<number>(Date.now());
  const isIntersectingRef = useRef(false);
  const lastResetTimeRef = useRef(0);

  // Drag and touch tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const dragDistanceRef = useRef(0);
  const wasDraggedRef = useRef(false);

  const total = principles.length;

  // Single reliable autoplay timer function that resets the 2,500ms countdown
  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    if (prefersReducedMotion) return;

    autoplayTimerRef.current = window.setTimeout(() => {
      if (isDraggingRef.current) {
        // Postpone if user is actively in the middle of dragging/swiping
        resetAutoplay();
        return;
      }
      lastAdvanceTimeRef.current = Date.now();
      setCurrentIndex((prev) => (prev + 1) % total);
      resetAutoplay();
    }, 2500);
  }, [prefersReducedMotion, total]);

  // Reset carousel to principle 01 / 16, first progress dot, and restart 2,500ms autoplay
  const resetToFirst = useCallback(
    (isManualScroll = false) => {
      const now = Date.now();
      // Avoid double-reset if navbar click and scroll observer fire in quick succession
      if (isManualScroll && now - lastResetTimeRef.current < 1200) {
        return;
      }
      lastResetTimeRef.current = now;
      setIsJumping(true);
      setCurrentIndex(0);
      lastAdvanceTimeRef.current = now;
      resetAutoplay();
      setTimeout(() => {
        setIsJumping(false);
      }, 60);
    },
    [resetAutoplay]
  );

  // Check reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Initialize and clean up autoplay timer on mount/unmount
  useEffect(() => {
    lastAdvanceTimeRef.current = Date.now();
    resetAutoplay();
    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [resetAutoplay]);

  // IntersectionObserver: reset to principle 01 / 16 whenever entering section from outside
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Transitioned from outside view into viewport
          if (!isIntersectingRef.current) {
            isIntersectingRef.current = true;
            resetToFirst(true);
          }
        } else {
          // Left viewport
          isIntersectingRef.current = false;
        }
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [resetToFirst]);

  // Listen for navbar clicks or custom events targeting #principles
  useEffect(() => {
    const handlePrinciplesClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#principles"]');
      if (target) {
        resetToFirst(false);
      }
    };

    const handleCustomReset = () => {
      resetToFirst(false);
    };

    document.addEventListener('click', handlePrinciplesClick);
    window.addEventListener('reset-principles-carousel', handleCustomReset);

    return () => {
      document.removeEventListener('click', handlePrinciplesClick);
      window.removeEventListener('reset-principles-carousel', handleCustomReset);
    };
  }, [resetToFirst]);

  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    lastAdvanceTimeRef.current = Date.now();
    setCurrentIndex((prev) => (prev + 1) % total);
    resetAutoplay();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 350);
  }, [total, resetAutoplay]);

  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    lastAdvanceTimeRef.current = Date.now();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resetAutoplay();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 350);
  }, [total, resetAutoplay]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === currentIndex || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      lastAdvanceTimeRef.current = Date.now();
      const isAdjacent =
        Math.abs(index - currentIndex) === 1 ||
        Math.abs(index - currentIndex) === total - 1;

      if (!isAdjacent) {
        setIsJumping(true);
        setCurrentIndex(index);
        resetAutoplay();
        setTimeout(() => {
          setIsJumping(false);
          isAnimatingRef.current = false;
        }, 50);
      } else {
        setCurrentIndex(index);
        resetAutoplay();
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 350);
      }
    },
    [currentIndex, total, resetAutoplay]
  );

  // Keyboard navigation when carousel is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleSelect(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleSelect(total - 1);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    dragDistanceRef.current = 0;
    wasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    const deltaX = e.clientX - startXRef.current;
    dragDistanceRef.current = deltaX;
    if (Math.abs(deltaX) > 8) {
      wasDraggedRef.current = true;
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    const deltaX = dragDistanceRef.current;
    isDraggingRef.current = false;

    if (deltaX < -45) {
      handleNext();
    } else if (deltaX > 45) {
      handlePrev();
    } else {
      resetAutoplay();
    }

    setTimeout(() => {
      wasDraggedRef.current = false;
      dragDistanceRef.current = 0;
      startXRef.current = null;
      startYRef.current = null;
    }, 100);
  };

  // Touch handlers (detects horizontal swipe while preserving normal vertical scrolling)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    dragDistanceRef.current = 0;
    wasDraggedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || startXRef.current === null || startYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    // If vertical movement dominates, relinquish to normal page scroll
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
      isDraggingRef.current = false;
      return;
    }

    dragDistanceRef.current = deltaX;
    if (Math.abs(deltaX) > 8) {
      wasDraggedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    const deltaX = dragDistanceRef.current;
    isDraggingRef.current = false;

    if (deltaX < -40) {
      handleNext();
    } else if (deltaX > 40) {
      handlePrev();
    } else {
      resetAutoplay();
    }

    setTimeout(() => {
      wasDraggedRef.current = false;
      dragDistanceRef.current = 0;
      startXRef.current = null;
      startYRef.current = null;
    }, 100);
  };

  // Card click: clicking neighbor cards navigates immediately
  const handleCardClick = (offset: number) => {
    if (wasDraggedRef.current) return;
    if (offset === -1) {
      handlePrev();
    } else if (offset === 1) {
      handleNext();
    }
  };

  // Calculate circular offset relative to active card
  const getCardOffset = (principleIndex: number, activeIndex: number, totalCount: number) => {
    let diff = principleIndex - activeIndex;
    while (diff > totalCount / 2) diff -= totalCount;
    while (diff < -totalCount / 2) diff += totalCount;
    return diff;
  };

  const renderIcon = (iconName: string) => {
    const iconProps = { size: 22, strokeWidth: 2.3, color: 'var(--text-main)' };
    switch (iconName) {
      case 'Brain':
        return <Brain {...iconProps} />;
      case 'CheckCircle2':
        return <CheckCircle2 {...iconProps} />;
      case 'Minimize2':
        return <Minimize2 {...iconProps} />;
      case 'Search':
        return <Search {...iconProps} />;
      case 'BookOpen':
        return <BookOpen {...iconProps} />;
      case 'Users':
        return <Users {...iconProps} />;
      case 'Shield':
        return <Shield {...iconProps} />;
      case 'Workflow':
        return <Workflow {...iconProps} />;
      case 'Zap':
        return <Zap {...iconProps} />;
      case 'Lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'Target':
        return <Target {...iconProps} />;
      case 'Terminal':
        return <Terminal {...iconProps} />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote {...iconProps} />;
      case 'TrendingUp':
        return <TrendingUp {...iconProps} />;
      case 'HeartHandshake':
        return <HeartHandshake {...iconProps} />;
      case 'Globe':
        return <Globe {...iconProps} />;
      default:
        return <Lightbulb {...iconProps} />;
    }
  };

  // Harmonious tile accents matching portfolio palette
  const getTileBg = (index: number) => {
    const cycle = Math.abs(index) % 4;
    switch (cycle) {
      case 0:
        return 'var(--bg-lilac)';
      case 1:
        return 'var(--bg-yellow)';
      case 2:
        return '#A7F3D0';
      case 3:
      default:
        return '#FDE047';
    }
  };

  return (
    <section
      id="principles"
      ref={sectionRef}
      style={{ padding: '3.75rem 0 4.25rem 0', overflow: 'hidden' }}
      aria-label="How I Think - Working principles"
    >
      <div className="content-container">
        {/* Centered section label with thin lines on either side */}
        <div className="section-divider" style={{ marginBottom: '0.75rem' }}>
          <h2 className="section-title">How I Think</h2>
        </div>

        {/* Section Subtitle */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            maxWidth: '520px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.5
          }}
        >
          A few things I try to bring to every problem.
        </p>

        {/* 3D Circular Carousel Outer Wrapper */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="How I Think carousel: animated 3D circular principles showcase"
          className="carousel-3d-wrapper"
        >
          {/* 3D Circular Stage with Perspective & Depth */}
          <div
            className="carousel-3d-stage"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {principles.map((principle, index) => {
              const offset = getCardOffset(index, currentIndex, total);
              let positionClass = 'card-pos-hidden';
              if (offset === 0) positionClass = 'card-pos-center';
              else if (offset === -1) positionClass = 'card-pos-prev';
              else if (offset === 1) positionClass = 'card-pos-next';
              else if (offset === -2) positionClass = 'card-pos-exit-left';
              else if (offset === 2) positionClass = 'card-pos-exit-right';

              const isPrevOrNext = offset === -1 || offset === 1;

              return (
                <div
                  key={principle.id}
                  className={`carousel-3d-card ${positionClass} ${
                    isJumping || prefersReducedMotion ? 'no-transition' : ''
                  }`}
                  onClick={() => handleCardClick(offset)}
                  role={offset === 0 ? 'article' : isPrevOrNext ? 'button' : undefined}
                  aria-roledescription="slide"
                  aria-label={
                    offset === 0
                      ? `Active principle ${principle.number}: ${principle.title}`
                      : offset === -1
                      ? `Previous principle ${principle.number}: ${principle.title}. Click or drag to activate.`
                      : offset === 1
                      ? `Next principle ${principle.number}: ${principle.title}. Click or drag to activate.`
                      : undefined
                  }
                  aria-hidden={offset !== 0}
                  tabIndex={offset === 0 ? 0 : -1}
                >
                  {/* 1. Top Row: Small Icon Tile & Principle Counter Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem'
                    }}
                  >
                    {/* Small Icon Tile */}
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: getTileBg(index),
                        border: '2px solid var(--border-dark)',
                        boxShadow: '2px 2px 0px var(--border-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {renderIcon(principle.icon)}
                    </div>

                    {/* Principle Counter: 01 / 16 */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        backgroundColor: '#F3F4F6',
                        border: '1.5px solid var(--border-dark)',
                        borderRadius: '9999px',
                        boxShadow: '2px 2px 0px var(--border-dark)',
                        padding: '0.25rem 0.65rem',
                        color: 'var(--text-main)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {principle.number} / {total < 10 ? `0${total}` : total}
                    </div>
                  </div>

                  {/* 2 & 3. Title and Description */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Principle Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.38rem',
                        fontWeight: 900,
                        color: 'var(--text-main)',
                        lineHeight: 1.25,
                        margin: '0 0 0.85rem 0',
                        letterSpacing: '-0.015em'
                      }}
                    >
                      {principle.title}
                    </h3>

                    {/* Principle Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.96rem',
                        lineHeight: 1.6,
                        color: '#374151',
                        margin: 0,
                        fontWeight: 500
                      }}
                    >
                      {principle.description}
                    </p>
                  </div>

                  {/* Subtle bottom indicator accent line */}
                  <div
                    style={{
                      marginTop: '1.25rem',
                      height: '3px',
                      width: '32px',
                      backgroundColor: 'var(--border-dark)',
                      borderRadius: '2px',
                      opacity: 0.2
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Circular Left Arrow, Counter Badge, Circular Right Arrow */}
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 0.5rem'
            }}
          >
            {/* Left Circular Arrow Button */}
            <button
              onClick={handlePrev}
              className="carousel-arrow-btn"
              aria-label="Previous principle"
              title="Previous principle (Left Arrow key)"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Sequence Status Label */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--border-dark)',
                borderRadius: '10px',
                boxShadow: '2px 2px 0px var(--border-dark)',
                padding: '0.35rem 0.8rem',
                userSelect: 'none'
              }}
            >
              {principles[currentIndex].number} of {total}
            </div>

            {/* Right Circular Arrow Button */}
            <button
              onClick={handleNext}
              className="carousel-arrow-btn"
              aria-label="Next principle"
              title="Next principle (Right Arrow key)"
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* 16 Progress Indicators (Compact Clickable Dots) */}
          <div
            role="tablist"
            aria-label="Principle indicator dots"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.35rem',
              width: '100%',
              maxWidth: '380px',
              padding: '0 0.5rem'
            }}
          >
            {principles.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to principle ${p.number}: ${p.title}`}
                  onClick={() => handleSelect(idx)}
                  className="carousel-dot"
                  style={{
                    width: isActive ? '20px' : '7px',
                    height: '7px',
                    borderRadius: isActive ? '4px' : '50%',
                    backgroundColor: isActive ? 'var(--bg-yellow)' : '#FFFFFF',
                    border: '1.5px solid var(--border-dark)',
                    boxShadow: isActive ? '1.5px 1.5px 0px var(--border-dark)' : '1px 1px 0px var(--border-dark)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Scoped CSS for 3D Circular Coverflow Carousel */}
      <style>{`
        /* Responsive design tokens for 3D circular carousel scoped to section */
        #principles {
          --hi-card-width: 360px;
          --hi-offset-x: 255px;
          --hi-rot-y: 14deg;
          --hi-scale: 0.82;
          --hi-opacity: 0.65;
          --hi-blur: 2px;
        }

        @media (max-width: 860px) {
          #principles {
            --hi-card-width: 330px;
            --hi-offset-x: 215px;
            --hi-rot-y: 12deg;
            --hi-scale: 0.80;
            --hi-opacity: 0.6;
            --hi-blur: 2px;
          }
        }

        @media (max-width: 600px) {
          #principles {
            --hi-card-width: min(300px, 78vw);
            --hi-offset-x: min(130px, 32vw);
            --hi-rot-y: 8deg;
            --hi-scale: 0.78;
            --hi-opacity: 0.45;
            --hi-blur: 2.5px;
          }
        }

        @media (max-width: 380px) {
          #principles {
            --hi-card-width: min(260px, 80vw);
            --hi-offset-x: 80px;
            --hi-rot-y: 6deg;
            --hi-scale: 0.74;
            --hi-opacity: 0.4;
            --hi-blur: 2.5px;
          }
        }

        .carousel-3d-wrapper {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          position: relative;
        }

        .carousel-3d-wrapper:focus-visible .card-pos-center {
          outline: 3px solid var(--bg-yellow);
          outline-offset: 4px;
        }

        .carousel-3d-stage {
          perspective: 1100px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 395px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          touch-action: pan-y;
          cursor: grab;
        }

        .carousel-3d-stage:active {
          cursor: grabbing;
        }

        /* 3D Principles Flashcard */
        .carousel-3d-card {
          position: absolute;
          top: 0;
          left: 50%;
          width: var(--hi-card-width);
          height: 100%;
          max-height: 385px;
          margin-left: calc(-1 * var(--hi-card-width) / 2);
          background-color: #FFFFFF;
          border: 2.5px solid var(--border-dark);
          border-radius: 22px;
          padding: 1.75rem 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform-origin: 50% 50%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          box-sizing: border-box;
          will-change: transform, opacity, filter, box-shadow;
          transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 380ms cubic-bezier(0.22, 1, 0.36, 1),
                      filter 380ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* 1. Center Card: In Focus, 100% Scale, Sharp */
        .card-pos-center {
          transform: translateX(0px) translateZ(0px) rotateY(0deg) scale(1);
          opacity: 1;
          filter: blur(0px);
          z-index: 10;
          pointer-events: auto;
          visibility: visible;
          box-shadow: 6px 6px 0px var(--border-dark);
          cursor: default;
        }

        /* 2. Previous Card: Left Preview, Curved 3D perspective */
        .card-pos-prev {
          transform: translateX(calc(-1 * var(--hi-offset-x))) translateZ(-60px) rotateY(var(--hi-rot-y)) scale(var(--hi-scale));
          opacity: var(--hi-opacity);
          filter: blur(var(--hi-blur));
          z-index: 5;
          pointer-events: auto;
          visibility: visible;
          box-shadow: 3.5px 3.5px 0px var(--border-dark);
          cursor: pointer;
        }

        .card-pos-prev:hover {
          opacity: 0.85;
          filter: blur(0.8px);
        }

        /* 3. Next Card: Right Preview, Curved 3D perspective */
        .card-pos-next {
          transform: translateX(calc(1 * var(--hi-offset-x))) translateZ(-60px) rotateY(calc(-1 * var(--hi-rot-y))) scale(var(--hi-scale));
          opacity: var(--hi-opacity);
          filter: blur(var(--hi-blur));
          z-index: 5;
          pointer-events: auto;
          visibility: visible;
          box-shadow: 3.5px 3.5px 0px var(--border-dark);
          cursor: pointer;
        }

        .card-pos-next:hover {
          opacity: 0.85;
          filter: blur(0.8px);
        }

        /* 4. Left Exit / Buffer */
        .card-pos-exit-left {
          transform: translateX(calc(-1.8 * var(--hi-offset-x))) translateZ(-130px) rotateY(calc(1.4 * var(--hi-rot-y))) scale(0.68);
          opacity: 0;
          filter: blur(4px);
          z-index: 1;
          pointer-events: none;
          visibility: hidden;
          box-shadow: 2px 2px 0px var(--border-dark);
        }

        /* 5. Right Exit / Buffer */
        .card-pos-exit-right {
          transform: translateX(calc(1.8 * var(--hi-offset-x))) translateZ(-130px) rotateY(calc(-1.4 * var(--hi-rot-y))) scale(0.68);
          opacity: 0;
          filter: blur(4px);
          z-index: 1;
          pointer-events: none;
          visibility: hidden;
          box-shadow: 2px 2px 0px var(--border-dark);
        }

        /* All other 11 cards */
        .card-pos-hidden {
          display: none !important;
        }

        .carousel-3d-card.no-transition {
          transition: none !important;
        }

        /* Navigation Buttons */
        .carousel-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2.5px solid var(--border-dark);
          background-color: #FFFFFF;
          box-shadow: 2.5px 2.5px 0px var(--border-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          cursor: pointer;
          transition: var(--transition-tactile);
          user-select: none;
        }

        .carousel-arrow-btn:hover {
          background-color: var(--bg-yellow);
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px var(--border-dark);
        }

        .carousel-arrow-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0px var(--border-dark);
        }

        .carousel-arrow-btn:focus-visible {
          outline: 3px solid var(--bg-yellow);
          outline-offset: 3px;
        }

        .carousel-dot:hover {
          background-color: var(--bg-lilac) !important;
          transform: scale(1.2);
        }

        .carousel-dot:focus-visible {
          outline: 2px solid var(--bg-yellow);
          outline-offset: 2px;
        }

        @media (max-width: 600px) {
          #principles {
            padding: 2.75rem 0 3.25rem 0 !important;
          }
          .carousel-3d-stage {
            height: 380px !important;
          }
          .carousel-3d-card {
            padding: 1.35rem 1.25rem !important;
            border-radius: 18px !important;
          }
          .carousel-3d-card h3 {
            font-size: 1.2rem !important;
            margin-bottom: 0.65rem !important;
          }
          .carousel-3d-card p {
            font-size: 0.88rem !important;
            line-height: 1.52 !important;
          }
        }

        @media (max-width: 380px) {
          .carousel-3d-stage {
            height: 365px !important;
          }
          .carousel-3d-card {
            padding: 1.15rem 1rem !important;
          }
          .carousel-3d-card h3 {
            font-size: 1.12rem !important;
          }
          .carousel-3d-card p {
            font-size: 0.825rem !important;
            line-height: 1.45 !important;
          }
          .carousel-dot {
            height: 5px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-3d-card {
            transition: none !important;
          }
          .carousel-arrow-btn:hover {
            transform: none !important;
          }
          .carousel-dot {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
