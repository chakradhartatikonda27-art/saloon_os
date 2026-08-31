import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Calendar, Package } from 'lucide-react';

export const NotificationsCenter: React.FC = () => {
  const { notifications, markNotificationRead } = useSalon();

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Notification Center & System Alerts</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Real-time updates for online booking requests, low stock thresholds, and payment confirmations.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {notifications.map(n => {
            const isAppt = n.type === 'Appointment';
            const iconBg = isAppt ? 'rgba(99, 102, 241, 0.2)' : 'rgba(245, 158, 11, 0.2)';
            const iconColor = isAppt ? 'var(--primary-500)' : '#fbbf24';

            let cardBg = 'rgba(99, 102, 241, 0.08)';
            let cardBorder = '1px solid var(--border-accent)';
            let titleColor = '#ffffff';

            if (n.read) {
              cardBg = 'rgba(255,255,255,0.02)';
              cardBorder = '1px solid var(--border-subtle)';
              titleColor = 'var(--text-muted)';
            }

            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: cardBg,
                  border: cardBorder,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: iconBg,
                    color: iconColor
                  }}>
                    {isAppt ? <Calendar size={18} /> : <Package size={18} />}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: titleColor }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.message}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{n.timestamp}</span>
                  {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-500)' }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
