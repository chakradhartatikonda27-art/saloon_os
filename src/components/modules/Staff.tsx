import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { StaffRole, StaffStatus } from '../../types';
import { UserPlus, Star, Award, TrendingUp, DollarSign, Clock, Search, X, Check, ShieldCheck } from 'lucide-react';

export const Staff: React.FC = () => {
  const { staff, addStaff, updateStaffStatus, setActiveModule } = useSalon();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Staff Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('Stylist');
  const [commissionType, setCommissionType] = useState<'percentage' | 'fixed'>('percentage');
  const [commissionValue, setCommissionValue] = useState(12);

  const filteredStaff = staff.filter(st => {
    const matchesStatus = filterStatus === 'All' || st.status === filterStatus;
    const matchesRole = filterRole === 'All' || st.role === filterRole;
    const matchesSearch = searchQuery === '' || 
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesRole && matchesSearch;
  });

  const totalRevenue = staff.reduce((sum, s) => sum + (s.revenueToday || 0), 0);
  const totalCommission = staff.reduce((sum, s) => sum + (s.commissionToday || 0), 0);
  const totalServices = staff.reduce((sum, s) => sum + (s.servicesCompletedToday || 0), 0);
  const activeCount = staff.filter(s => s.status === 'Available').length;

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
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
            Staff Roster & Commission OS
          </h2>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Stylist live status, daily revenue attribution, commission rules, and attendance roster.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#C9A24E',
            color: '#14121A',
            border: 'none',
            borderRadius: '12px',
            padding: '0.65rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(201, 162, 78, 0.25)'
          }}
        >
          <UserPlus size={16} />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Top Trending SaaS Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {/* Active Staff */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ACTIVE ON FLOOR
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
            {activeCount} / {staff.length} Active
          </div>
        </div>

        {/* Total Revenue Today */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TOTAL REVENUE TODAY
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
        </div>

        {/* Total Commission Payout */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            COMMISSION PAYOUT
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.2rem' }}>
            ₹{totalCommission.toLocaleString()}
          </div>
        </div>

        {/* Services Completed */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SERVICES COMPLETED
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            {totalServices} Services
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {(['All', 'Available', 'Busy', 'Break', 'Off'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                backgroundColor: filterStatus === status ? '#14121A' : '#FFFFFF',
                color: filterStatus === status ? '#FFFFFF' : '#75707E',
                border: filterStatus === status ? '1px solid #14121A' : '1px solid #E8E3DE',
                borderRadius: '99px',
                padding: '0.35rem 0.9rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {status === 'All' ? 'All Staff' : status}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '10px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: '#14121A',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Roles</option>
            <option value="Stylist">Stylist</option>
            <option value="Barber">Barber</option>
            <option value="Therapist">Therapist</option>
            <option value="Manager">Manager</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.45rem 0.85rem', borderRadius: '10px', border: '1px solid #E8E3DE', width: '240px' }}>
            <Search size={15} color="#75707E" />
            <input
              type="text"
              placeholder="Search staff or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#1E1A25', outline: 'none', fontSize: '0.825rem', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Trendy Staff Cards Grid (3 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {filteredStaff.map(st => {
          const statusBg = 
            st.status === 'Available' ? '#DDF4EF' :
            st.status === 'Busy' ? '#FBE5E1' : '#FBEFD8';
          const statusText = 
            st.status === 'Available' ? '#0E9C86' :
            st.status === 'Busy' ? '#D9584A' : '#C57A0F';

          return (
            <div
              key={st.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '18px',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                {/* Header: Avatar, Name, Role & Status Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E8E3DE' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: st.status === 'Available' ? '#10B981' : st.status === 'Busy' ? '#EF4444' : '#F59E0B',
                          border: '2px solid #FFFFFF'
                        }}
                      />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14121A' }}>{st.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', fontSize: '0.725rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                          {st.role}
                        </span>
                        <span style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E' }}>
                          ⭐ {st.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown Selector */}
                  <select
                    value={st.status}
                    onChange={e => updateStaffStatus(st.id, e.target.value as StaffStatus)}
                    style={{
                      backgroundColor: statusBg,
                      color: statusText,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.775rem',
                      fontWeight: 800,
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

                {/* Light High-Visibility Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '12px', padding: '0.85rem 0.5rem', marginTop: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#75707E', fontWeight: 700, textTransform: 'uppercase' }}>SERVICES</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#14121A', marginTop: '0.15rem' }}>{st.servicesCompletedToday}</div>
                  </div>

                  <div style={{ borderLeft: '1px solid #E8E3DE', borderRight: '1px solid #E8E3DE' }}>
                    <div style={{ fontSize: '0.675rem', color: '#75707E', fontWeight: 700, textTransform: 'uppercase' }}>REVENUE</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.15rem' }}>₹{st.revenueToday.toLocaleString()}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#75707E', fontWeight: 700, textTransform: 'uppercase' }}>COMMISSION</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.15rem' }}>₹{st.commissionToday.toLocaleString()}</div>
                  </div>
                </div>

                {/* Commission Rule & Specializations Tags */}
                <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#14121A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} color="#C9A24E" />
                    <span>Commission Rule: {st.commissionType === 'percentage' ? `${st.commissionValue}% on sales` : `₹${st.commissionValue} per booking`}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.2rem' }}>
                    {st.specialization.map((spec, idx) => (
                      <span key={idx} style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', color: '#75707E', fontSize: '0.725rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.775rem', color: '#75707E', fontWeight: 600 }}>
                  Shift: 09:00 AM - 06:00 PM
                </div>

                <button
                  onClick={() => setActiveModule('queue')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E3DE',
                    borderRadius: '8px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.775rem',
                    fontWeight: 800,
                    color: '#14121A',
                    cursor: 'pointer'
                  }}
                >
                  Assign Service →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', backgroundColor: '#FFFFFF', color: '#14121A', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add New Staff Member</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#75707E' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun Kumar"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>PHONE NUMBER</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>ROLE</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    <option value="Stylist">Stylist</option>
                    <option value="Barber">Barber</option>
                    <option value="Therapist">Therapist</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>COMMISSION TYPE</label>
                  <select
                    value={commissionType}
                    onChange={e => setCommissionType(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (₹)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>COMMISSION RATE</label>
                  <input
                    type="number"
                    value={commissionValue}
                    onChange={e => setCommissionValue(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#C9A24E',
                  color: '#14121A',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 2px 8px rgba(201, 162, 78, 0.3)'
                }}
              >
                Add Staff Member to Roster
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
