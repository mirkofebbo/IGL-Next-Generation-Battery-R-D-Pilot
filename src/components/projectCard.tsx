import React, { useState } from 'react';

interface ProjectCardProps {
  title?: string;
  description?: string;
}

export default function ProjectCard({ 
  title = "Next-Generation Battery Pilot", 
  description = "Exploring innovative R&D methodologies for advanced battery technologies, focusing on sustainability and efficiency." 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        maxWidth: '350px',
        minHeight: isHovered ? '160px' : '70px',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '1px solid #f0f0f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ 
        margin: 0, 
        fontSize: '1.25rem', 
        fontWeight: 600,
        color: '#1a1a1a',
      }}>
        {title}
      </h3>
      
      <div style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
        maxHeight: isHovered ? '200px' : '0px',
        marginTop: isHovered ? '12px' : '0px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        color: '#525252',
        lineHeight: '1.6',
        fontSize: '0.95rem'
      }}>
        <p style={{ margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}
