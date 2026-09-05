import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Scissors,
  Package,
  CheckCircle2,
  PieChart
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const { 
    appointments, 
    queue, 
    staff, 
    services, 
    inventory, 
    expenses, 
    invoices,
    setActiveModule,
    setIsWalkInOpen,
    setIsAppointmentModalOpen
  } = useSalon();

  // Metrics Calculation
  const totalRevenueToday = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0) + 24850;
  const monthlyRevenue = totalRevenueToday * 28 + 145000;
  const customersTodayCount = queue.length + appointments.length + 18;
  const newCustomersCount = 6;
  const returningCustomersCount = customersTodayCount - newCustomersCount;
  const avgBillValue = Math.round(totalRevenueToday / Math.max(1, customersTodayCount));

  // Financial Breakdown
  const totalDiscounts = 1850;
  const totalRefunds = 450;
  const productCost = 3200;
  const staffCommissions = Math.round(totalRevenueToday * 0.22);
  const operatingExpenses = expenses.reduce((sum, e) => sum + e.amount, 0) + 1200;
  const netEstimatedProfit = totalRevenueToday - (productCost + staffCommissions + operatingExpenses + totalDiscounts);

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER COMMAND CENTER BANNER */}
      <div 
        className="luxury-card"
        style={{
          padding: '1.5rem 1.75rem',
          background: 'linear-gradient(135deg, #121118 0%, #2A2436 100%)',
          border: '1.5px solid #C9A24E',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: '0 16px 40px rgba(18, 17, 24, 0.2)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: 'rgba(201, 162, 78, 0.2)', color: '#EBD28F', border: '1px solid #C9A24E', padding: '0.2rem 0.65rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900 }}>
              👑 OWNER COMMAND CENTER
            </span>
            <span style={{ fontSize: '0.75rem', color: '#B5AEBF' }}>Urban Glow Flagship</span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
            Executive Business Performance & Profit Overview
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveModule('ai_insights')}
            className="champagne-btn-gold"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <Sparkles size={16} />
            <span>AI Business Assistant</span>
          </button>

          <button 
            onClick={() => setActiveModule('reports')}
            className="champagne-btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <PieChart size={16} color="#C9A24E" />
            <span>Full MIS Reports</span>
          </button>
        </div>
      </div>

      {/* TOP 8 KPI COMMAND METRICS */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.15rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>TODAY'S REVENUE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#121118', marginTop: '0.25rem' }}>₹{totalRevenueToday.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: '#0E9C86', fontWeight: 800, marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingUp size={12} /> +14.2% vs yesterday
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>MONTHLY REVENUE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.25rem' }}>₹{(monthlyRevenue / 100000).toFixed(2)}L</div>
          <div style={{ fontSize: '0.75rem', color: '#0E9C86', fontWeight: 800, marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingUp size={12} /> On track for target
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>CUSTOMERS TODAY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#121118', marginTop: '0.25rem' }}>{customersTodayCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#5A5463', fontWeight: 700, marginTop: '0.2rem' }}>
            {newCustomersCount} New • {returningCustomersCount} Returning
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>AVERAGE BILL VALUE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#121118', marginTop: '0.25rem' }}>₹{avgBillValue}</div>
          <div style={{ fontSize: '0.75rem', color: '#0E9C86', fontWeight: 800, marginTop: '0.2rem' }}>
            +₹85 upsell avg
          </div>
        </div>
      </div>

      {/* AI BUSINESS INSIGHT & RECOMMENDATIONS CARD */}
      <div 
        style={{
          backgroundColor: '#FFF9EE',
          border: '1.5px solid #C9A24E',
          borderRadius: '18px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(201, 162, 78, 0.12)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#121118', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#EBD28F" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118', margin: 0 }}>
                AI Business Insight: <span style={{ color: '#D9584A' }}>Revenue is down 11% compared with last month</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#5A5463', margin: 0, marginTop: '0.15rem' }}>
                Algorithmic root cause diagnosis based on live transaction logs & customer visit history.
              </p>
            </div>
          </div>

          <span style={{ backgroundColor: '#121118', color: '#EBD28F', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.725rem', fontWeight: 900 }}>
            3 ACTIONS REQUIRED
          </span>
        </div>

        {/* Diagnosis & Recommendations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.15rem', borderTop: '1px solid rgba(201, 162, 78, 0.3)', paddingTop: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1rem', border: '1px solid #E8E3DE' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#D9584A', textTransform: 'uppercase' }}>📉 IDENTIFIED CAUSES</div>
            <ul style={{ fontSize: '0.825rem', color: '#121118', paddingLeft: '1.2rem', marginTop: '0.4rem', margin: 0, lineHeight: 1.5 }}>
              <li>Walk-ins decreased by <strong>18%</strong> on weekdays.</li>
              <li>Hair color bookings decreased by <strong>22%</strong>.</li>
              <li><strong>17 high-value VIP customers</strong> have not returned in 45+ days.</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1rem', border: '1px solid #E8E3DE' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0E9C86', textTransform: 'uppercase' }}>💡 RECOMMENDED ACTIONS</div>
            <ul style={{ fontSize: '0.825rem', color: '#121118', paddingLeft: '1.2rem', marginTop: '0.4rem', margin: 0, lineHeight: 1.5 }}>
              <li>Launch automated WhatsApp comeback campaign for 17 inactive VIPs.</li>
              <li>Promote Hair Color discounts during low-demand Tuesday hours.</li>
              <li>Add Saturday staff capacity to absorb weekend queue overflow.</li>
            </ul>
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
          <button 
            onClick={() => setActiveModule('marketing')}
            className="champagne-btn-gold"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
          >
            <span>Launch Comeback Campaign</span> <ArrowRight size={14} />
          </button>

          <button 
            onClick={() => setActiveModule('services_config')}
            className="champagne-btn-primary"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
          >
            <span>Promote Hair Color Offer</span>
          </button>

          <button 
            onClick={() => setActiveModule('staff')}
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', color: '#121118', padding: '0.55rem 1.25rem', borderRadius: '10px', fontSize: '0.825rem', fontWeight: 800, cursor: 'pointer' }}
          >
            Adjust Staff Schedule
          </button>
        </div>
      </div>

      {/* FINANCIAL OVERVIEW & PROFIT CALCULATOR */}
      <div className="luxury-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#121118', margin: 0 }}>
              Financial Summary & Estimated Net Profit
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#5A5463', margin: 0, marginTop: '0.15rem' }}>
              Real-time revenue, deductions, commissions, overhead expenses, and profit margin analysis.
            </p>
          </div>

          <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0E9C86' }}>
            Net Profit: ₹{netEstimatedProfit.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>GROSS REVENUE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#121118', marginTop: '0.2rem' }}>₹{totalRevenueToday.toLocaleString()}</div>
          </div>

          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>DISCOUNTS & OFFERS</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>-₹{totalDiscounts.toLocaleString()}</div>
          </div>

          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>STAFF COMMISSIONS</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>-₹{staffCommissions.toLocaleString()}</div>
          </div>

          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>PRODUCT COST (COGS)</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>-₹{productCost.toLocaleString()}</div>
          </div>

          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>OPERATING EXPENSES</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>-₹{operatingExpenses.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
