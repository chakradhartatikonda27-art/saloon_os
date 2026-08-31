import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { StaffRole, StaffStatus } from '../../types';
import { UserCheck, UserPlus, Star, Award, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

export const Staff: React.FC = () => {
  const { staff, addStaff, updateStaffStatus } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Staff Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('Stylist');
  const [commissionType, setCommissionType] = useState<'percentage' | 'fixed'>('percentage');
  const [commissionValue, setCommissionValue] = useState(12);

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    addStaff({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@urbanglow.in`,
      role,
      status: 'Available',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      specialization: ['General Grooming'],
      commissionType,
      commissionValue: Number(commissionValue),
      rating: 4.9,
      todayAppointmentsCount: 0,
      attendanceStatus: 'Present',
      workingHours: '09:00 AM - 06:00 PM'
    });
    setIsModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Staff Roster & Commission OS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Stylist live status, daily revenue attribution, commission rules, and attendance roster.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <UserPlus size={18} />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Staff Roster Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {staff.map(st => (
          <div key={st.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header Avatar & Status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={st.avatar} alt={st.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-500)' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{st.name}</h3>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{st.role} • ⭐ {st.rating}</div>
                </div>
              </div>

              {/* Status Toggle Selector */}
              <select
                value={st.status}
                onChange={e => updateStaffStatus(st.id, e.target.value as StaffStatus)}
                style={{
                  backgroundColor: 
                    st.status === 'Available' ? 'rgba(16, 185, 129, 0.15)' :
                    st.status === 'Busy' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: 
                    st.status === 'Available' ? '#34d399' :
                    st.status === 'Busy' ? '#f472b6' : '#fbbf24',
                  border: '1px solid currentColor',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Break">On Break</option>
                <option value="Off">Day Off</option>
              </select>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', backgroundColor: 'rgba(15,23,42,0.6)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Services Today</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{st.servicesCompletedToday}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Revenue</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>₹{st.revenueToday.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Commission</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>₹{st.commissionToday.toLocaleString()}</div>
              </div>
            </div>

            {/* Commission Config & Specialization */}
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>💼 <strong>Commission Rule:</strong> {st.commissionType === 'percentage' ? `${st.commissionValue}% on sales` : `₹${st.commissionValue} per booking`}</div>
              <div>✂️ <strong>Specializations:</strong> {st.specialization.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New Staff Member</h3>
            </div>
            <form onSubmit={handleCreateStaff}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input className="form-input" required placeholder="e.g. Arun Kumar" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Mobile Phone</label>
                    <input className="form-input" required placeholder="+91 98111 22334" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Role</label>
                    <select className="form-select" value={role} onChange={e => setRole(e.target.value as any)}>
                      <option value="Stylist">Stylist</option>
                      <option value="Barber">Barber</option>
                      <option value="Therapist">Therapist</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Commission Model</label>
                    <select className="form-select" value={commissionType} onChange={e => setCommissionType(e.target.value as any)}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Value ({commissionType === 'percentage' ? '%' : '₹'})</label>
                    <input className="form-input" type="number" required value={commissionValue} onChange={e => setCommissionValue(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
