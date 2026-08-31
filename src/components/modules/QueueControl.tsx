import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ChevronDown, ArrowUp, X, UserX, AlertCircle } from 'lucide-react';

interface QueueControlItem {
  id: string;
  token: string;
  customer: string;
  service: string;
  duration: string;
  stylist: string;
  slotEst: string;
  status: 'IN SERVICE' | 'NEAR TURN' | 'CONFIRMED' | 'PRIORITY' | 'CANCELLED' | 'NO-SHOW';
  allowNoShow?: boolean;
}

export const QueueControl: React.FC = () => {
  const { staff } = useSalon();

  const [items, setItems] = useState<QueueControlItem[]>([
    { id: '1', token: '#A25', customer: 'Priya S.', service: 'Premium Haircut & Style', duration: '45 min', stylist: 'Arun', slotEst: '4:40 PM → 4:40 PM', status: 'IN SERVICE' },
    { id: '2', token: '#A26', customer: 'Kiran R.', service: 'Premium Haircut & Style', duration: '45 min', stylist: 'Arun', slotEst: '5:00 PM → 5:16 PM', status: 'NEAR TURN' },
    { id: '3', token: '#B12', customer: 'Divya M.', service: 'Hair Spa', duration: '60 min', stylist: 'Meena', slotEst: '4:20 PM → 4:20 PM', status: 'IN SERVICE' },
    { id: '4', token: '#B13', customer: 'Anjali P.', service: 'Signature Glow Facial', duration: '45 min', stylist: 'Meena', slotEst: '5:30 PM → 5:30 PM', status: 'CONFIRMED', allowNoShow: true },
    { id: '5', token: '#B14', customer: 'Sneha K.', service: 'De-Tan Treatment', duration: '40 min', stylist: 'Meena', slotEst: '6:30 PM → 6:30 PM', status: 'CONFIRMED' },
    { id: '6', token: '#C40', customer: 'Ravi B.', service: 'Classic Haircut + Beard Trim & Shape', duration: '50 min', stylist: 'Sanjay', slotEst: '4:30 PM → 4:30 PM', status: 'IN SERVICE' },
    { id: '7', token: '#C41', customer: 'Imran .', service: 'Premium Haircut & Style', duration: '45 min', stylist: 'Sanjay', slotEst: '5:00 PM → 5:25 PM', status: 'CONFIRMED' },
    { id: '8', token: '#C42', customer: 'Suresh .', service: 'Hot Towel Shave + Beard Trim & Shape', duration: '50 min', stylist: 'Sanjay', slotEst: '5:45 PM → 6:15 PM', status: 'CONFIRMED', allowNoShow: true },
    { id: '9', token: '#C43', customer: 'Teja .', service: 'Classic Haircut + Beard Trim & Shape', duration: '50 min', stylist: 'Sanjay', slotEst: '6:40 PM → 7:10 PM', status: 'CONFIRMED', allowNoShow: true },
    { id: '10', token: '#C44', customer: 'Naveen .', service: 'Premium Haircut & Style', duration: '45 min', stylist: 'Sanjay', slotEst: '7:30 PM → 8:05 PM', status: 'CONFIRMED', allowNoShow: true },
  ]);

  const handleStylistChange = (id: string, newStylist: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, stylist: newStylist } : item));
  };

  const handlePrioritise = (id: string) => {
    setItems(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(Math.max(0, idx - 1), 0, { ...moved, status: 'PRIORITY' });
      return copy;
    });
  };

  const handleCancel = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'CANCELLED' } : item));
  };

  const handleNoShow = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'NO-SHOW' } : item));
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Queue control
        </h2>
      </div>

      {/* Audit Subtitle Banner */}
      <div 
        style={{
          backgroundColor: '#FBEFD8',
          border: '1px solid rgba(197, 122, 15, 0.25)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#A66308',
          lineHeight: '1.4'
        }}
      >
        Queue order is rule-driven (in-service → scheduled time → priority → arrival). Reassign, priority, skip and cancel are audited. Nobody reorders silently.
      </div>

      {/* Queue Control Master Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>TOKEN</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>CUSTOMER</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STYLIST</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SLOT → EST.</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #E8E3DE', backgroundColor: row.status === 'CANCELLED' ? '#FFF5F5' : '#FFFFFF' }}>
                  {/* TOKEN */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 900, fontSize: '0.9rem', color: '#14121A' }}>
                    {row.token}
                  </td>

                  {/* CUSTOMER */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontSize: '0.875rem', color: '#1E1A25' }}>
                    {row.customer}
                  </td>

                  {/* SERVICE */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1E1A25' }}>{row.service}</div>
                    <div style={{ fontSize: '0.75rem', color: '#75707E' }}>{row.duration}</div>
                  </td>

                  {/* STYLIST SELECT */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <select
                        value={row.stylist}
                        onChange={(e) => handleStylistChange(row.id, e.target.value)}
                        style={{
                          backgroundColor: '#FAF8F5',
                          border: '1px solid #E8E3DE',
                          borderRadius: '8px',
                          padding: '0.35rem 1.75rem 0.35rem 0.65rem',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          color: '#1E1A25',
                          appearance: 'none',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Arun">Arun</option>
                        <option value="Meena">Meena</option>
                        <option value="Sanjay">Sanjay</option>
                        <option value="Priya">Priya</option>
                        {staff.map(s => (
                          !['Arun', 'Meena', 'Sanjay', 'Priya'].includes(s.name) && (
                            <option key={s.id} value={s.name}>{s.name}</option>
                          )
                        ))}
                      </select>
                      <ChevronDown size={14} color="#75707E" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </td>

                  {/* SLOT -> EST. */}
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', fontWeight: 600, color: '#75707E' }}>
                    {row.slotEst}
                  </td>

                  {/* STATUS BADGE */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    {row.status === 'IN SERVICE' && (
                      <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        IN SERVICE
                      </span>
                    )}
                    {row.status === 'NEAR TURN' && (
                      <span style={{ backgroundColor: '#FBEFD8', color: '#C57A0F', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        NEAR TURN
                      </span>
                    )}
                    {row.status === 'CONFIRMED' && (
                      <span style={{ backgroundColor: '#EFEBF4', color: '#2A2237', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        CONFIRMED
                      </span>
                    )}
                    {row.status === 'PRIORITY' && (
                      <span style={{ backgroundColor: '#C9A24E', color: '#14121A', fontSize: '0.675rem', fontWeight: 900, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        PRIORITY
                      </span>
                    )}
                    {row.status === 'CANCELLED' && (
                      <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        CANCELLED
                      </span>
                    )}
                    {row.status === 'NO-SHOW' && (
                      <span style={{ backgroundColor: '#E8E3DE', color: '#75707E', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        NO-SHOW
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {row.status !== 'IN SERVICE' && row.status !== 'CANCELLED' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handlePrioritise(row.id)}
                          style={{
                            backgroundColor: '#FAF8F5',
                            border: '1px solid #E8E3DE',
                            borderRadius: '8px',
                            padding: '0.3rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#1E1A25',
                            cursor: 'pointer'
                          }}
                        >
                          Prioritise
                        </button>

                        {row.allowNoShow && (
                          <button
                            onClick={() => handleNoShow(row.id)}
                            style={{
                              backgroundColor: '#FAF8F5',
                              border: '1px solid #E8E3DE',
                              borderRadius: '8px',
                              padding: '0.3rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#1E1A25',
                              cursor: 'pointer'
                            }}
                          >
                            No-show
                          </button>
                        )}

                        <button
                          onClick={() => handleCancel(row.id)}
                          style={{
                            backgroundColor: '#FBE5E1',
                            border: '1px solid rgba(217, 88, 74, 0.2)',
                            borderRadius: '8px',
                            padding: '0.3rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#D9584A',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
