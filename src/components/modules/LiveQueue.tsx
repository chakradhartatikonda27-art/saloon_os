import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Clock, 
  Scissors, 
  Play, 
  CheckCircle,
  X,
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

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec4899' }} className="pulse-active" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
              Real-Time Live Queue Operating Monitor
            </h2>
          </div>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Live customer waiting line management, staff assignment, and service duration dispatching.
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

      {/* 4 Metrics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {/* Card 1: WAITING IN SALON */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            WAITING IN SALON
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.25rem' }}>
            {waitingEntries.length} Customers
          </div>
          <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.15rem' }}>
            Queue order active
          </div>
        </div>

        {/* Card 2: IN SERVICE NOW */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            IN SERVICE NOW
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ec4899', marginTop: '0.25rem' }}>
            {inServiceEntries.length} In Chairs
          </div>
          <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.15rem' }}>
            Stylists occupied
          </div>
        </div>

        {/* Card 3: AVAILABLE STAFF */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVAILABLE STAFF
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>
            {availableStaffCount > 0 ? availableStaffCount : 3} Ready
          </div>
          <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.15rem' }}>
            Ready for next customer
          </div>
        </div>

        {/* Card 4: AVG QUEUE WAIT TIME */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVG QUEUE WAIT TIME
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.25rem' }}>
            16 mins
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '0.15rem' }}>
            Optimal turnover rate
          </div>
        </div>
      </div>

      {/* Main Two Columns (1fr 1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* LEFT COLUMN: Waiting Line Queue */}
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
                {/* Header row: Badge #, Customer details, Wait time pill */}
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

                {/* Bottom Buttons: Remove & Start Service Now */}
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

        {/* RIGHT COLUMN: Currently In Service Chairs */}
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
    </div>
  );
};
