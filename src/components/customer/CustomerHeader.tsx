import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { MapPin, Clock, Phone, MessageSquare, Sparkles, Monitor, Scissors } from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { settings, setViewPerspective, setActiveCustomerTab, activeCustomerTokenId, tokens } = useSalon();

  const activeToken = tokens.find(t => t.id === activeCustomerTokenId);
  const hasActiveToken = activeToken && activeToken.status !== 'COMPLETED' && activeToken.status !== 'CANCELLED' && activeToken.status !== 'EXPIRED';
  const tokenBadgeLabel = activeToken ? `${activeToken.tokenNumber}` : '';

  return (
    <header className="luxury-header-glass" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top Banner perspective switcher (Hidden on Mobile) */}
      <div className="hide-mobile" style={{
        backgroundColor: '#121118',
        color: '#EBD28F',
        padding: '0.45rem 1.25rem',
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 700
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} color="#C9A24E" />
          <span>Public Customer Web View — <strong>{settings.slug}.salonos.in</strong></span>
        </div>

        <button
          onClick={() => setViewPerspective('admin')}
          style={{
            backgroundColor: '#C9A24E',
            border: 'none',
            color: '#121118',
            borderRadius: '6px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.725rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Monitor size={12} /> Switch to Salon Owner OS
        </button>
      </div>

      {/* Main Header Container */}
      <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Logo & Salon Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #121118 0%, #2A2436 100%)',
            border: '1.5px solid #C9A24E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 900,
            color: '#C9A24E',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(201, 162, 78, 0.2)'
          }}>
            {settings.logo}
          </div>

          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {settings.salonName}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.725rem', color: '#5A5463', marginTop: '0.1rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#0E9C86', fontWeight: 700 }}>
                <Clock size={12} /> Open Today
              </span>
            </div>
          </div>
        </div>

        {/* Quick Contact & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          <a
            href={`tel:${settings.phone}`}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#121118',
              textDecoration: 'none'
            }}
            title="Call Salon"
          >
            <Phone size={16} color="#C9A24E" />
          </a>

          <a
            href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#E6F7F4',
              border: '1px solid #0E9C86',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0E9C86',
              textDecoration: 'none'
            }}
            title="WhatsApp Salon"
          >
            <MessageSquare size={16} />
          </a>

          {hasActiveToken && (
            <button
              onClick={() => setActiveCustomerTab('token')}
              style={{
                backgroundColor: '#FFF9EE',
                border: '1px solid #C9A24E',
                color: '#121118',
                borderRadius: '10px',
                padding: '0.45rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              Token <strong style={{ color: '#C9A24E' }}>{tokenBadgeLabel}</strong>
            </button>
          )}

          <button
            onClick={() => setActiveCustomerTab('book')}
            className="champagne-btn-primary"
            style={{ padding: '0.5rem 0.95rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', borderRadius: '10px' }}
          >
            <Scissors size={14} color="#C9A24E" />
            <span>Book</span>
          </button>
        </div>
      </div>
    </header>
  );
};
