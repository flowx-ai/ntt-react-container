import React from 'react';
import './PageTemplate.scss';

interface PageTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ children, className }) => {
  return (
    <div className={`page-template ${className || ''}`}>
      {children}
    </div>
  );
};
