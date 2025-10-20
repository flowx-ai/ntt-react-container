import React from 'react';
import './Card.scss';

interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, children, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-description">{description}</p>}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};
