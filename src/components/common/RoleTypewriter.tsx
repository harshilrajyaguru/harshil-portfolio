import React, { useState, useEffect } from 'react';

const ROLES = [
  'SOFTWARE ENGINEER',
  'AI ENGINEER',
  'FULL STACK ENGINEER',
  'BACKEND DEV',
  'API DESIGNER',
  'TESTER'
];

const TYPING_SPEED = 75; // ms per character typed
const DELETING_SPEED = 40; // ms per character deleted
const PAUSE_AFTER_COMPLETE = 1000; // ms to pause after typing a full role
const PAUSE_BEFORE_NEXT = 250; // ms to pause after deleting before next role

export const RoleTypewriter: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check and respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Continuous typewriter animation cycle
  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        // Typing phase: add one letter
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, TYPING_SPEED);
      } else {
        // Completed role: pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_COMPLETE);
      }
    } else {
      if (charIndex > 0) {
        // Deleting phase: remove one letter
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, DELETING_SPEED);
      } else {
        // Erased: pause briefly, then cycle to next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, PAUSE_BEFORE_NEXT);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, prefersReducedMotion]);

  const currentRole = ROLES[roleIndex];
  const displayedText = prefersReducedMotion ? ROLES[0] : currentRole.slice(0, charIndex);

  return (
    <div
      className="role-typewriter-container"
      role="status"
      aria-live="polite"
      aria-label={`$ role = "${displayedText}"`}
    >
      <div className="role-typewriter-wrapper">
        <span className="role-syntax-prefix">$ role = &quot;</span>
        <span className="role-typewriter-text">{displayedText}</span>
        {!prefersReducedMotion && (
          <span className="role-typewriter-caret" aria-hidden="true">
            |
          </span>
        )}
        <span className="role-syntax-suffix">&quot;</span>
      </div>

      <style>{`
        .role-typewriter-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 1.35rem 0 0.15rem 0;
          text-align: center;
          user-select: none;
        }

        .role-typewriter-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 295px; /* Reserves space for '$ role = "FULL STACK ENGINEER|"' to prevent layout shifts */
          height: 28px;
          font-family: var(--font-mono, monospace);
          font-size: 0.86rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted, #64748B);
          white-space: nowrap;
        }

        .role-syntax-prefix,
        .role-syntax-suffix {
          color: var(--text-muted, #64748B);
          opacity: 0.95;
        }

        .role-typewriter-text {
          white-space: nowrap;
          color: var(--text-muted, #64748B);
        }

        .role-typewriter-caret {
          display: inline-block;
          margin-left: 1px;
          color: var(--text-main, #121826);
          font-weight: 900;
          animation: typewriterCaretBlink 0.85s infinite;
          line-height: 1;
        }

        @keyframes typewriterCaretBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .role-typewriter-container {
            margin: 0.9rem 0 0.1rem 0;
          }
          .role-typewriter-wrapper {
            font-size: 0.76rem;
            min-width: 260px;
            letter-spacing: 0.05em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .role-typewriter-caret {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
