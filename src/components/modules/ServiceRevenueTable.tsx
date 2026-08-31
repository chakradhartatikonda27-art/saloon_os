import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, Sparkles } from 'lucide-react';

export type TimeRange = 'today' | '7d' | '15d' | '30d' | '3m' | 'custom';

interface ServiceRowData {
  service: string;
  category: string;
  baseRev: number;
  baseBookings: number;
}

const baseServiceData: ServiceRowData[] = [
  { service: 'Global Hair Color', category: 'Color', baseRev: 67500, baseBookings: 29 },
  { service: 'Hair Spa', category: 'Hair', baseRev: 67200, baseBookings: 57 },
  { service: 'Signature Glow Facial', category: 'Facial', baseRev: 57000, baseBookings: 39 },
  { service: 'De-Tan Treatment', category: 'Skin', baseRev: 38700, baseBookings: 45 },
  { service: 'Premium Haircut & Style', category: 'Hair', baseRev: 38350, baseBookings: 62 },
  { service: 'Manicure', category: 'Other', baseRev: 37200, baseBookings: 64 },
  { service: 'Head & Shoulder Massage', category: 'Spa', baseRev: 33600, baseBookings: 50 },
  { service: 'Root Touch-up', category: 'Color', baseRev: 31900, baseBookings: 33 },
  { service: 'Classic Haircut', category: 'Hair', baseRev: 24850, baseBookings: 73 },
  { service: 'Hot Towel Shave', category: 'Beard', baseRev: 19200, baseBookings: 50 },
  { service: 'Beard Trim & Shape', category: 'Beard', baseRev: 12000, baseBookings: 49 },
];

export const ServiceRevenueTable: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30d');
  const [fromDate, setFromDate] = useState<string>('2026-08-01');
  const [toDate, setToDate] = useState<string>('2026-08-31');

  // Compute multiplier based on selected time range
  const getRangeMultiplierAndLabel = () => {
    switch (selectedRange) {
      case 'today':
        return { multiplier: 1 / 30, label: 'Today (Day-wise)' };
      case '7d':
        return { multiplier: 7 / 30, label: 'Weekly (Last 7 Days)' };
      case '15d':
        return { multiplier: 15 / 30, label: 'Last 15 Days' };
      case '30d':
        return { multiplier: 1, label: 'Last 30 Days' };
      case '3m':
        return { multiplier: 3, label: 'Last 3 Months (90 Days)' };
      case 'custom': {
        const start = new Date(fromDate).getTime();
        const end = new Date(toDate).getTime();
        const diffDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
        return { multiplier: diffDays / 30, label: `Custom Range (${diffDays} Days)` };
      }
      default:
        return { multiplier: 1, label: '30 Days' };
    }
  };

  const { multiplier, label: rangeLabel } = getRangeMultiplierAndLabel();

  // Dynamic rows calculation
  const calculatedRows = baseServiceData.map(item => {
    const rev = Math.round(item.baseRev * multiplier);
    const bookings = Math.max(1, Math.round(item.baseBookings * multiplier));
    const avgTicket = Math.round(rev / bookings);
    return {
      service: item.service,
      category: item.category,
      revenue: `₹${rev.toLocaleString()}`,
      bookings,
      avgTicket: `₹${avgTicket.toLocaleString()}`
    };
  });

  const rangeButtons: { id: TimeRange; label: string }[] = [
    { id: 'today', label: 'Day-wise (Today)' },
    { id: '7d', label: 'Weekly (7D)' },
    { id: '15d', label: '15 Days' },
    { id: '30d', label: '30 Days' },
    { id: '3m', label: '3 Months' },
    { id: 'custom', label: '📅 Custom Range' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px' }}>
      {/* Table Title & Range Selector Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={14} color="#C9A24E" />
            <span>SERVICE REVENUE • {rangeLabel.toUpperCase()}</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#75707E', marginTop: '0.2rem' }}>
            Filtered performance view by service category, revenue, volume & ticket size.
          </p>
        </div>

        {/* Time Range Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {rangeButtons.map(btn => {
            const isSelected = selectedRange === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setSelectedRange(btn.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.775rem',
                  fontWeight: isSelected ? 800 : 600,
                  backgroundColor: isSelected ? '#C9A24E' : '#FAF8F5',
                  color: isSelected ? '#14121A' : '#75707E',
                  border: isSelected ? '1px solid #B8913D' : '1px solid #E8E3DE',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Date Range Selection Controls */}
      {selectedRange === 'custom' && (
        <div style={{
          backgroundColor: '#FAF8F5',
          border: '1px solid #C9A24E',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} color="#C9A24E" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E1A25' }}>Select Custom Date Range:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E' }}>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '8px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.825rem',
                color: '#1E1A25',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E' }}>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '8px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.825rem',
                color: '#1E1A25',
                outline: 'none'
              }}
            />
          </div>

          <span style={{ fontSize: '0.775rem', color: '#0E9C86', fontWeight: 700, marginLeft: 'auto' }}>
            ✓ Filtering data between {fromDate} and {toDate}
          </span>
        </div>
      )}

      {/* Main Table */}
      <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>SERVICE</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>CATEGORY</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>REVENUE</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>BOOKINGS</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>AVG TICKET</th>
            </tr>
          </thead>
          <tbody>
            {calculatedRows.map(row => (
              <tr key={row.service} style={{ borderBottom: '1px solid #E8E3DE', transition: 'background-color 0.15s ease' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#1E1A25', fontSize: '0.875rem' }}>{row.service}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#75707E', fontSize: '0.85rem' }}>{row.category}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#1E1A25', fontSize: '0.875rem', textAlign: 'right' }}>{row.revenue}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#75707E', fontSize: '0.85rem', textAlign: 'center' }}>{row.bookings}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1E1A25', fontSize: '0.875rem', textAlign: 'right' }}>{row.avgTicket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
