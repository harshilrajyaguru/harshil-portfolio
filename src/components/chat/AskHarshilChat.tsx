import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  AlertCircle
} from 'lucide-react';

import { portfolioData } from '../../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

const SUGGESTED_QUESTIONS = [
  {
    id: 'suggested-about',
    label: 'Tell me about Harshil',
    type: 'query' as const,
    query: 'Tell me about Harshil'
  },
  {
    id: 'suggested-projects',
    label: 'Tell me about projects',
    type: 'query' as const,
    query: 'Tell me about projects'
  },
  {
    id: 'suggested-resume',
    label: 'Download resume',
    type: 'download' as const
  }
];

const INITIAL_GREETING: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  content: "Hey! What would you like to know about Harshil's work?"
};

export const AskHarshilChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      textareaRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  // Escape key closes panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message to server-side Gemini endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newUserMessage: ChatMessage = { id: userMsgId, role: 'user', content: query };

    const updatedHistory = [...messages, newUserMessage];
    setMessages(updatedHistory);
    setInputValue('');
    setIsLoading(true);
    setLastFailedMessage(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: updatedHistory
            .filter((m) => !m.isError)
            .map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Service unavailable');
      }

      const data = await response.json();
      const assistantReply =
        data.reply || 'I was unable to find an answer for that. Please try rephrasing your question.';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: assistantReply
        }
      ]);
    } catch {
      setLastFailedMessage(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Chat is temporarily unavailable. Please try again later.',
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputValue('');
    setLastFailedMessage(null);
    textareaRef.current?.focus();
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      setMessages((prev) => prev.filter((m) => !m.isError));
      handleSendMessage(lastFailedMessage);
    }
  };

  // URL to clean display label mapping
  const getCleanLinkLabel = (url: string, explicitLabel?: string): string => {
    if (explicitLabel && !explicitLabel.startsWith('http') && !explicitLabel.startsWith('<http')) {
      return explicitLabel;
    }
    const clean = url.replace(/[<>]/g, '').trim().toLowerCase();
    if (clean.includes('harshil_rajyaguru_resume.pdf') || clean.includes('harshil_resume.pdf') || clean.includes('resume')) return "Download Harshil's Resume";
    if (clean.includes('github.com/harshilrajyaguru/vetanam')) return 'Vetanam Source Code';
    if (clean.includes('vetanam-payment-ledger.vercel.app')) return 'Vetanam Live Demo';
    if (clean.includes('github.com/harshilrajyaguru/saarthi')) return 'Saarthi Source Code';
    if (clean.includes('saarthi-harshil15.vercel.app')) return 'Saarthi Live Demo';
    if (clean.includes('github.com/harshilrajyaguru')) return 'GitHub';
    if (clean.includes('linkedin.com')) return 'LinkedIn';
    if (clean.includes('leetcode.com')) return 'LeetCode';
    if (clean.includes('mail.google.com') || clean.includes('mailto:')) return 'Email Harshil';

    if (explicitLabel) return explicitLabel;
    try {
      const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      return u.hostname + (u.pathname !== '/' ? u.pathname : '');
    } catch {
      return url;
    }
  };

  const renderLink = (url: string, label?: string, key?: string | number) => {
    let cleanUrl = url.trim();

    // Ensure resume links resolve to portfolio's configured download asset
    if (cleanUrl.includes('/files/Harshil_Rajyaguru_Resume.pdf') || cleanUrl.includes('/files/Harshil_Resume.pdf')) {
      cleanUrl = '/files/Harshil_Rajyaguru_Resume.pdf';
    }

    const displayLabel = getCleanLinkLabel(cleanUrl, label);
    const isHireCta = displayLabel.toLowerCase().includes('hire harshil');
    const isResume = cleanUrl.toLowerCase().includes('resume') || cleanUrl.toLowerCase().endsWith('.pdf');

    if (isHireCta) {
      return (
        <a
          key={key}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-hire-cta-btn"
          title="Send email to Harshil"
        >
          <span>💼</span>
          <span>{displayLabel}</span>
        </a>
      );
    }

    if (isResume) {
      return (
        <a
          key={key}
          href={cleanUrl}
          download="Harshil_Rajyaguru_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-markdown-link"
          title="Download Harshil's Resume"
        >
          {displayLabel}
        </a>
      );
    }

    return (
      <a
        key={key}
        href={cleanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="chat-markdown-link"
        title={`Open ${cleanUrl}`}
      >
        {displayLabel}
      </a>
    );
  };

  const formatInline = (text: string) => {
    if (!text) return null;

    // Convert raw angle bracket URLs like <https://...> or </files/...> to standard markdown [url](url)
    const normalized = text.replace(/<((?:https?:\/\/|mailto:|\/)[^\s>]+)>/g, (_match, url) => {
      return `[${url}](${url})`;
    });

    // Match Markdown link [label](url), inline code `code`, bold **text**, and bare URLs
    // Using \s* to trim any spaces inside parentheses of [label]( url )
    const regex = /(\[([^\]]+)\]\(\s*([^)\s]+)\s*\)|`([^`]+)`|\*\*([^*]+)\*\*|((?:https?:\/\/|mailto:)[^\s<>"'\)\]]+))/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(normalized)) !== null) {
      if (match.index > lastIndex) {
        elements.push(normalized.substring(lastIndex, match.index));
      }

      const key = `el-${match.index}`;

      if (match[2] && match[3]) {
        // Markdown link: [label](url)
        elements.push(renderLink(match[3], match[2], key));
      } else if (match[4]) {
        // Inline code: `code`
        elements.push(
          <code
            key={key}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              backgroundColor: 'rgba(0,0,0,0.06)',
              padding: '0.08rem 0.3rem',
              borderRadius: '4px',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            {match[4]}
          </code>
        );
      } else if (match[5]) {
        // Bold: **text**
        elements.push(
          <strong key={key} style={{ color: 'var(--text-main)', fontWeight: 800 }}>
            {match[5]}
          </strong>
        );
      } else if (match[6]) {
        // Bare URL: strip trailing punctuation like . , ; !
        let url = match[6];
        let trailingPunct = '';
        const punctMatch = url.match(/[.,;!]+$/);
        if (punctMatch) {
          trailingPunct = punctMatch[0];
          url = url.slice(0, -trailingPunct.length);
        }
        elements.push(renderLink(url, undefined, key));
        if (trailingPunct) {
          elements.push(trailingPunct);
        }
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < normalized.length) {
      elements.push(normalized.substring(lastIndex));
    }

    return elements;
  };

  // Safe, structured Markdown formatting helper for links, lists, code, bold, and headings
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return lines.map((line, lineIdx) => {
      // 1. Horizontal Rules
      if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
        return (
          <hr
            key={lineIdx}
            style={{
              border: 'none',
              borderTop: '1px solid rgba(0,0,0,0.12)',
              margin: '0.45rem 0'
            }}
          />
        );
      }

      // 2. Headings
      if (line.trim().startsWith('### ')) {
        const headingText = line.trim().replace(/^###\s+/, '');
        return (
          <h4
            key={lineIdx}
            style={{
              fontSize: '0.86rem',
              fontWeight: 800,
              margin: '0.45rem 0 0.2rem 0',
              color: 'var(--text-main)',
              lineHeight: 1.3
            }}
          >
            {formatInline(headingText)}
          </h4>
        );
      }

      if (line.trim().startsWith('## ') || line.trim().startsWith('# ')) {
        const headingText = line.trim().replace(/^#{1,2}\s+/, '');
        return (
          <h3
            key={lineIdx}
            style={{
              fontSize: '0.92rem',
              fontWeight: 900,
              margin: '0.5rem 0 0.25rem 0',
              color: 'var(--text-main)',
              lineHeight: 1.3
            }}
          >
            {formatInline(headingText)}
          </h3>
        );
      }

      // 3. Bullet lists
      const isBullet =
        line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ');
      const cleanBullet = isBullet ? line.trim().replace(/^[-*•]\s+/, '') : '';

      // 4. Numbered lists: 1. Item, 2. Item
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);

      if (isBullet) {
        return (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.35rem',
              marginTop: '0.2rem',
              lineHeight: 1.42
            }}
          >
            <span style={{ color: '#059669', fontWeight: 900, lineHeight: 1.25 }}>•</span>
            <span style={{ flex: 1 }}>{formatInline(cleanBullet)}</span>
          </div>
        );
      }

      if (numberedMatch) {
        return (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.35rem',
              marginTop: '0.2rem',
              lineHeight: 1.42
            }}
          >
            <span
              style={{
                color: '#4F46E5',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 800,
                lineHeight: 1.4
              }}
            >
              {numberedMatch[1]}.
            </span>
            <span style={{ flex: 1 }}>{formatInline(numberedMatch[2])}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={lineIdx} style={{ height: '0.35rem' }} />;
      }

      return (
        <p key={lineIdx} style={{ margin: '0 0 0.28rem 0', lineHeight: 1.42 }}>
          {formatInline(line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9998
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="talk-launcher-btn"
          style={{
            height: '46px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0 0.9rem',
            backgroundColor: 'var(--bg-yellow)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 800,
            border: '2px solid var(--border-dark)',
            borderRadius: '16px',
            boxShadow: '3px 3px 0px var(--border-dark)',
            cursor: 'pointer',
            transition: 'var(--transition-tactile)',
            userSelect: 'none'
          }}
          title="Talk with Harshil"
          aria-label="Talk with Harshil"
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Bot size={13} strokeWidth={2.4} color="var(--text-main)" />
          </div>
          <span>Talk with Harshil</span>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '1px solid var(--border-dark)',
              display: 'inline-block'
            }}
            title="Online"
          />
        </button>
      </div>

      {/* Compact Chat Panel */}
      {isOpen && (
        <div
          className="talk-panel"
          style={{
            position: 'fixed',
            bottom: '76px',
            right: '20px',
            width: '360px',
            maxWidth: 'calc(100vw - 24px)',
            height: '490px',
            maxHeight: 'calc(100dvh - 100px)',
            backgroundColor: '#FFFFFF',
            border: '2.5px solid var(--border-dark)',
            borderRadius: '18px',
            boxShadow: '4px 4px 0px var(--border-dark)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatPanelPop 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          role="dialog"
          aria-label="Talk with Harshil"
        >
          {/* Header */}
          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-canvas)',
              borderBottom: '2px solid var(--border-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-yellow)',
                  border: '1.5px solid var(--border-dark)',
                  boxShadow: '1px 1px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Bot size={16} strokeWidth={2.4} color="var(--text-main)" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 900,
                    color: 'var(--text-main)',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  Talk with Harshil
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  Ask me about my work, projects, and technical decisions.
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handleNewChat}
                className="chat-action-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--border-dark)',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  boxShadow: '1px 1px 0px var(--border-dark)'
                }}
                title="Start a new chat"
              >
                <RotateCcw size={11} strokeWidth={2.4} />
                <span>New</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chat-action-btn"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-lilac)',
                  border: '1.5px solid var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0px var(--border-dark)'
                }}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={14} strokeWidth={2.4} color="var(--text-main)" />
              </button>
            </div>
          </div>

          {/* Scrollable Conversation Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              backgroundColor: '#FAFAF9'
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.35rem',
                      flexDirection: isUser ? 'row-reverse' : 'row',
                      maxWidth: '92%'
                    }}
                  >
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        backgroundColor: isUser ? 'var(--bg-lilac)' : '#A7F3D0',
                        border: '1.5px solid var(--border-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      {isUser ? (
                        <User size={12} color="var(--text-main)" />
                      ) : (
                        <Bot size={12} color="var(--text-main)" />
                      )}
                    </div>

                    <div
                      style={{
                        backgroundColor: isUser
                          ? 'var(--bg-lilac)'
                          : msg.isError
                          ? '#FEF2F2'
                          : '#FFFFFF',
                        border: isUser
                          ? '1.5px solid var(--border-dark)'
                          : msg.isError
                          ? '1.5px solid #DC2626'
                          : '1.5px solid var(--border-dark)',
                        borderRadius: isUser ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                        boxShadow: '1.5px 1.5px 0px var(--border-dark)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.8rem',
                        color: 'var(--text-main)',
                        lineHeight: 1.4,
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.isError ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#B91C1C', fontWeight: 800 }}>
                            <AlertCircle size={14} color="#DC2626" />
                            <span>Unavailable</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: '#7F1D1D' }}>{msg.content}</p>
                          {lastFailedMessage && (
                            <button
                              type="button"
                              onClick={handleRetry}
                              style={{
                                alignSelf: 'flex-start',
                                marginTop: '0.15rem',
                                padding: '0.2rem 0.5rem',
                                backgroundColor: '#FFFFFF',
                                border: '1.5px solid #DC2626',
                                borderRadius: '5px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#B91C1C',
                                cursor: 'pointer'
                              }}
                            >
                              Retry
                            </button>
                          )}
                        </div>
                      ) : (
                        renderFormattedContent(msg.content)
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Subtle Typing Indicator */}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    backgroundColor: '#A7F3D0',
                    border: '1.5px solid var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Bot size={12} color="var(--text-main)" />
                </div>
                <div
                  style={{
                    backgroundColor: '#F0FDF4',
                    border: '1.5px solid #059669',
                    borderRadius: '12px 12px 12px 3px',
                    padding: '0.45rem 0.7rem',
                    boxShadow: '1.5px 1.5px 0px var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span className="talk-dot" style={{ animationDelay: '0ms' }} />
                  <span className="talk-dot" style={{ animationDelay: '200ms' }} />
                  <span className="talk-dot" style={{ animationDelay: '400ms' }} />
                  <span style={{ fontSize: '0.7rem', color: '#065F46', marginLeft: '0.25rem', fontWeight: 700 }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Suggested Starter Questions: Only visible when chat is empty */}
            {messages.length <= 1 && !isLoading && (
              <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div
                  style={{
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  <Sparkles size={11} color="#D97706" />
                  <span>SUGGESTED QUESTIONS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {SUGGESTED_QUESTIONS.map((item) => {
                    if (item.type === 'download') {
                      return (
                        <a
                          key={item.id}
                          href={portfolioData.personal.resumeUrl}
                          download={portfolioData.personal.resumeFilename}
                          className="talk-chip-btn"
                          role="button"
                          tabIndex={0}
                          style={{
                            display: 'block',
                            backgroundColor: '#FFFFFF',
                            border: '1.5px solid var(--border-dark)',
                            borderRadius: '8px',
                            padding: '0.35rem 0.6rem',
                            fontSize: '0.74rem',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            color: 'var(--text-main)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            textDecoration: 'none',
                            boxShadow: '1.5px 1.5px 0px var(--border-dark)',
                            transition: 'var(--transition-tactile)'
                          }}
                          title="Download Harshil's Resume PDF"
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Spacebar') {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }}
                        >
                          {item.label}
                        </a>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSendMessage(item.query)}
                        className="talk-chip-btn"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid var(--border-dark)',
                          borderRadius: '8px',
                          padding: '0.35rem 0.6rem',
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          boxShadow: '1.5px 1.5px 0px var(--border-dark)',
                          transition: 'var(--transition-tactile)'
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Input Area */}
          <div
            style={{
              padding: '0.55rem 0.7rem',
              backgroundColor: '#FFFFFF',
              borderTop: '2px solid var(--border-dark)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Harshil's work..."
                rows={1}
                disabled={isLoading}
                style={{
                  flex: 1,
                  resize: 'none',
                  minHeight: '36px',
                  maxHeight: '75px',
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--border-dark)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  backgroundColor: isLoading ? '#F3F4F6' : '#FFFFFF'
                }}
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="talk-send-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: !inputValue.trim() || isLoading ? '#E5E7EB' : 'var(--bg-yellow)',
                  border: '1.5px solid var(--border-dark)',
                  boxShadow: !inputValue.trim() || isLoading ? 'none' : '2px 2px 0px var(--border-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition-tactile)',
                  flexShrink: 0
                }}
                title="Send (Enter)"
                aria-label="Send"
              >
                <Send size={15} strokeWidth={2.4} color="var(--text-main)" />
              </button>
            </div>

            <div
              style={{
                fontSize: '0.62rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center'
              }}
            >
              <strong>Enter</strong> to send · <strong>Shift+Enter</strong> newline
            </div>
          </div>
        </div>
      )}

      {/* Embedded Styles */}
      <style>{`
        @keyframes chatPanelPop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .talk-launcher-btn:hover {
          transform: translate(-1.5px, -1.5px);
          box-shadow: 4.5px 4.5px 0px var(--border-dark) !important;
          background-color: var(--bg-yellow-hover) !important;
        }
        .talk-launcher-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1.5px 1.5px 0px var(--border-dark) !important;
        }

        .talk-chip-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 2px 2px 0px var(--border-dark) !important;
          background-color: var(--bg-lilac) !important;
        }
        .talk-chip-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 0.5px 0.5px 0px var(--border-dark) !important;
        }

        .chat-action-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 2px 2px 0px var(--border-dark) !important;
        }
        .chat-action-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 0.5px 0.5px 0px var(--border-dark) !important;
        }

        .talk-send-btn:hover:not(:disabled) {
          transform: translate(-1px, -1px);
          box-shadow: 2.5px 2.5px 0px var(--border-dark) !important;
        }
        .talk-send-btn:active:not(:disabled) {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px var(--border-dark) !important;
        }

        .chat-markdown-link {
          color: #4F46E5 !important;
          font-weight: 700 !important;
          text-decoration: underline !important;
          text-underline-offset: 2.5px !important;
          word-break: break-word !important;
          transition: all 0.15s ease !important;
        }
        .chat-markdown-link:hover {
          color: #3730A3 !important;
          text-decoration-thickness: 2px !important;
          background-color: rgba(79, 70, 229, 0.08) !important;
          border-radius: 2px !important;
        }

        .chat-hire-cta-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.35rem !important;
          padding: 0.22rem 0.6rem !important;
          margin: 0.15rem 0.15rem !important;
          background-color: var(--bg-yellow) !important;
          color: var(--text-main) !important;
          border: 1.5px solid var(--border-dark) !important;
          border-radius: 8px !important;
          box-shadow: 1.5px 1.5px 0px var(--border-dark) !important;
          font-weight: 800 !important;
          font-size: 0.76rem !important;
          text-decoration: none !important;
          cursor: pointer !important;
          vertical-align: middle !important;
          transition: all 0.12s ease !important;
        }
        .chat-hire-cta-btn:hover {
          transform: translate(-1px, -1px) !important;
          box-shadow: 2.5px 2.5px 0px var(--border-dark) !important;
          background-color: var(--bg-yellow-hover) !important;
        }
        .chat-hire-cta-btn:active {
          transform: translate(1px, 1px) !important;
          box-shadow: 0.5px 0.5px 0px var(--border-dark) !important;
        }

        .talk-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #059669;
          animation: talkBounce 1.2s infinite ease-in-out;
        }

        @keyframes talkBounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
        }

        @media (max-width: 480px) {
          .talk-panel {
            width: calc(100vw - 24px) !important;
            right: 12px !important;
            bottom: 74px !important;
            max-height: calc(100dvh - 90px) !important;
            height: calc(100dvh - 90px) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .talk-panel, .talk-dot {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export const TalkWithHarshilChat = AskHarshilChat;
export default AskHarshilChat;
