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
      backgroundColor: 'var(--ink)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Top Banner perspective switcher */}
      <div style={{
        backgroundColor: 'var(--plum-dark)',
        borderBottom: '1px solid var(--border-subtle)',
        color: 'var(--gold-light)',
        padding: '0.45rem 1rem',
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} color="var(--gold)" />
          <span>Public Customer Web View — {settings.slug}.yourplatform.com</span>
        </div>

        <button
          onClick={() => setViewPerspective('admin')}
          style={{
            backgroundColor: 'var(--gold)',
            border: 'none',
            color: 'var(--ink)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.2rem 0.65rem',
            fontSize: '0.725rem',
            fontWeight: 800,
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
              background: 'linear-gradient(135deg, var(--plum-light), var(--gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#ffffff',
              boxShadow: 'var(--shadow-gold)'
            }}>
              {settings.logo}
            </div>

            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                {settings.salonName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={13} color="var(--gold)" /> {settings.address.split(',')[0]}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--teal)', fontWeight: 600 }}>
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
            >
              <Phone size={14} /> <span className="hide-mobile">Call</span>
            </a>

            <a
              href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--teal)', borderColor: 'var(--teal)', backgroundColor: 'var(--teal-tint)' }}
            >
              <MessageSquare size={14} /> <span className="hide-mobile">WhatsApp</span>
            </a>

            {hasActiveToken && (
              <button
                onClick={() => setActiveCustomerTab('token')}
                className="btn btn-secondary btn-sm pulse-active"
                style={{ backgroundColor: 'rgba(201, 162, 78, 0.15)', borderColor: 'var(--gold)', color: 'var(--gold-light)', fontWeight: 700 }}
              >
                <span>Live Token {tokenBadgeLabel}</span>
              </button>
            )}

            <button
              onClick={() => setActiveCustomerTab('book')}
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.25rem' }}
            >
              Book Visit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
