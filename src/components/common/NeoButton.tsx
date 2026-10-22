import React from 'react';

interface NeoButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'lilac' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
  download?: string | boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  external = false,
  download,
  disabled = false,
  type = 'button',
  title
}) => {
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm sm:text-base py-2.5 px-5',
    lg: 'text-base sm:text-lg py-3.5 px-7'
  };

  const variantClass = {
    primary: 'neo-btn-primary',
    secondary: 'neo-btn-secondary',
    lilac: 'neo-btn-lilac',
    ghost: 'neo-btn-ghost'
  }[variant];

  const content = (
    <>
      {children}
      {icon && <span className="inline-flex items-center ml-1">{icon}</span>}
    </>
  );

  const combinedClass = `neo-btn ${variantClass} ${sizeStyles[size]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;

  const isExternal = !download && (external || href?.startsWith('http'));

  if (href && !disabled) {
    return (
      <a
        href={href}
        download={download}
        onClick={disabled ? undefined : onClick}
        className={combinedClass}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        title={title}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={combinedClass}
      disabled={disabled}
      title={title}
    >
      {content}
    </button>
  );
};
