import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Camera, Sparkles } from 'lucide-react';

export const CustomerGallery: React.FC = () => {
  const { gallery, settings } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.01em' }}>
          <Camera size={18} color="#C9A24E" />
          <span>Inside {settings.salonName}</span>
        </h3>
        <span style={{ fontSize: '0.775rem', color: '#A19BAA', fontWeight: 600 }}>{gallery.length} photos</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1.25rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        scrollSnapType: 'x mandatory',
        perspective: '1000px'
      }}>
        {gallery.map(img => (
          <div
            key={img.id}
            className="card-3d-hover"
            style={{
              minWidth: '270px',
              maxWidth: '290px',
              height: '190px',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              scrollSnapAlign: 'start',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
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
              background: 'linear-gradient(to top, rgba(13, 12, 16, 0.95) 0%, rgba(13, 12, 16, 0.2) 60%, transparent 100%)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <span style={{ fontSize: '0.675rem', color: '#C9A24E', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {img.category}
              </span>
              <h5 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.15rem' }}>
                {img.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
