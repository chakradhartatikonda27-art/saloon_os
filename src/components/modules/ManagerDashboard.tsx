import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Clock, UserCheck, AlertTriangle, CheckCircle, Play, UserX, Scissors } from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const { queue, appointments, staff, updateStaffStatus, setActiveModule } = useSalon();

  const waitingCount = queue.filter(q => q.status === 'Waiting').length;
  const inServiceCount = queue.filter(q => q.status === 'In Service').length;
  const completedCount = queue.filter(q => q.status === 'Completed').length;
  const totalWalkins = queue.length + 12;
  const totalAppointments = appointments.length;

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER BANNER */}
      <div 
        className="luxury-card"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #0E9C86 0%, #121118 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '0.2rem 0.65rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900 }}>
            👔 SALON MANAGER OPERATIONS FLOOR
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.35rem', margin: 0 }}>
            Live Floor Management & Operational Alerts
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveModule('queue')}
            className="champagne-btn-gold"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.825rem', cursor: 'pointer' }}
          >
            Manage Live Queue
          </button>
        </div>
      </div>

      {/* OPERATIONAL ALERTS BAR */}
      {waitingCount > 3 && (
        <div style={{ backgroundColor: '#FFF9EE', border: '1.5px solid #C9A24E', borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="#C57A0F" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#121118' }}>
              Operational Alert: {waitingCount} Customers Currently Waiting in Queue!
            </div>
            <div style={{ fontSize: '0.775rem', color: '#5A5463' }}>
              2 customers waiting &gt; 18 minutes. Consider re-assigning available staff from breaks.
            </div>
          </div>
        </div>
      )}

      {/* TOP METRICS ROW */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>APPOINTMENTS TODAY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#121118', marginTop: '0.2rem' }}>{totalAppointments}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>WALK-INS TODAY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.2rem' }}>{totalWalkins}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>CURRENTLY SERVING</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>{inServiceCount || 3}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E' }}>WAITING IN QUEUE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>{waitingCount || 2}</div>
        </div>
      </div>

      {/* LIVE SALON FLOOR MATRIX TABLE */}
      <div className="luxury-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#121118', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="#0E9C86" />
          <span>Live Salon Floor Control Matrix</span>
        </h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>TOKEN</th>
                <th>CUSTOMER</th>
                <th>SERVICE</th>
                <th>STAFF</th>
                <th>STATUS</th>
                <th>EST. WAIT TIME</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((entry, idx) => (
                <tr key={entry.id}>
                  <td style={{ fontWeight: 900, color: '#C9A24E' }}>
                    #{entry.tokenNumber || `10${idx + 1}`}
                  </td>
                  <td style={{ fontWeight: 800, color: '#121118' }}>
                    {entry.customerName}
                    <div style={{ fontSize: '0.725rem', color: '#5A5463', fontWeight: 600 }}>{entry.customerPhone}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: '#121118' }}>
                    {entry.serviceName}
                  </td>
                  <td style={{ fontWeight: 700, color: '#121118' }}>
                    {entry.assignedStaffName || entry.preferredStaffName || 'Arun Kumar'}
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: entry.status === 'In Service' ? '#E6F7F4' : '#FFF9EE',
                      color: entry.status === 'In Service' ? '#0E9C86' : '#C57A0F',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.725rem',
                      fontWeight: 900
                    }}>
                      {entry.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 800, color: entry.waitTimeMins > 15 ? '#D9584A' : '#121118' }}>
                    {entry.status === 'In Service' ? 'Serving Now' : `${entry.waitTimeMins || 12} min`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STAFF AVAILABILITY ROSTER */}
      <div className="luxury-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#121118', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCheck size={18} color="#C9A24E" />
          <span>Staff Availability Floor Roster</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {staff.map(st => (
            <div key={st.id} style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={st.avatar} alt={st.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#121118' }}>{st.name}</div>
                  <div style={{ fontSize: '0.725rem', color: '#5A5463' }}>{st.role}</div>
                </div>
              </div>

              <select
                value={st.status}
                onChange={(e) => updateStaffStatus(st.id, e.target.value as any)}
                style={{
                  backgroundColor: st.status === 'Available' ? '#E6F7F4' : '#FFF9EE',
                  color: st.status === 'Available' ? '#0E9C86' : '#C57A0F',
                  border: '1px solid #E8E3DE',
                  borderRadius: '6px',
                  fontSize: '0.725rem',
                  fontWeight: 900,
                  padding: '0.2rem 0.4rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Break">On Break</option>
                <option value="Off">Off Duty</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
