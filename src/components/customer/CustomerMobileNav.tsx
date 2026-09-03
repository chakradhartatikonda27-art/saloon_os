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
      height: '64px',
      backgroundColor: 'rgba(18, 17, 24, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(201, 162, 78, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      padding: '0 0.5rem',
      paddingBottom: 'env(safe-area-inset-bottom)'
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
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9A24E 0%, #EBD28F 50%, #B8913D 100%)',
                color: '#121118',
                border: '2px solid #121118',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(201, 162, 78, 0.5)',
                cursor: 'pointer',
                marginTop: '-20px'
              }}
              title="Book Visit"
            >
              <Calendar size={24} color="#121118" />
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
              gap: '0.25rem',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#EBD28F' : '#A19BAA',
              fontSize: '0.7rem',
              fontWeight: isActive ? 900 : 600,
              cursor: 'pointer',
              flex: 1,
              position: 'relative'
            }}
          >
            <Icon size={20} color={isActive ? '#C9A24E' : '#A19BAA'} />
            <span>{t.label}</span>

            {t.badge && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '12%',
                backgroundColor: '#C9A24E',
                color: '#121118',
                fontSize: '0.6rem',
                fontWeight: 900,
                padding: '0.1rem 0.35rem',
                borderRadius: '99px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
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
