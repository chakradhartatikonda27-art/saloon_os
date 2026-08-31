import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Award, Scissors } from 'lucide-react';

export const Reports: React.FC = () => {
  const { staff, services, invoices, expenses } = useSalon();

  const totalRev = 24850 + invoices.reduce((s, i) => s + i.grandTotal, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Business Reports & Analytics OS</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Revenue trends, staff productivity leaderboards, top services performance, and net profit margins.
        </p>
      </div>

      {/* Top Level Financial Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Gross Salon Revenue</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>₹{totalRev.toLocaleString()}</div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>+14.2% vs previous month</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Operational Expenses</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f472b6' }}>₹{totalExp.toLocaleString()}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Rent, Salaries, Supplies</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Net Operating Profit</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netProfit >= 0 ? '#34d399' : '#ef4444' }}>
            ₹{netProfit.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Net Profit Margin ~34%</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Avg Bill Value</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-500)' }}>₹1,420</div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>+₹180 vs last week</span>
        </div>
      </div>

      {/* Two Column Grid: Staff Leaderboard & Top Services */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Staff Revenue Leaderboard */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="#fbbf24" />
            <span>Staff Revenue & Commission Leaderboard</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {staff.map((st, idx) => {
              const rankColor = idx === 0 ? '#fbbf24' : 'var(--text-muted)';
              const rankLabel = `#${idx + 1}`;
              return (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, color: rankColor }}>{rankLabel}</span>
                    <img src={st.avatar} alt={st.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{st.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{st.servicesCompletedToday} services today</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#34d399', fontSize: '0.9rem' }}>₹{st.revenueToday.toLocaleString()}</div>
                    <div style={{ fontSize: '0.725rem', color: '#fbbf24' }}>Comm: ₹{st.commissionToday.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Booked Services */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} color="var(--primary-500)" />
            <span>Top Performing Services</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {services.slice(0, 4).map(srv => (
              <div
                key={srv.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{srv.name}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Category: {srv.category} • {srv.duration} mins</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>₹{srv.price}</div>
                  <span className="badge badge-confirmed" style={{ fontSize: '0.7rem' }}>High Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
