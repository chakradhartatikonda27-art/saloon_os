import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Megaphone, Send, Users, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';

export const Marketing: React.FC = () => {
  const { campaigns } = useSalon();

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Marketing & Re-Engagement OS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Automated WhatsApp & SMS CRM campaigns for inactive customer retention and VIP offers.
          </p>
        </div>

        <button className="btn btn-primary">
          <Send size={18} />
          <span>+ Create Broadcast Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {campaigns.map(cmp => (
          <div key={cmp.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-confirmed">{cmp.channel} • {cmp.type}</span>
              <span className="badge badge-completed">{cmp.status}</span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{cmp.title}</h3>
            
            <div style={{
              backgroundColor: 'rgba(15,23,42,0.6)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              borderLeft: '3px solid #25D366'
            }}>
              "{cmp.message}"
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.65rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Sent</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{cmp.sentCount}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Converted</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>{cmp.convertedCount}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Revenue</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>₹{cmp.revenueGenerated.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
