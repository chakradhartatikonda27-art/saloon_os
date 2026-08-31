import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { MapPin, Clock, Phone, MessageSquare, Sparkles, Monitor } from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { settings, setViewPerspective, setActiveCustomerTab, activeCustomerTokenId, tokens } = useSalon();

  const activeToken = tokens.find(t => t.id === activeCustomerTokenId);
  const hasActiveToken = activeToken && activeToken.status !== 'COMPLETED' && activeToken.status !== 'CANCELLED' && activeToken.status !== 'EXPIRED';

  const tokenBadgeLabel = activeToken ? `${activeToken.tokenNumber}` : '';

  return (
    <header style={{
      backgroundColor: '#0f172a',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Top Banner perspective switcher */}
      <div style={{
        backgroundColor: 'var(--primary-600)',
        color: '#ffffff',
        padding: '0.4rem 1rem',
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} />
          <span>Public Customer Web View — {settings.slug}.yourplatform.com</span>
        </div>

        <button
          onClick={() => setViewPerspective('admin')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            padding: '0.2rem 0.6rem',
            fontSize: '0.725rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          <Monitor size={12} /> Switch to Salon Owner OS
        </button>
      </div>

      {/* Main Header Container */}
      <div className="workspace-padding" style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Logo & Salon Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
            }}>
              {settings.logo}
            </div>

            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                {settings.salonName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={13} color="#ec4899" /> {settings.address.split(',')[0]}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#34d399', fontWeight: 600 }}>
                  <Clock size={13} /> Open Today ({settings.businessHours.split('(')[0]})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <a
              href={`tel:${settings.phone}`}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--text-main)', borderColor: 'var(--border-strong)' }}
            >
              <Phone size={14} /> <span className="hide-mobile">Call</span>
            </a>

            <a
              href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ color: '#34d399', borderColor: '#059669', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
            >
              <MessageSquare size={14} /> <span className="hide-mobile">WhatsApp</span>
            </a>

            {hasActiveToken && (
              <button
                onClick={() => setActiveCustomerTab('token')}
                className="btn btn-secondary btn-sm pulse-active"
                style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', borderColor: '#ec4899', color: '#f472b6', fontWeight: 700 }}
              >
                <span>Live Token {tokenBadgeLabel}</span>
              </button>
            )}

            <button
              onClick={() => setActiveCustomerTab('book')}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', border: 'none', padding: '0.55rem 1.25rem' }}
            >
              Book Visit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
