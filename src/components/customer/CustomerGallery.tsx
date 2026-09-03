import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Camera, Sparkles } from 'lucide-react';

export const CustomerGallery: React.FC = () => {
  const { gallery, settings } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.02em' }}>
          <Camera size={20} color="#C9A24E" />
          <span>Inside {settings.salonName}</span>
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 700 }}>{gallery.length} photos</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem'
      }}>
        {gallery.map(img => (
          <div
            key={img.id}
            className="luxury-card"
            style={{
              height: '210px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img 
              src={img.url} 
              alt={img.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(18, 17, 24, 0.9) 0%, rgba(18, 17, 24, 0.2) 60%, transparent 100%)',
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <span style={{ fontSize: '0.675rem', color: '#EBD28F', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {img.category}
              </span>
              <h5 style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', marginTop: '0.15rem' }}>
                {img.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
