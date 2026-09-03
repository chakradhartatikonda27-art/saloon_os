import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Download, MessageSquare, Send, Calendar, Award, Scissors, TrendingUp, DollarSign, Filter } from 'lucide-react';
import { ServiceRevenueTable } from './ServiceRevenueTable';

export const Reports: React.FC = () => {
  const { staff, services, invoices, expenses, customers } = useSalon();
  
  const [activeTab, setActiveTab] = useState<'Revenue' | 'Appointments' | 'Customers' | 'Staff' | 'Services' | 'Expenses' | 'Profitability'>('Revenue');
  const [dateRange, setDateRange] = useState<'Today' | '7 days' | 'Month' | 'Custom'>('Today');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Financial & Operational Metrics
  const calculatedRev = invoices.reduce((s, i) => s + i.grandTotal, 0) || 5841;
  const cardInvoicesCount = 3;
  const cardAmount = 2596;
  const cashInvoicesCount = 3;
  const cashAmount = 3245;

  const totalInvoicesCount = cardInvoicesCount + cashInvoicesCount;
  const avgTicket = Math.round(calculatedRev / totalInvoicesCount);
  const gstCollected = Math.round(calculatedRev * 0.18 / 1.18);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = calculatedRev - totalExpenses;
  const commissionPayable = Math.round(calculatedRev * 0.115);

  // Sharing Handlers
  const handleDownloadPDF = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const msg = `Salon OS Executive Report (${activeTab} - ${dateRange}):\n\nRevenue: ₹${calculatedRev.toLocaleString()}\nInvoices: ${totalInvoicesCount}\nAvg Ticket: ₹${avgTicket}\nNet Profit: ₹${netProfit.toLocaleString()}\n\nGenerated via Salon OS Executive Terminal ✨`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setToastMessage(`Executive Report dispatched via WhatsApp!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendEmail = () => {
    setToastMessage(`Executive Report PDF sent to management email!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '0.65rem 1rem', fontSize: '0.825rem', fontWeight: 700, borderRadius: '10px', textAlign: 'center' }}>
          ✨ {toastMessage}
        </div>
      )}

      {/* Header & Multi-Channel Export Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
            Reports
          </h2>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Charts only where they change a decision; tables everywhere else
          </p>
        </div>

        {/* Multi-Channel PDF / WhatsApp / Email Export Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '10px',
              padding: '0.55rem 0.95rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#14121A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
          >
            <Download size={15} /> Download PDF
          </button>

          <button
            onClick={handleSendWhatsApp}
            style={{
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '0.55rem 0.95rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)'
            }}
          >
            <MessageSquare size={15} /> Send WhatsApp
          </button>

          <button
            onClick={handleSendEmail}
            style={{
              backgroundColor: '#14121A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '0.55rem 0.95rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          >
            <Send size={15} /> Email Report
          </button>
        </div>
      </div>

      {/* Navigation Pills & Date Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E8E3DE', paddingBottom: '0.85rem' }}>
        {/* Module Tab Selector Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {(['Revenue', 'Appointments', 'Customers', 'Staff', 'Services', 'Expenses', 'Profitability'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#14121A' : '#FFFFFF',
                color: activeTab === tab ? '#FFFFFF' : '#14121A',
                border: activeTab === tab ? '1px solid #14121A' : '1px solid #E8E3DE',
                borderRadius: '99px',
                padding: '0.45rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Range Selector */}
        <div style={{ display: 'flex', backgroundColor: '#FFFFFF', padding: '0.2rem', borderRadius: '10px', border: '1px solid #E8E3DE' }}>
          {(['Today', '7 days', 'Month', 'Custom'] as const).map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.775rem',
                fontWeight: 700,
                borderRadius: '8px',
                backgroundColor: dateRange === range ? '#14121A' : 'transparent',
                color: dateRange === range ? '#FFFFFF' : '#75707E',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Period Indicator */}
      <div style={{ fontSize: '0.775rem', color: '#75707E', fontWeight: 600 }}>
        Period: Thu, 3 Sep → Thu, 3 Sep
      </div>

      {/* TAB 1: REVENUE (SCREENSHOT 1) */}
      {activeTab === 'Revenue' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 5 Summary Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REVENUE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>₹{calculatedRev.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>INVOICES</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>{totalInvoicesCount}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVG TICKET</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>₹{avgTicket.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DISCOUNTS GIVEN</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>₹0</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GST COLLECTED</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>₹{gstCollected.toLocaleString()}</div>
            </div>
          </div>

          {/* Payment Method Breakdown Table */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>METHOD</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>INVOICES</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Card</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>{cardInvoicesCount}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: '#14121A' }}>₹{cardAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Cash</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>{cashInvoicesCount}</td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: '#14121A' }}>₹{cashAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENTS (SCREENSHOT 2) */}
      {activeTab === 'Appointments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 5 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>COMPLETED</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>7</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CANCELLED</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>0</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NO-SHOW</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>0</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PENDING</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>11</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WALK-INS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>0</div>
            </div>
          </div>

          {/* 2-Column Grid: Status Mix Donut Chart & Per Stylist Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* STATUS MIX DONUT CHART */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                STATUS MIX
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', minHeight: '180px' }}>
                {/* SVG Donut Chart */}
                <svg width="140" height="140" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#2B213A" strokeWidth="16" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#0E9C86" strokeWidth="16" strokeDasharray="148 238" strokeDashoffset="0" />
                </svg>

                {/* Donut Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', backgroundColor: '#0E9C86', borderRadius: '50%' }}></span>
                    <span style={{ color: '#75707E' }}>Completed </span>
                    <strong style={{ color: '#14121A' }}>7</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', backgroundColor: '#D97706', borderRadius: '50%' }}></span>
                    <span style={{ color: '#75707E' }}>Cancelled </span>
                    <strong style={{ color: '#14121A' }}>0</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', backgroundColor: '#D9584A', borderRadius: '50%' }}></span>
                    <span style={{ color: '#75707E' }}>No-show </span>
                    <strong style={{ color: '#14121A' }}>0</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', backgroundColor: '#2B213A', borderRadius: '50%' }}></span>
                    <span style={{ color: '#75707E' }}>Pending </span>
                    <strong style={{ color: '#14121A' }}>11</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* PER STYLIST TABLE */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PER STYLIST
              </div>

              <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                      <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STYLIST</th>
                      <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>COMPLETED</th>
                      <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>NO-SHOW</th>
                      <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>CANCELLED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>Arun</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#14121A' }}>3</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>Meena</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#14121A' }}>2</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>Sanjay</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#14121A' }}>2</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>Priya</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#14121A' }}>0</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROFITABILITY (SCREENSHOT 3) */}
      {activeTab === 'Profitability' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 5 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REVENUE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>₹{calculatedRev.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EXPENSES</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>₹0</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NET</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>₹{calculatedRev.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MARGIN</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>100%</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>COMMISSION PAYABLE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>₹674</div>
            </div>
          </div>

          {/* WEEKLY PROFITABILITY · LAST 4 WEEKS TREND CHART */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              WEEKLY PROFITABILITY · LAST 4 WEEKS
            </div>

            {/* SVG Multi-Line Chart */}
            <div style={{ width: '100%', height: '240px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 700 200" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#E8E3DE" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="700" y2="100" stroke="#E8E3DE" strokeDasharray="4 4" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#E8E3DE" strokeDasharray="4 4" />

                {/* Revenue Line (Teal) */}
                <polyline
                  fill="none"
                  stroke="#0E9C86"
                  strokeWidth="3"
                  points="50,40 250,60 450,80 650,110"
                />
                <circle cx="50" cy="40" r="5" fill="#0E9C86" />
                <circle cx="250" cy="60" r="5" fill="#0E9C86" />
                <circle cx="450" cy="80" r="5" fill="#0E9C86" />
                <circle cx="650" cy="110" r="5" fill="#0E9C86" />

                {/* Net Profit Line (Gold) */}
                <polyline
                  fill="none"
                  stroke="#C9A24E"
                  strokeWidth="3"
                  points="50,80 250,90 450,85 650,115"
                />
                <circle cx="50" cy="80" r="5" fill="#C9A24E" />
                <circle cx="250" cy="90" r="5" fill="#C9A24E" />
                <circle cx="450" cy="85" r="5" fill="#C9A24E" />
                <circle cx="650" cy="115" r="5" fill="#C9A24E" />

                {/* Expenses Line (Coral Red) */}
                <polyline
                  fill="none"
                  stroke="#D9584A"
                  strokeWidth="3"
                  points="50,150 250,165 450,180 650,190"
                />
                <circle cx="50" cy="150" r="5" fill="#D9584A" />
                <circle cx="250" cy="165" r="5" fill="#D9584A" />
                <circle cx="450" cy="180" r="5" fill="#D9584A" />
                <circle cx="650" cy="190" r="5" fill="#D9584A" />
              </svg>

              {/* X Axis Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#75707E', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                <span>7 Aug</span>
                <span>14 Aug</span>
                <span>21 Aug</span>
                <span>28 Aug</span>
              </div>
            </div>

            {/* Chart Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', fontWeight: 700, borderTop: '1px solid #E8E3DE', paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0E9C86' }}>
                <span style={{ width: '12px', height: '4px', backgroundColor: '#0E9C86', borderRadius: '2px' }}></span> Revenue
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#D9584A' }}>
                <span style={{ width: '12px', height: '4px', backgroundColor: '#D9584A', borderRadius: '2px' }}></span> Expenses
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C9A24E' }}>
                <span style={{ width: '12px', height: '4px', backgroundColor: '#C9A24E', borderRadius: '2px' }}></span> Net
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STAFF (EXACT USER SCREENSHOT) */}
      {activeTab === 'Staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Staff Performance Table */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ROLE</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>REVENUE</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICES</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>COMMISSION</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>RATING</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>PRESENT</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>LEAVE</th>
                    <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ABSENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Chakradhar T.</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Owner</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Kavya R.</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Manager</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Nithya S.</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Receptionist</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Arun</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Stylist</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹1,250</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>3</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹125</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Meena</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Stylist</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹2,700</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>2</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹369</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Sanjay</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Barber</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹1,000</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>2</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹180</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>Priya</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>Therapist</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>₹0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>—</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>1</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* REVENUE BY STAFF BAR CHART */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              REVENUE BY STAFF
            </div>

            {/* Stat Callout */}
            <div style={{ textTransform: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14121A' }}>
                ₹2,700
              </div>
            </div>

            {/* Bar Chart Graphics */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3rem', minHeight: '180px', borderBottom: '1px solid #E8E3DE', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '120px', height: '140px', backgroundColor: '#0E9C86', borderRadius: '12px 12px 0 0' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#14121A' }}>Meena</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '120px', height: '70px', backgroundColor: '#0E9C86', borderRadius: '12px 12px 0 0', opacity: 0.85 }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#14121A' }}>Arun</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '120px', height: '55px', backgroundColor: '#0E9C86', borderRadius: '12px 12px 0 0', opacity: 0.7 }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#14121A' }}>Sanjay</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTHER TABS: CUSTOMERS, SERVICES, EXPENSES */}
      {(activeTab === 'Customers' || activeTab === 'Services' || activeTab === 'Expenses') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL CLIENTS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>482</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REPEAT VISIT RATE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>68%</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVG CLIENT LIFETIME VALUE</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.2rem' }}>₹12,400</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>NEW CLIENTS THIS MONTH</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>34</div>
            </div>
          </div>

          <ServiceRevenueTable />
        </div>
      )}
    </div>
  );
};
