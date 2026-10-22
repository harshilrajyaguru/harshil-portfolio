import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lilac' | 'yellow' | 'green' | 'white';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lilac',
  className = '',
  icon
}) => {
  const variantClass = {
    lilac: 'neo-badge-lilac',
    yellow: 'neo-badge-yellow',
    green: 'neo-badge-green',
    white: 'neo-badge-white'
  }[variant];

  return (
    <span className={`neo-badge ${variantClass} ${className}`}>
      {icon && <span className="inline-flex items-center mr-0.5">{icon}</span>}
      {children}
    </span>
  );
};
