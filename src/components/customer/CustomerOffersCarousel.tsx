import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Tag, ArrowRight } from 'lucide-react';

export const CustomerOffersCarousel: React.FC = () => {
  const { offers, setActiveCustomerTab } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Tag size={18} color="#ec4899" />
          <span>Exclusive Offers & Packages</span>
        </h3>
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Swipe for more</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        scrollSnapType: 'x mandatory'
      }}>
        {offers.map(off => (
          <div
            key={off.id}
            style={{
              minWidth: '290px',
              maxWidth: '320px',
              flexShrink: 0,
              background: off.bgGradient,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              scrollSnapAlign: 'start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignSelf: 'flex-start',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.05em'
              }}>
                {off.discountText}
              </span>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem', lineHeight: 1.2 }}>
                {off.title}
              </h4>

              <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.3 }}>
                {off.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.725rem', opacity: 0.8 }}>
                {off.validUntil}
              </span>

              <button
                onClick={() => setActiveCustomerTab('book')}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.775rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Book Offer <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
