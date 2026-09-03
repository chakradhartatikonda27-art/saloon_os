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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header with Back Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button
          onClick={() => setActiveCustomerTab('home')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E3DE',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <ChevronLeft size={20} color="#121118" />
        </button>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#121118', letterSpacing: '-0.02em', margin: 0 }}>
          Services & pricing
        </h2>
      </div>

      {/* Category Filter Pills Bar */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
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
                padding: '0.5rem 1.25rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 14px rgba(18, 17, 24, 0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Services & Pricing Grid matching user screenshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.35rem' }}>
        {filteredServices.map(srv => (
          <div
            key={srv.id}
            className="luxury-card"
            style={{
              padding: '1.35rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.15rem'
            }}
          >
            {/* Top Row: Service Image/Icon + Name + Price & GST */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.95rem' }}>
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1.5px solid #E8E3DE',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  <img src={srv.imageUrl} alt={srv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118', margin: 0, lineHeight: 1.25 }}>
                    {srv.name}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: '#5A5463', marginTop: '0.35rem', lineHeight: 1.4, margin: 0 }}>
                    {srv.description}
                  </p>
                  <div style={{ fontSize: '0.775rem', color: '#75707E', marginTop: '0.35rem', fontWeight: 600 }}>
                    {srv.duration} min • {srv.category}
                  </div>
                </div>
              </div>

              {/* Price Tag with +18% GST */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#121118', lineHeight: 1 }}>
                  ₹{srv.price}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#75707E', fontWeight: 700, marginTop: '0.2rem' }}>
                  +{srv.tax}% GST
                </div>
              </div>
            </div>

            {/* Bottom Row: Book now button */}
            <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.95rem', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-primary"
                style={{
                  padding: '0.55rem 1.45rem',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  borderRadius: '10px'
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
