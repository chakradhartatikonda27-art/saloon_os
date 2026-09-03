import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

export const CustomerOffersCarousel: React.FC = () => {
  const { offers, setActiveCustomerTab } = useSalon();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.02em' }}>
          <Tag size={20} color="#C9A24E" />
          <span>Exclusive Offers & Combo Packages</span>
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 700 }}>Swipe to explore</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '1.25rem',
        overflowX: 'auto',
        paddingBottom: '0.85rem',
        scrollSnapType: 'x mandatory'
      }}>
        {offers.map(off => (
          <div
            key={off.id}
            className="luxury-card"
            style={{
              minWidth: '320px',
              maxWidth: '350px',
              flexShrink: 0,
              padding: '1.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              scrollSnapAlign: 'start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Tag & Discount Pill */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  backgroundColor: '#121118',
                  color: '#EBD28F',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '99px',
                  fontSize: '0.725rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid #C9A24E'
                }}>
                  {off.discountText}
                </span>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C9A24E' }}>
                  Limited Time
                </span>
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', marginTop: '0.35rem', lineHeight: 1.25 }}>
                {off.title}
              </h4>

              <p style={{ fontSize: '0.85rem', color: '#5A5463', lineHeight: 1.5 }}>
                {off.description}
              </p>
            </div>

            {/* Bottom Booking Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.75rem', borderTop: '1px solid #E8E3DE', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.775rem', color: '#5A5463', fontWeight: 700 }}>
                {off.validUntil}
              </span>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-primary"
                style={{
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <span>Book Offer</span> <ArrowRight size={14} color="#C9A24E" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
