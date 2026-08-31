import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  Clock, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Play, 
  CheckCircle, 
  Plus, 
  Scissors, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    appointments, 
    queue, 
    staff, 
    setActiveModule, 
    setIsWalkInOpen, 
    setIsAppointmentModalOpen,
    updateAppointmentStatus,
    updateQueueStatus
  } = useSalon();

  const totalRev = 24850;
  const cashRev = 8200;
  const upiRev = 12400;
  const cardRev = 4250;

  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length + 20;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length + 4;
  const waitingQueueCount = queue.filter(q => q.status === 'Waiting').length + 3;

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Good morning, Ananya 👋</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Here is your salon's live operational summary for today, 31 Aug 2026.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setIsWalkInOpen(true)}
            className="btn btn-secondary"
            style={{ borderColor: 'var(--accent-emerald)', color: '#34d399' }}
          >
            <Scissors size={18} />
            <span>+ Walk-in</span>
          </button>
          <button 
            onClick={() => setIsAppointmentModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={18} />
            <span>+ New Appointment</span>
          </button>
        </div>
      </div>

      {/* 5-Second Situation Metrics Grid */}
      <div className="stats-grid">
        {/* Today's Revenue */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Today's Revenue
            </span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
            ₹{totalRev.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.775rem', color: '#34d399', fontWeight: 600 }}>
            <ArrowUpRight size={14} />
            <span>+12.4% vs yesterday</span>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Appointments
            </span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-500)' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
            32
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: '#38bdf8' }}>{confirmedCount} confirmed</span>
            <span>•</span>
            <span style={{ color: '#fbbf24' }}>{pendingCount} pending</span>
          </div>
        </div>

        {/* Customers Served */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Customers Served
            </span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
            28
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            28 served • <strong style={{ color: '#f472b6' }}>4 waiting in salon</strong>
          </div>
        </div>

        {/* Live Queue Waiting */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Live Queue
            </span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
            {waitingQueueCount} Waiting
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Est. average wait: <strong style={{ color: '#fbbf24' }}>24 min</strong>
          </div>
        </div>
      </div>

      {/* Main Dashboard Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Timeline & Live Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Appointments Timeline */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Today's Appointments Schedule</h3>
              <button 
                onClick={() => setActiveModule('appointments')}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary-500)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                View Full Calendar <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {appointments.slice(0, 4).map(apt => {
                const badgeClass = `badge badge-${apt.status.toLowerCase().replace(' ', '-')}`;
                return (
                  <div 
                    key={apt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        color: 'var(--primary-500)',
                        width: '70px'
                      }}>
                        {apt.time}
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{apt.customerName}</div>
                        <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                          {apt.serviceName} • Stylist: <strong>{apt.staffName}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className={badgeClass}>
                        {apt.status}
                      </span>

                      {apt.status === 'Arrived' && (
                        <button 
                          onClick={() => updateAppointmentStatus(apt.id, 'In Service')}
                          className="btn btn-sm btn-primary"
                        >
                          <Play size={12} /> Start
                        </button>
                      )}
                      {apt.status === 'In Service' && (
                        <button 
                          onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                          className="btn btn-sm btn-secondary"
                          style={{ color: '#34d399', borderColor: '#10b981' }}
                        >
                          <CheckCircle size={12} /> Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Queue Control Widget */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec4899' }} className="pulse-active" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Live Salon Queue Control</h3>
              </div>
              <button 
                onClick={() => setActiveModule('queue')}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary-500)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Manage Queue Monitor <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {queue.slice(0, 3).map((q, idx) => {
                const badgeBg = idx === 0 ? '#ec4899' : 'var(--bg-card-hover)';
                const qLabel = `#${q.queueNumber}`;
                return (
                  <div
                    key={q.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: badgeBg,
                        color: '#ffffff',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem'
                      }}>
                        {qLabel}
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{q.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {q.serviceName} • Pref: {q.preferredStaffName || 'Any'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.775rem', color: '#fbbf24', fontWeight: 600 }}>
                        ⏳ {q.waitTimeMins} min wait
                      </span>
                      <button 
                        onClick={() => updateQueueStatus(q.id, 'In Service')}
                        className="btn btn-sm btn-primary"
                      >
                        Start Service
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Revenue Breakdown & Staff Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Revenue Breakdown */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Today's Payment Methods
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <QrCode size={16} color="#34d399" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>UPI (GPay / PhonePe)</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>₹{upiRev.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Banknote size={16} color="#fbbf24" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cash</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>₹{cashRev.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CreditCard size={16} color="#38bdf8" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Card POS</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>₹{cardRev.toLocaleString()}</span>
              </div>

              <div style={{ height: '8px', borderRadius: '99px', overflow: 'hidden', display: 'flex', marginTop: '0.5rem' }}>
                <div style={{ width: '50%', backgroundColor: '#34d399' }} title="UPI 50%" />
                <div style={{ width: '33%', backgroundColor: '#fbbf24' }} title="Cash 33%" />
                <div style={{ width: '17%', backgroundColor: '#38bdf8' }} title="Card 17%" />
              </div>
            </div>
          </div>

          {/* Staff Live Availability Roster */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Staff Roster Status</h3>
              <button 
                onClick={() => setActiveModule('staff')}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary-500)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                All Staff
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {staff.map(st => {
                let badgeBg = 'rgba(245, 158, 11, 0.15)';
                let badgeTxt = '#fbbf24';
                if (st.status === 'Available') {
                  badgeBg = 'rgba(16, 185, 129, 0.15)';
                  badgeTxt = '#34d399';
                } else if (st.status === 'Busy') {
                  badgeBg = 'rgba(236, 72, 153, 0.15)';
                  badgeTxt = '#f472b6';
                }

                return (
                  <div 
                    key={st.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img 
                        src={st.avatar} 
                        alt={st.name} 
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{st.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{st.role}</div>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: badgeBg,
                      color: badgeTxt
                    }}>
                      {st.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
