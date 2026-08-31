import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types';
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
      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                backgroundColor: isActive ? 'var(--primary-600)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                borderColor: isActive ? 'var(--primary-500)' : 'var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 1rem',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8rem'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredServices.map(srv => (
          <div
            key={srv.id}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {srv.imageUrl && (
              <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={srv.imageUrl} 
                  alt={srv.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '0.65rem',
                  right: '0.65rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: 'var(--primary-500)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {srv.category}
                </span>
              </div>
            )}

            <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{srv.name}</h4>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                  ₹{srv.price}
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {srv.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} /> {srv.duration} mins
                </span>
                <span>•</span>
                <span>GST 18% incl.</span>
              </div>

              {/* Service Variants if available */}
              {srv.variants && srv.variants.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                  {srv.variants.map(v => (
                    <span 
                      key={v.id}
                      style={{
                        fontSize: '0.7rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.15rem 0.45rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {v.name}: ₹{v.price}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="btn btn-primary"
                style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center' }}
              >
                <Scissors size={14} /> Book Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
