import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Clock, Phone, MessageSquare, Sparkles, Monitor, Scissors } from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { settings, setViewPerspective, setActiveCustomerTab, activeCustomerTokenId, tokens } = useSalon();

  const activeToken = tokens.find(t => t.id === activeCustomerTokenId);
  const hasActiveToken = activeToken && activeToken.status !== 'COMPLETED' && activeToken.status !== 'CANCELLED' && activeToken.status !== 'EXPIRED';
  const tokenBadgeLabel = activeToken ? `${activeToken.tokenNumber}` : '';

  return (
    <header className="luxury-header-glass" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(201, 162, 78, 0.2)' }}>
      {/* Top Banner perspective switcher (Desktop only) */}
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

      {/* Main Header Wrapper */}
      <div style={{ padding: '0.75rem 1rem', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {/* ROW 1: Logo + Salon Name + Open Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #121118 0%, #2A2436 100%)',
              border: '1.5px solid #C9A24E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              color: '#C9A24E',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(201, 162, 78, 0.2)'
            }}>
              {settings.logo}
            </div>

            <div>
              <h1 style={{ fontSize: '1rem', fontWeight: 900, color: '#121118', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>
                {settings.salonName}
              </h1>
              <div style={{ fontSize: '0.7rem', color: '#0E9C86', fontWeight: 800, marginTop: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={11} /> Open Today (09:00 AM - 09:00 PM)
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Action Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.45rem', width: '100%', borderTop: '1px solid rgba(232, 227, 222, 0.6)', paddingTop: '0.55rem' }}>
          <a
            href={`tel:${settings.phone}`}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '8px',
              padding: '0.4rem 0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#121118',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 800
            }}
          >
            <Phone size={14} color="#C9A24E" />
            <span style={{ fontSize: '0.725rem' }}>Call</span>
          </a>

          <a
            href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#E6F7F4',
              border: '1px solid #0E9C86',
              borderRadius: '8px',
              padding: '0.4rem 0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: '#0E9C86',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 800
            }}
          >
            <MessageSquare size={14} />
            <span style={{ fontSize: '0.725rem' }}>Chat</span>
          </a>

          {hasActiveToken && (
            <button
              onClick={() => setActiveCustomerTab('token')}
              style={{
                backgroundColor: '#FFF9EE',
                border: '1px solid #C9A24E',
                color: '#121118',
                borderRadius: '8px',
                padding: '0.4rem 0.65rem',
                fontSize: '0.725rem',
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
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.775rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              borderRadius: '8px'
            }}
          >
            <Scissors size={14} color="#C9A24E" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
