import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Play, Pause, CheckCircle2, User, Clock, Scissors, Percent, Award, AlertCircle } from 'lucide-react';

export const StylistDashboard: React.FC = () => {
  const { queue, appointments, staff } = useSalon();
  const [serviceStatus, setServiceStatus] = useState<'WAITING' | 'SERVING' | 'PAUSED' | 'COMPLETED'>('WAITING');
  const [addedNote, setAddedNote] = useState('');
  const [stylistNotes, setStylistNotes] = useState<string[]>([
    'Prefers low fade on sides.',
    'Does not want beard trimming.',
    'Sensitive scalp — use gentle organic shampoo.'
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addedNote.trim()) return;
    setStylistNotes(prev => [...prev, addedNote.trim()]);
    setAddedNote('');
  };

  // Personal Stylist Metrics
  const myAppointments = appointments.filter(a => a.staffName.includes('Arun') || a.staffName.includes('Meena'));
  const completedTodayCount = 3;
  const waitingTodayCount = 1;
  const totalServedToday = 4;
  const todayRevenueGenerated = 3450;
  const todayCommissionEarned = Math.round(todayRevenueGenerated * 0.25);
  const monthlyCommissionEarned = 18400;

  return (
    <div style={{ padding: '0.85rem', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* STYLIST HEADER */}
      <div 
        className="luxury-card"
        style={{
          padding: '1.25rem',
          background: 'linear-gradient(135deg, #121118 0%, #2A2436 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          border: '1.5px solid #C9A24E'
        }}
      >
        <span style={{ backgroundColor: 'rgba(201, 162, 78, 0.2)', color: '#EBD28F', border: '1px solid #C9A24E', padding: '0.2rem 0.65rem', borderRadius: '99px', fontSize: '0.675rem', fontWeight: 900, width: 'fit-content' }}>
          ✂️ STYLIST MOBILE PORTAL
        </span>

        <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
          GOOD MORNING, ARJUN! 👋
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.25rem', fontSize: '0.8rem', color: '#B5AEBF' }}>
          <div>Today's Appointments: <strong style={{ color: '#FFFFFF' }}>8</strong></div>
          <div>•</div>
          <div>Completed: <strong style={{ color: '#0E9C86' }}>{completedTodayCount}</strong></div>
          <div>•</div>
          <div>Waiting: <strong style={{ color: '#C9A24E' }}>{waitingTodayCount}</strong></div>
        </div>
      </div>

      {/* NEXT CUSTOMER CARD & SERVICE EXECUTION */}
      <div className="luxury-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#C9A24E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            NEXT ASSIGNED CUSTOMER
          </span>

          <span style={{
            backgroundColor: serviceStatus === 'SERVING' ? '#E6F7F4' : serviceStatus === 'COMPLETED' ? '#E6F7F4' : '#FFF9EE',
            color: serviceStatus === 'SERVING' ? '#0E9C86' : serviceStatus === 'COMPLETED' ? '#0E9C86' : '#C57A0F',
            padding: '0.2rem 0.6rem',
            borderRadius: '8px',
            fontSize: '0.725rem',
            fontWeight: 900
          }}>
            {serviceStatus}
          </span>
        </div>

        {/* Customer Info Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E8E3DE', paddingBottom: '0.95rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#121118', margin: 0 }}>
              Rahul Sharma
            </h3>
            <div style={{ fontSize: '0.825rem', color: '#5A5463', marginTop: '0.15rem', fontWeight: 600 }}>
              Classic Haircut + Beard Sculpting (30 mins)
            </div>
          </div>

          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#121118' }}>
            ₹450
          </div>
        </div>

        {/* Customer Preferences & Important Notes */}
        <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <AlertCircle size={14} color="#C9A24E" />
            <span>Customer Preferences & Notes</span>
          </div>

          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.825rem', color: '#5A5463', lineHeight: 1.45 }}>
            {stylistNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>

          <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
            <input
              type="text"
              placeholder="Add note (e.g. loves texture clay)"
              value={addedNote}
              onChange={(e) => setAddedNote(e.target.value)}
              style={{ flex: 1, padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid #E8E3DE', fontSize: '0.775rem', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: '#121118', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.775rem', fontWeight: 800, cursor: 'pointer' }}>
              Add
            </button>
          </form>
        </div>

        {/* STATUS FLOW ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', paddingTop: '0.35rem' }}>
          {serviceStatus === 'WAITING' && (
            <button
              onClick={() => setServiceStatus('SERVING')}
              className="champagne-btn-gold"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Play size={18} />
              <span>START SERVICE NOW</span>
            </button>
          )}

          {serviceStatus === 'SERVING' && (
            <>
              <button
                onClick={() => setServiceStatus('PAUSED')}
                style={{ flex: 1, backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', color: '#121118', padding: '0.85rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <Pause size={16} />
                <span>PAUSE</span>
              </button>

              <button
                onClick={() => setServiceStatus('COMPLETED')}
                className="champagne-btn-primary"
                style={{ flex: 2, padding: '0.85rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
              >
                <CheckCircle2 size={18} color="#0E9C86" />
                <span>MARK COMPLETED</span>
              </button>
            </>
          )}

          {serviceStatus === 'PAUSED' && (
            <button
              onClick={() => setServiceStatus('SERVING')}
              className="champagne-btn-gold"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Play size={18} />
              <span>RESUME SERVICE</span>
            </button>
          )}

          {serviceStatus === 'COMPLETED' && (
            <div style={{ backgroundColor: '#E6F7F4', border: '1px solid #0E9C86', borderRadius: '12px', padding: '0.85rem', width: '100%', textAlign: 'center', color: '#0E9C86', fontWeight: 900, fontSize: '0.9rem' }}>
              ✓ Service Completed & Commission Logged!
            </div>
          )}
        </div>
      </div>

      {/* PERSONAL COMMISSION TRACKER CARD */}
      <div className="luxury-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Percent size={18} color="#C9A24E" />
          <span>My Personal Commission Tracker</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>TODAY'S COMMISSION</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.15rem' }}>₹{todayCommissionEarned.toLocaleString()}</div>
            <div style={{ fontSize: '0.725rem', color: '#5A5463', marginTop: '0.1rem' }}>From {totalServedToday} customers</div>
          </div>

          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 800 }}>MONTHLY COMMISSION</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.15rem' }}>₹{monthlyCommissionEarned.toLocaleString()}</div>
            <div style={{ fontSize: '0.725rem', color: '#5A5463', marginTop: '0.1rem' }}>25% avg commission rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
