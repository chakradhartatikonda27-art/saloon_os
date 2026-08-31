import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceRevenueTable } from './ServiceRevenueTable';
import { 
  Scissors, 
  Plus
} from 'lucide-react';

export const MISDashboard: React.FC = () => {
  const { 
    setIsWalkInOpen, 
    setIsAppointmentModalOpen 
  } = useSalon();

  const dailyBars = [
    { day: '18 Aug', rev: 4200 },
    { day: '19 Aug', rev: 7800 },
    { day: '20 Aug', rev: 5100 },
    { day: '21 Aug', rev: 6200 },
    { day: '22 Aug', rev: 5800 },
    { day: '23 Aug', rev: 6100 },
    { day: '24 Aug', rev: 7400 },
    { day: '25 Aug', rev: 6000 },
    { day: '26 Aug', rev: 8900 },
    { day: '27 Aug', rev: 7100 },
    { day: '28 Aug', rev: 4900 },
    { day: '29 Aug', rev: 6800 },
    { day: '30 Aug', rev: 7200 },
    { day: '31 Aug', rev: 5841, isToday: true }
  ];

  const categoryMix = [
    { cat: 'Hair', amount: '₹1,30,400', color: '#C9A24E' },
    { cat: 'Beard', amount: '₹31,200', color: '#2A2237' },
    { cat: 'Facial', amount: '₹57,000', color: '#0E9C86' },
    { cat: 'Spa', amount: '₹33,600', color: '#D9584A' },
    { cat: 'Other', amount: '₹37,200', color: '#9B8B38' },
    { cat: 'Color', amount: '₹99,400', color: '#6B4C9A' },
    { cat: 'Skin', amount: '₹38,700', color: '#4C9A9B' }
  ];

  const serviceRevenue30D = [
    { service: 'Global Hair Color', category: 'Color', revenue: '₹67,500', bookings: 29, avgTicket: '₹2,328' },
    { service: 'Hair Spa', category: 'Hair', revenue: '₹67,200', bookings: 57, avgTicket: '₹1,179' },
    { service: 'Signature Glow Facial', category: 'Facial', revenue: '₹57,000', bookings: 39, avgTicket: '₹1,462' },
    { service: 'De-Tan Treatment', category: 'Skin', revenue: '₹38,700', bookings: 45, avgTicket: '₹860' },
    { service: 'Premium Haircut & Style', category: 'Hair', revenue: '₹38,350', bookings: 62, avgTicket: '₹619' },
    { service: 'Manicure', category: 'Other', revenue: '₹37,200', bookings: 64, avgTicket: '₹581' },
    { service: 'Head & Shoulder Massage', category: 'Spa', revenue: '₹33,600', bookings: 50, avgTicket: '₹672' },
    { service: 'Root Touch-up', category: 'Color', revenue: '₹31,900', bookings: 33, avgTicket: '₹967' },
    { service: 'Classic Haircut', category: 'Hair', revenue: '₹24,850', bookings: 73, avgTicket: '₹340' },
    { service: 'Hot Towel Shave', category: 'Beard', revenue: '₹19,200', bookings: 50, avgTicket: '₹384' },
    { service: 'Beard Trim & Shape', category: 'Beard', revenue: '₹12,000', bookings: 49, avgTicket: '₹245' },
  ];

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '1.5rem', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* MIS Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
            MIS dashboard
          </h2>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Mon, 31 Aug • live figures from bookings, POS and expenses
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setIsWalkInOpen(true)}
            className="btn btn-secondary"
            style={{ borderColor: 'var(--teal)', color: 'var(--teal)', backgroundColor: 'var(--teal-tint)' }}
          >
            <Scissors size={16} />
            <span>+ Walk-in</span>
          </button>

          <button 
            onClick={() => setIsAppointmentModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>+ New Booking</span>
          </button>
        </div>
      </div>

      {/* Top 6 Situation Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TODAY'S REVENUE</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0E9C86', marginTop: '0.2rem' }}>₹5,841</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>APPOINTMENTS TODAY</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>18</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>COMPLETED</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>7</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IN QUEUE</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D9584A', marginTop: '0.2rem' }}>8</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVG TICKET</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>₹974</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TODAY'S EXPENSES</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D9584A', marginTop: '0.2rem' }}>₹0</div>
        </div>
      </div>

      {/* Middle Row: Revenue Chart & P&L Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Daily Revenue Bar Chart */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            DAILY REVENUE • LAST 14 DAYS
          </div>

          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '0.6rem', paddingBottom: '1.5rem', borderBottom: '1px dashed #E8E3DE' }}>
            {dailyBars.map(b => {
              const heightPct = Math.round((b.rev / 9000) * 100);
              return (
                <div key={b.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div 
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      backgroundColor: b.isToday ? '#0E9C86' : '#C9A24E',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.2s ease'
                    }}
                    title={`${b.day}: ₹${b.rev}`}
                  />
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.675rem', color: '#75707E', marginTop: '0.5rem' }}>
            {dailyBars.map(b => (
              <span key={b.day} style={{ flex: 1, textAlign: 'center' }}>{b.day}</span>
            ))}
          </div>
        </div>

        {/* P&L & Category Mix */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AUG P&L (MONTH TO DATE)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1A25' }}>
              <span>Revenue</span>
              <strong style={{ color: '#0E9C86' }}>₹4,82,893</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1A25', borderBottom: '1px dashed #E8E3DE', paddingBottom: '0.4rem' }}>
              <span>– Expenses</span>
              <strong style={{ color: '#D9584A' }}>₹2,62,200</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: '#14121A', paddingTop: '0.2rem' }}>
              <span>= Net operating result</span>
              <strong style={{ color: '#0E9C86' }}>₹2,20,693</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#75707E' }}>
              <span>Margin</span>
              <strong style={{ color: '#14121A' }}>46%</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#75707E' }}>
              <span>Outstanding receivables</span>
              <strong style={{ color: '#D9584A' }}>₹37,364</strong>
            </div>
          </div>

          {/* Donut Mix Breakdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderTop: '1px solid #E8E3DE', paddingTop: '1rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'conic-gradient(#C9A24E 0% 30%, #2A2237 30% 40%, #0E9C86 40% 60%, #D9584A 60% 70%, #9B8B38 70% 80%, #6B4C9A 80% 90%, #4C9A9B 90% 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                Mix
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem 0.75rem', fontSize: '0.7rem', flex: 1 }}>
              {categoryMix.map(c => (
                <div key={c.cat} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.color }} />
                  <span style={{ color: '#75707E' }}>{c.cat}</span>
                  <strong style={{ color: '#1E1A25', marginLeft: 'auto' }}>{c.amount}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE REVENUE TABLE WITH TIME RANGE FILTERS */}
      <div style={{ marginBottom: '1.5rem' }}>
        <ServiceRevenueTable />
      </div>

      {/* Bottom Row: Staff MTD, Live Floor, Needs Attention */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', gap: '1.5rem' }}>
        {/* Staff Revenue MTD */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            STAFF REVENUE • MTD
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '140px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#14121A', marginBottom: '0.25rem' }}>₹1,23,900</span>
              <div style={{ width: '100%', height: '85%', backgroundColor: '#0E9C86', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.725rem', color: '#75707E', marginTop: '0.35rem' }}>Arun</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#14121A', marginBottom: '0.25rem' }}>₹1,19,800</span>
              <div style={{ width: '100%', height: '80%', backgroundColor: '#D9584A', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.725rem', color: '#75707E', marginTop: '0.35rem' }}>Meena</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#14121A', marginBottom: '0.25rem' }}>₹1,12,150</span>
              <div style={{ width: '100%', height: '75%', backgroundColor: '#2A2237', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.725rem', color: '#75707E', marginTop: '0.35rem' }}>Sanjay</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#14121A', marginBottom: '0.25rem' }}>₹71,650</span>
              <div style={{ width: '100%', height: '50%', backgroundColor: '#C9A24E', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.725rem', color: '#75707E', marginTop: '0.35rem' }}>Priya</span>
            </div>
          </div>
        </div>

        {/* Live Floor */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            LIVE FLOOR
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2A2237', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Arun</div>
                  <div style={{ fontSize: '0.725rem', color: '#75707E' }}>#A25 • Premium Haircut • 1 waiting</div>
                </div>
              </div>
              <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '99px' }}>
                Running over
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8E3DE', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0E9C86', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  M
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Meena</div>
                  <div style={{ fontSize: '0.725rem', color: '#75707E' }}>#B12 • Hair Spa • 2 waiting</div>
                </div>
              </div>
              <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '99px' }}>
                On time
              </span>
            </div>
          </div>
        </div>

        {/* Needs Attention */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            NEEDS ATTENTION
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#C9A24E' }}>📦</span>
              <span style={{ color: '#C9A24E', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
                Low stock: Hair Spa Cream 1kg (3/4 jar)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#C9A24E' }}>📦</span>
              <span style={{ color: '#C9A24E', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
                Low stock: Developer 20 vol 1L (2/4 bottle)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#C9A24E' }}>📦</span>
              <span style={{ color: '#C9A24E', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
                Low stock: De-Tan Pack 500g (1/3 jar)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
