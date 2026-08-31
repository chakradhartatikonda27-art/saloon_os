import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { CustomerTab } from '../../types';
import { Home, Scissors, Calendar, Clock, User } from 'lucide-react';

export const CustomerMobileNav: React.FC = () => {
  const { activeCustomerTab, setActiveCustomerTab, activeCustomerTokenId, tokens } = useSalon();

  const activeToken = tokens.find(t => t.id === activeCustomerTokenId);
  const hasActiveToken = activeToken && activeToken.status !== 'COMPLETED' && activeToken.status !== 'CANCELLED' && activeToken.status !== 'EXPIRED';

  const tokenBadgeLabel = activeToken ? `${activeToken.tokenNumber}` : '#A27';

  const tabs = [
    { id: 'home' as CustomerTab, label: 'Home', icon: Home },
    { id: 'services' as CustomerTab, label: 'Services', icon: Scissors },
    { id: 'book' as CustomerTab, label: 'Book Now', icon: Calendar, highlight: true },
    { id: 'token' as CustomerTab, label: 'Live Token', icon: Clock, badge: hasActiveToken ? tokenBadgeLabel : undefined },
    { id: 'account' as CustomerTab, label: 'Account', icon: User },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#090d16',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      padding: '0 0.5rem'
    }}>
      {tabs.map(t => {
        const Icon = t.icon;
        const isActive = activeCustomerTab === t.id;

        if (t.highlight) {
          return (
            <button
              key={t.id}
              onClick={() => setActiveCustomerTab(t.id)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                cursor: 'pointer',
                marginTop: '-16px'
              }}
              title="Book Visit"
            >
              <Calendar size={22} />
            </button>
          );
        }

        return (
          <button
            key={t.id}
            onClick={() => setActiveCustomerTab(t.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#ec4899' : 'var(--text-muted)',
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              flex: 1,
              position: 'relative'
            }}
          >
            <Icon size={20} />
            <span>{t.label}</span>

            {t.badge && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '12%',
                backgroundColor: '#ec4899',
                color: '#ffffff',
                fontSize: '0.6rem',
                fontWeight: 900,
                padding: '0.1rem 0.35rem',
                borderRadius: 'var(--radius-full)',
                lineHeight: 1
              }}>
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
