import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Clock, 
  Scissors, 
  Play, 
  CheckCircle, 
  AlertCircle,
  UserCheck,
  Sparkles
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
    { text: '#A26 · Kiran R. · starting ~11 min late · customer notified' },
    { text: '#C41 · Imran . · starting ~25 min late · customer notified' },
  ];

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0E9C86' }} className="pulse-active" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
              Live operations
            </h2>
          </div>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Real-time floor monitor, stylist dispatches, interactive customer queue dispatches & delay notifications.
          </p>
        </div>

        <button 
          onClick={() => setIsWalkInOpen(true)}
          className="btn btn-primary"
        >
          <Scissors size={16} />
          <span>+ Add Walk-in Customer</span>
        </button>
      </div>

      {/* Top 5 Situation Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WAITING</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>{waitingEntries.length + 5}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IN SERVICE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0E9C86', marginTop: '0.2rem' }}>{inServiceEntries.length + 2}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVAILABLE STAFF</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>0/4</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DELAYED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D9584A', marginTop: '0.2rem' }}>7</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AVG WAIT</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#14121A', marginTop: '0.2rem' }}>
            97 <span style={{ fontSize: '1rem', fontWeight: 600 }}>min</span>
          </div>
        </div>
      </div>

      {/* Main Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* LEFT COLUMN: LIVE STYLIST STATIONS & INTERACTIVE QUEUE MANAGEMENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* LIVE NOW STYLIST STATIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              LIVE NOW (STATION DISPATCHES)
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
                    <div style={{ fontSize: '0.75rem', color: '#75707E' }}>In service • free at 6:01 PM</div>
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
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D9584A' }}>+6 over</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  #A26 5:11 PM
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
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#75707E' }}>19 min left</span>
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
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#75707E' }}>19 min left</span>
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

          {/* INTERACTIVE WAITING QUEUE LIST WITH BUTTON ACTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#C9A24E" />
              <span>INTERACTIVE WAITING QUEUE DISPATCH ({waitingEntries.length})</span>
            </div>

            {waitingEntries.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#75707E', fontSize: '0.85rem' }}>
                All waiting customers have been assigned to chairs! Click <strong>+ Add Walk-in Customer</strong> to queue a new customer.
              </div>
            ) : (
              waitingEntries.map(entry => (
                <div
                  key={entry.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#C9A24E',
                        color: '#14121A',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem'
                      }}>
                        #{entry.queueNumber}
                      </div>

                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E1A25' }}>{entry.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#75707E' }}>
                          {entry.serviceName} • Joined at {entry.joinedAt} ({entry.waitTimeMins} min wait)
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select
                        value={entry.preferredStaffName || ''}
                        onChange={(e) => assignQueueStaff(entry.id, e.target.value)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E8E3DE',
                          borderRadius: '8px',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.775rem',
                          color: '#1E1A25',
                          outline: 'none'
                        }}
                      >
                        <option value="">Select Stylist</option>
                        {staff.map(s => (
                          <option key={s.id} value={s.name}>{s.name} ({s.status})</option>
                        ))}
                      </select>

                      <button
                        onClick={() => updateQueueStatus(entry.id, 'In Service')}
                        className="btn btn-sm btn-primary"
                      >
                        <Play size={12} /> Start Service
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: UPCOMING APPOINTMENTS & DELAYED SERVICES */}
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
        </div>
      </div>
    </div>
  );
};
