import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Award, Scissors } from 'lucide-react';
import { ServiceRevenueTable } from './ServiceRevenueTable';

export const Reports: React.FC = () => {
  const { staff, services, invoices, expenses } = useSalon();

  const totalRev = 24850 + invoices.reduce((s, i) => s + i.grandTotal, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRev - totalExp;

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E1A25' }}>Business Reports & Analytics OS</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Revenue trends, staff productivity leaderboards, custom date service breakdown, and net profit margins.
        </p>
      </div>

      {/* Top Level Financial Summary */}
      <div className="stats-grid">
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gross Salon Revenue</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal)', marginTop: '0.2rem' }}>₹{totalRev.toLocaleString()}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 700 }}>+14.2% vs previous month</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Operational Expenses</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--coral)', marginTop: '0.2rem' }}>₹{totalExp.toLocaleString()}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rent, Salaries, Supplies</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Operating Profit</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netProfit >= 0 ? 'var(--teal)' : 'var(--coral)', marginTop: '0.2rem' }}>
            ₹{netProfit.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Profit Margin ~34%</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Bill Value</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold)', marginTop: '0.2rem' }}>₹1,420</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 700 }}>+₹180 vs last week</span>
        </div>
      </div>

      {/* DYNAMIC SERVICE REVENUE TABLE WITH DAY-WISE, WEEKLY, 15D, 30D, 3M & CUSTOM DATE RANGE FILTERS */}
      <ServiceRevenueTable />

      {/* Two Column Grid: Staff Leaderboard & Top Services */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Staff Revenue Leaderboard */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E1A25', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--gold)" />
            <span>Staff Revenue & Commission Leaderboard</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {staff.map((st, idx) => {
              const rankColor = idx === 0 ? 'var(--gold)' : 'var(--text-muted)';
              const rankLabel = `#${idx + 1}`;
              return (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, color: rankColor }}>{rankLabel}</span>
                    <img src={st.avatar} alt={st.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1E1A25' }}>{st.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{st.servicesCompletedToday} services today</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--teal)', fontSize: '0.9rem' }}>₹{st.revenueToday.toLocaleString()}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--gold)', fontWeight: 700 }}>Comm: ₹{st.commissionToday.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Booked Services */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E1A25', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} color="var(--gold)" />
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
                  backgroundColor: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1E1A25' }}>{srv.name}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Category: {srv.category} • {srv.duration} mins</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#1E1A25', fontSize: '0.9rem' }}>₹{srv.price}</div>
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
