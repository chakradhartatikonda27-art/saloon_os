import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Clock, 
  Scissors, 
  Play, 
  CheckCircle, 
  AlertCircle,
  Bell,
  Activity,
  UserCheck
} from 'lucide-react';

export const LiveQueue: React.FC = () => {
  const { 
    queue, 
    staff, 
    updateQueueStatus, 
    assignQueueStaff, 
    setIsWalkInOpen 
  } = useSalon();

  const waitingEntries = queue.filter(q => q.status === 'Waiting');
  const inServiceEntries = queue.filter(q => q.status === 'In Service');
  const availableStaffCount = staff.filter(s => s.status === 'Available').length;

  const upcomingAppointmentsList = [
    { time: '5:00 PM', token: '#A26', customer: 'Kiran R.', stylist: 'Arun', status: 'NEAR TURN' },
    { time: '5:00 PM', token: '#C41', customer: 'Imran .', stylist: 'Sanjay', status: 'CONFIRMED' },
    { time: '5:30 PM', token: '#B13', customer: 'Anjali P.', stylist: 'Meena', status: 'CONFIRMED' },
    { time: '5:45 PM', token: '#C42', customer: 'Suresh .', stylist: 'Sanjay', status: 'CONFIRMED' },
    { time: '6:30 PM', token: '#B14', customer: 'Sneha K.', stylist: 'Meena', status: 'CONFIRMED' },
    { time: '6:40 PM', token: '#C43', customer: 'Teja .', stylist: 'Sanjay', status: 'CONFIRMED' },
    { time: '7:30 PM', token: '#C44', customer: 'Naveen .', stylist: 'Sanjay', status: 'CONFIRMED' },
    { time: '8:15 PM', token: '#C45', customer: 'Harsha .', stylist: 'Sanjay', status: 'CONFIRMED' },
  ];

  const delayedAlerts = [
    { text: '#A25 · Priya S. · running over · customer notified' },
    { text: '#A26 · Kiran R. · starting ~22 min late · customer notified' },
    { text: '#C41 · Imran . · starting ~25 min late · customer notified' },
  ];

  const customerAlertsLast5 = [
    { time: '4:50 PM', text: '🎁 Your birthday offer is waiting' },
    { time: '4:50 PM', text: '⭐ Loyalty updated' },
    { time: '4:42 PM', text: '📱 WhatsApp appointment reminder sent to Rahul S.' },
    { time: '4:30 PM', text: '🎉 Gold VIP Membership unlocked for Anjali P.' },
    { time: '4:15 PM', text: '💬 Feedback request sent for Token #A20' },
  ];

  const realtimeEventStream = [
    { time: '4:50 PM', text: 'Salon opened · live queue engine started' },
    { time: '4:45 PM', text: 'Auto-sync: 4 master stylists online' },
    { time: '4:35 PM', text: 'Smart Token #A25 dispatched to Arun' },
    { time: '4:10 PM', text: 'POS Cashier shift started by Ananya S.' },
  ];

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec4899' }} className="pulse-active" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
              Real-Time Live Queue Operating Monitor
            </h2>
          </div>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Live customer waiting line management, staff assignment, station dispatches, and realtime event log.
          </p>
        </div>

        <button 
          onClick={() => setIsWalkInOpen(true)}
          style={{
            backgroundColor: '#10b981',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '99px',
            padding: '0.65rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
          }}
        >
          <Scissors size={16} />
          <span>+ Add Walk-in Customer</span>
        </button>
      </div>

      {/* Top 5 Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WAITING</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>8</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IN SERVICE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0E9C86', marginTop: '0.2rem' }}>3</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVAILABLE STAFF</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>0/4</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DELAYED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D9584A', marginTop: '0.2rem' }}>7</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVG WAIT</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>
            87 <span style={{ fontSize: '1rem', fontWeight: 600 }}>min</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE WAITING QUEUE & ACTIVE CHAIRS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* LEFT: Waiting Line Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14121A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#f59e0b" />
            <span>Waiting Line Queue ({waitingEntries.length})</span>
          </div>

          {waitingEntries.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', color: '#75707E' }}>
              <Clock size={36} color="#CBD5E1" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1E1A25' }}>No customers currently waiting in queue!</div>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Click "+ Add Walk-in Customer" when a walk-in arrives.</p>
            </div>
          ) : (
            waitingEntries.map((entry, idx) => (
              <div
                key={entry.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#f59e0b',
                      color: '#14121A',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem'
                    }}>
                      #{idx + 1}
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#14121A' }}>{entry.customerName}</div>
                      <div style={{ fontSize: '0.775rem', color: '#75707E', marginTop: '0.1rem' }}>
                        {entry.customerPhone} • Joined at {entry.joinedAt}
                      </div>
                    </div>
                  </div>

                  <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '99px' }}>
                    {entry.waitTimeMins} min wait
                  </span>
                </div>

                {/* Dark Slate Bar: Service Name & Stylist Selector */}
                <div style={{
                  backgroundColor: '#64748B',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#FFFFFF'
                }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{entry.serviceName}</span>

                  <select
                    value={entry.preferredStaffName || ''}
                    onChange={(e) => assignQueueStaff(entry.id, e.target.value)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1E1A25',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Unassigned</option>
                    {staff.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.65rem' }}>
                  <button
                    onClick={() => updateQueueStatus(entry.id, 'Cancelled')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E3DE',
                      borderRadius: '8px',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      color: '#75707E',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => updateQueueStatus(entry.id, 'In Service')}
                    style={{
                      backgroundColor: '#C9A24E',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#14121A',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Play size={13} fill="#14121A" />
                    <span>Start Service Now</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Currently In Service Chairs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14121A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} color="#ec4899" />
            <span>Currently In Service Chairs ({inServiceEntries.length})</span>
          </div>

          {inServiceEntries.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '3.5rem 1.5rem', textAlign: 'center', color: '#75707E' }}>
              <Scissors size={42} color="#CBD5E1" style={{ marginBottom: '0.75rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#14121A' }}>
                No active service sessions right now.
              </div>
              <p style={{ fontSize: '0.825rem', color: '#75707E', marginTop: '0.25rem' }}>
                Start a waiting customer from the left column.
              </p>
            </div>
          ) : (
            inServiceEntries.map(entry => (
              <div
                key={entry.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#DDF4EF',
                      color: '#0E9C86',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem'
                    }}>
                      <Scissors size={18} />
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#14121A' }}>{entry.customerName}</div>
                      <div style={{ fontSize: '0.775rem', color: '#75707E' }}>
                        {entry.serviceName} • Stylist: <strong>{entry.preferredStaffName || 'Assigned'}</strong>
                      </div>
                    </div>
                  </div>

                  <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                    IN CHAIR
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.65rem' }}>
                  <button
                    onClick={() => updateQueueStatus(entry.id, 'Completed')}
                    style={{
                      backgroundColor: '#0E9C86',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>Complete Service</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 2: LIVE FLOOR STATIONS & UPCOMING SCHEDULING STREAM */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* LEFT COLUMN: LIVE NOW STYLIST STATIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            LIVE NOW (STYLIST DISPATCHES)
          </div>

          {/* Station 1: Arun */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#2A2237', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                  A
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#14121A' }}>Arun</div>
                  <div style={{ fontSize: '0.75rem', color: '#75707E' }}>In service • free at 6:12 PM</div>
                </div>
              </div>

              <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                Running over
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #E8E3DE', paddingTop: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#14121A', marginRight: '0.5rem' }}>#A25</span>
                <span style={{ fontSize: '0.85rem', color: '#1E1A25' }}>Priya S. • Premium Haircut & Style</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D9584A' }}>+17 over</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                #A26 5:22 PM
              </span>
            </div>
          </div>

          {/* Station 2: Meena */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0E9C86', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                  M
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#14121A' }}>Meena</div>
                  <div style={{ fontSize: '0.75rem', color: '#75707E' }}>In service • free at 7:15 PM</div>
                </div>
              </div>

              <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                On time
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #E8E3DE', paddingTop: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#14121A', marginRight: '0.5rem' }}>#B12</span>
                <span style={{ fontSize: '0.85rem', color: '#1E1A25' }}>Divya M. • Hair Spa</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#75707E' }}>8 min left</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#B13 5:30 PM</span>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#B14 6:30 PM</span>
            </div>
          </div>

          {/* Station 3: Sanjay */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#9B8B38', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                  S
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#14121A' }}>Sanjay</div>
                  <div style={{ fontSize: '0.75rem', color: '#75707E' }}>In service • free at 9:30 PM</div>
                </div>
              </div>

              <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                On time
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #E8E3DE', paddingTop: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#14121A', marginRight: '0.5rem' }}>#C40</span>
                <span style={{ fontSize: '0.85rem', color: '#1E1A25' }}>Ravi B. • Classic Haircut + Beard Trim & Shape</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#75707E' }}>8 min left</span>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#C41 5:25 PM</span>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#C42 6:15 PM</span>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#C43 7:10 PM</span>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#C44 8:05 PM</span>
              <span style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#14121A', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>#C45 8:55 PM</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: UPCOMING APPOINTMENTS, DELAYED SERVICES, CUSTOMER ALERTS & REALTIME EVENT STREAM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* UPCOMING APPOINTMENTS TABLE */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              UPCOMING APPOINTMENTS
            </div>

            <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                    <th style={{ padding: '0.65rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>TIME</th>
                    <th style={{ padding: '0.65rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>TOKEN</th>
                    <th style={{ padding: '0.65rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>CUSTOMER</th>
                    <th style={{ padding: '0.65rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>STYLIST</th>
                    <th style={{ padding: '0.65rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointmentsList.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #E8E3DE' }}>
                      <td style={{ padding: '0.65rem 0.75rem', fontSize: '0.8rem', color: '#75707E' }}>{row.time}</td>
                      <td style={{ padding: '0.65rem 0.75rem', fontSize: '0.85rem', fontWeight: 900, color: '#14121A' }}>{row.token}</td>
                      <td style={{ padding: '0.65rem 0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#1E1A25' }}>{row.customer}</td>
                      <td style={{ padding: '0.65rem 0.75rem', fontSize: '0.8rem', color: '#75707E' }}>{row.stylist}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        {row.status === 'NEAR TURN' ? (
                          <span style={{ backgroundColor: '#FBEFD8', color: '#C57A0F', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '99px' }}>
                            NEAR TURN
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#EFEBF4', color: '#2A2237', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '99px' }}>
                            CONFIRMED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DELAYED SERVICES NOTIFICATION BANNERS */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              DELAYED SERVICES
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {delayedAlerts.map((alert, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FBEFD8',
                    border: '1px solid rgba(197, 122, 15, 0.3)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    color: '#C57A0F'
                  }}
                >
                  {alert.text}
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER ALERTS (LAST 5) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CUSTOMER ALERTS (LAST 5)
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', overflow: 'hidden' }}>
              {customerAlertsLast5.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.25rem', 
                    padding: '0.85rem 1.1rem',
                    borderBottom: idx === customerAlertsLast5.length - 1 ? 'none' : '1px dashed #E8E3DE' 
                  }}
                >
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#75707E', minWidth: '60px' }}>
                    {item.time}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E1A25' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* REALTIME EVENT STREAM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              REALTIME EVENT STREAM
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', overflow: 'hidden' }}>
              {realtimeEventStream.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.25rem', 
                    padding: '0.85rem 1.1rem',
                    borderBottom: idx === realtimeEventStream.length - 1 ? 'none' : '1px dashed #E8E3DE' 
                  }}
                >
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#75707E', minWidth: '60px' }}>
                    {item.time}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E1A25' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
