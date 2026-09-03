import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ChevronLeft, Scissors, Clock, Sparkles } from 'lucide-react';

export const CustomerServicesPage: React.FC = () => {
  const { services, setActiveCustomerTab } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hair', 'Beard', 'Facial', 'Spa', 'Skin', 'Color', 'Other', 'Packages'];

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header with Back Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setActiveCustomerTab('home')}
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
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            flexShrink: 0
          }}
        >
          <ChevronLeft size={18} color="#121118" />
        </button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#121118', letterSpacing: '-0.02em', margin: 0 }}>
          Services & pricing
        </h2>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="horizontal-scroll-touch" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: isActive ? '#121118' : '#FFFFFF',
                color: isActive ? '#EBD28F' : '#121118',
                border: isActive ? '1.5px solid #C9A24E' : '1px solid #E8E3DE',
                borderRadius: '99px',
                padding: '0.45rem 1.15rem',
                fontWeight: 800,
                fontSize: '0.825rem',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: isActive ? '0 4px 14px rgba(18, 17, 24, 0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Services & Pricing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.15rem' }}>
        {filteredServices.map(srv => (
          <div
            key={srv.id}
            className="luxury-card"
            style={{
              padding: '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            {/* Top Row: Service Image/Icon + Name + Price & GST */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1.5px solid #E8E3DE',
                  backgroundColor: '#121118',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  {srv.imageUrl ? (
                    <img 
                      src={srv.imageUrl} 
                      alt={srv.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        // Fallback icon if image URL fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Scissors size={22} color="#C9A24E" />
                  )}
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', margin: 0, lineHeight: 1.25 }}>
                    {srv.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#5A5463', marginTop: '0.25rem', lineHeight: 1.35, margin: 0 }}>
                    {srv.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.3rem', fontWeight: 600 }}>
                    {srv.duration} min • {srv.category}
                  </div>
                </div>
              </div>

              {/* Price Tag with +18% GST */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', lineHeight: 1 }}>
                  ₹{srv.price}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 700, marginTop: '0.15rem' }}>
                  +{srv.tax}% GST
                </div>
              </div>
            </div>

            {/* Bottom Row: Book now button */}
            <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.85rem', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-primary"
                style={{
                  padding: '0.55rem 1.45rem',
                  fontSize: '0.825rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  borderRadius: '10px',
                  width: '100%'
                }}
              >
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
