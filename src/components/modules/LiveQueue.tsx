import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Clock, 
  Scissors, 
  Play, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { WalkInModal } from './WalkInModal';

export const LiveQueue: React.FC = () => {
  const { 
    queue, 
    staff, 
    updateQueueStatus, 
    assignQueueStaff, 
    setIsWalkInOpen,
    setActiveModule 
  } = useSalon();

  const waitingEntries = queue.filter(q => q.status === 'Waiting');
  const inServiceEntries = queue.filter(q => q.status === 'In Service');
  const availableStaff = staff.filter(s => s.status === 'Available');

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ec4899' }} className="pulse-active" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Real-Time Live Queue Operating Monitor</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Live customer waiting line management, staff assignment, and service duration dispatching.
          </p>
        </div>

        <button 
          onClick={() => setIsWalkInOpen(true)}
          className="btn btn-primary"
          style={{ backgroundColor: '#10b981', borderColor: '#059669' }}
        >
          <Scissors size={18} />
          <span>+ Add Walk-in Customer</span>
        </button>
      </div>

      {/* Real-time Queue Counters */}
      <div className="stats-grid">
        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Waiting in Salon
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24' }}>
            {waitingEntries.length} Customers
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Queue order active</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            In Service Now
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f472b6' }}>
            {inServiceEntries.length} In Chairs
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Stylists occupied</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Available Staff
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
            {availableStaff.length} Ready
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Ready for next customer</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Avg Queue Wait Time
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-500)' }}>
            16 mins
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>Optimal turnover rate</span>
        </div>
      </div>

      {/* Queue Columns: Waiting Line & Active Chairs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Waiting Queue List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#fbbf24" />
            <span>Waiting Line Queue ({waitingEntries.length})</span>
          </h3>

          {waitingEntries.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Clock size={36} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 600 }}>No customers currently waiting in queue!</div>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Click "+ Add Walk-in Customer" when a walk-in arrives.</p>
            </div>
          ) : (
            waitingEntries.map(entry => {
              const isHighWait = entry.waitTimeMins >= 20;
              const borderLeftColor = isHighWait ? '#ef4444' : '#f59e0b';
              const badgeBg = isHighWait ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)';
              const badgeColor = isHighWait ? '#fca5a5' : '#fbbf24';
              const qNumLabel = `#${entry.queueNumber}`;

              return (
                <div
                  key={entry.id}
                  className="glass-panel"
                  style={{
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    borderLeft: `4px solid ${borderLeftColor}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#f59e0b',
                        color: '#000000',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem'
                      }}>
                        {qNumLabel}
                      </div>

                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{entry.customerName}</h4>
                        <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                          {entry.customerPhone} • Joined at {entry.joinedAt}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: badgeBg,
                      color: badgeColor,
                      fontSize: '0.775rem',
                      fontWeight: 700
                    }}>
                      {isHighWait && <AlertCircle size={12} />}
                      <span>{entry.waitTimeMins} min wait</span>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.825rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Service: </span>
                      <strong>{entry.serviceName}</strong>
                    </div>

                    {/* Staff Assignment */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Stylist:</span>
                      <select
                        value={entry.assignedStaffId || ''}
                        onChange={e => assignQueueStaff(entry.id, e.target.value)}
                        style={{
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-strong)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-main)',
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.4rem',
                          outline: 'none'
                        }}
                      >
                        <option value="">Unassigned</option>
                        {staff.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      onClick={() => updateQueueStatus(entry.id, 'Cancelled')}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Remove
                    </button>
                    <button 
                      onClick={() => updateQueueStatus(entry.id, 'In Service')}
                      className="btn btn-sm btn-primary"
                    >
                      <Play size={13} /> Start Service Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: In Service Chairs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} color="#ec4899" />
            <span>Currently In Service Chairs ({inServiceEntries.length})</span>
          </h3>

          {inServiceEntries.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Scissors size={36} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 600 }}>No active service sessions right now.</div>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Start a waiting customer from the left column.</p>
            </div>
          ) : (
            inServiceEntries.map(entry => (
              <div
                key={entry.id}
                className="glass-panel"
                style={{
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderLeft: '4px solid #ec4899'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{entry.customerName}</h4>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{entry.serviceName}</div>
                  </div>

                  <span className="badge badge-in-service">
                    In Service
                  </span>
                </div>

                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Assigned Stylist: </span>
                    <strong style={{ color: 'var(--primary-500)' }}>{entry.assignedStaffName || 'Assigned'}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Est Finish: {entry.estimatedStartTime}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button 
                    onClick={() => {
                      updateQueueStatus(entry.id, 'Completed');
                      setActiveModule('billing');
                    }}
                    className="btn btn-sm btn-secondary"
                    style={{ color: '#34d399', borderColor: '#10b981' }}
                  >
                    <CheckCircle size={14} /> Complete & Checkout POS
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <WalkInModal />
    </div>
  );
};
