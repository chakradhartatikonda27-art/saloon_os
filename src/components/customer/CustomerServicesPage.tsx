import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Scissors, Clock, Sparkles } from 'lucide-react';

export const CustomerServicesPage: React.FC = () => {
  const { services, setActiveCustomerTab } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hair', 'Beard', 'Facial', 'Spa', 'Color', 'Packages'];

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category Filter Pills Bar */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
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
                boxShadow: isActive ? '0 4px 14px rgba(18, 17, 24, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredServices.map(srv => (
          <div
            key={srv.id}
            className="luxury-card"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {srv.imageUrl && (
              <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={srv.imageUrl} 
                  alt={srv.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  backgroundColor: '#121118',
                  color: '#EBD28F',
                  border: '1px solid #C9A24E',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '99px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {srv.category}
                </span>
              </div>
            )}

            <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#121118', margin: 0 }}>
                  {srv.name}
                </h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118' }}>
                  ₹{srv.price}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#5A5463', lineHeight: 1.5, margin: 0 }}>
                {srv.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', borderTop: '1px solid #E8E3DE', paddingTop: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#5A5463', fontWeight: 700 }}>
                  <Clock size={14} color="#C9A24E" /> {srv.duration} mins
                </div>

                <button
                  onClick={() => setActiveCustomerTab('book')}
                  className="champagne-btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
