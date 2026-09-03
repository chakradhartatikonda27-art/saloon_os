import React, { useRef } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomerOffersCarousel: React.FC = () => {
  const { offers, setActiveCustomerTab } = useSalon();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.02em' }}>
          <Tag size={20} color="#C9A24E" />
          <span>Exclusive Offers & Combo Packages</span>
        </h3>

        {/* Scroll Left / Right Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}
          >
            <ChevronLeft size={18} color="#121118" />
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}
          >
            <ChevronRight size={18} color="#121118" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '1.25rem',
          overflowX: 'auto',
          paddingBottom: '0.85rem',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none'
        }}
      >
        {offers.map(off => (
          <div
            key={off.id}
            className="luxury-card"
            style={{
              minWidth: '320px',
              maxWidth: '350px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              scrollSnapAlign: 'start',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Offer Cover Image */}
            {off.imageUrl && (
              <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative' }}>
                <img src={off.imageUrl} alt={off.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  backgroundColor: '#121118',
                  color: '#EBD28F',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '99px',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  border: '1px solid #C9A24E',
                  letterSpacing: '0.05em'
                }}>
                  {off.discountText}
                </span>
              </div>
            )}

            {/* Offer Body */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#121118', margin: 0, lineHeight: 1.25 }}>
                {off.title}
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#5A5463', lineHeight: 1.4, margin: 0 }}>
                {off.description}
              </p>
            </div>

            {/* Bottom Action Row */}
            <div style={{ padding: '0.85rem 1.25rem 1.25rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8E3DE' }}>
              <span style={{ fontSize: '0.75rem', color: '#5A5463', fontWeight: 700 }}>
                {off.validUntil}
              </span>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-primary"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
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
