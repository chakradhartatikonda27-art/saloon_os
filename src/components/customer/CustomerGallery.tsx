import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Camera } from 'lucide-react';

export const CustomerGallery: React.FC = () => {
  const { gallery } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Camera size={18} color="var(--primary-500)" />
          <span>Inside Urban Glow Salon & Spa</span>
        </h3>
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>4 photos</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        scrollSnapType: 'x mandatory'
      }}>
        {gallery.map(img => (
          <div
            key={img.id}
            style={{
              minWidth: '260px',
              maxWidth: '280px',
              height: '180px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '1px solid var(--border-subtle)',
              scrollSnapAlign: 'start'
            }}
          >
            <img 
              src={img.url} 
              alt={img.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.85), transparent)',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <span style={{ fontSize: '0.675rem', color: '#ec4899', fontWeight: 700, textTransform: 'uppercase' }}>
                {img.category}
              </span>
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>
                {img.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
