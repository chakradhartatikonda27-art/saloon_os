import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

export const CustomerOffersCarousel: React.FC = () => {
  const { offers, setActiveCustomerTab } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.01em' }}>
          <Tag size={18} color="#C9A24E" />
          <span>Exclusive Offers & Packages</span>
        </h3>
        <span style={{ fontSize: '0.775rem', color: '#A19BAA', fontWeight: 600 }}>Swipe for more</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1.25rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        scrollSnapType: 'x mandatory',
        perspective: '1000px'
      }}>
        {offers.map(off => (
          <div
            key={off.id}
            className="card-3d-hover"
            style={{
              minWidth: '310px',
              maxWidth: '340px',
              flexShrink: 0,
              background: off.bgGradient,
              borderRadius: '20px',
              padding: '1.5rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(201, 162, 78, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              scrollSnapAlign: 'start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glossy top sheen */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15), transparent 60%)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1 }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                alignSelf: 'flex-start',
                padding: '0.25rem 0.75rem',
                borderRadius: '99px',
                fontSize: '0.725rem',
                fontWeight: 900,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                {off.discountText}
              </span>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginTop: '0.35rem', lineHeight: 1.25, color: '#FFFFFF' }}>
                {off.title}
              </h4>

              <p style={{ fontSize: '0.825rem', opacity: 0.9, lineHeight: 1.4, color: 'rgba(255, 255, 255, 0.85)' }}>
                {off.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '0.85rem', zIndex: 1 }}>
              <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 600 }}>
                {off.validUntil}
              </span>

              <button
                onClick={() => setActiveCustomerTab('book')}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#14121A',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <span>Book Offer</span> <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
