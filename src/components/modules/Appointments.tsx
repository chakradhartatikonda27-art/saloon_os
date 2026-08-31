import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { AppointmentStatus } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  User, 
  Clock, 
  CheckCircle, 
  Play, 
  Receipt,
  Scissors
} from 'lucide-react';
import { AppointmentModal } from './AppointmentModal';

export const Appointments: React.FC = () => {
  const { 
    appointments, 
    staff, 
    setIsAppointmentModalOpen, 
    updateAppointmentStatus,
    setActiveModule
  } = useSalon();

  const [dateFilter, setDateFilter] = useState<'Today' | 'Upcoming' | 'Past 7 days' | 'Cancelled / No-show'>('Today');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const completedTodayCount = 7 + appointments.filter(a => a.status === 'Completed').length;
  const pendingCount = 11 + appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed' || a.status === 'In Service').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
  const noShowCount = 0;

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchQuery === '' || 
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointmentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStaff = selectedStaffFilter === 'All' || apt.staffId === selectedStaffFilter;

    if (!matchesSearch || !matchesStaff) return false;

    if (dateFilter === 'Today') return true;
    if (dateFilter === 'Upcoming') return apt.status === 'Pending' || apt.status === 'Confirmed';
    if (dateFilter === 'Past 7 days') return apt.status === 'Completed';
    if (dateFilter === 'Cancelled / No-show') return apt.status === 'Cancelled';
    return true;
  });

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Appointments
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Every booking from the customer web, reception and walk-ins — one table
        </p>
      </div>

      {/* Top 5 Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {/* COMPLETED TODAY */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            COMPLETED TODAY
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
            {completedTodayCount}
          </div>
        </div>

        {/* PENDING / IN PROGRESS */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PENDING / IN PROGRESS
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            {pendingCount}
          </div>
        </div>

        {/* CANCELLED */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CANCELLED
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>
            {cancelledCount}
          </div>
        </div>

        {/* NO-SHOW */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            NO-SHOW
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>
            {noShowCount}
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            ACTIONS
          </div>
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            style={{
              backgroundColor: '#C9A24E',
              color: '#14121A',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <span>+ New appointment</span>
          </button>
        </div>
      </div>

      {/* Filter Pills Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(['Today', 'Upcoming', 'Past 7 days', 'Cancelled / No-show'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setDateFilter(tab)}
              style={{
                backgroundColor: dateFilter === tab ? '#14121A' : '#FFFFFF',
                color: dateFilter === tab ? '#FFFFFF' : '#14121A',
                border: dateFilter === tab ? '1px solid #14121A' : '1px solid #E8E3DE',
                borderRadius: '99px',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Staff Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '10px', border: '1px solid #E8E3DE' }}>
            <Search size={15} color="#75707E" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#1E1A25', outline: 'none', fontSize: '0.825rem', width: '160px' }} 
            />
          </div>

          <select
            value={selectedStaffFilter}
            onChange={e => setSelectedStaffFilter(e.target.value)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '10px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: '#1E1A25',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Staff Roster</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments Master Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>TIME & DATE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>CUSTOMER</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>SERVICE DETAILS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>ASSIGNED STAFF</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>PRICE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#75707E' }}>
                    <CalendarIcon size={32} color="#CBD5E1" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontWeight: 700 }}>No appointments match your filter criteria.</div>
                    <button onClick={() => setIsAppointmentModalOpen(true)} className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>
                      + Create Appointment
                    </button>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 800, color: '#14121A', fontSize: '0.875rem' }}>{apt.time}</div>
                      <div style={{ fontSize: '0.75rem', color: '#75707E' }}>{apt.date}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1E1A25' }}>{apt.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#75707E' }}>{apt.customerPhone}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1E1A25' }}>{apt.serviceName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#75707E' }}>⏱️ {apt.serviceDuration} mins</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#1E1A25' }}>
                        <User size={14} color="#75707E" />
                        <span>{apt.staffName}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#1E1A25', fontSize: '0.875rem' }}>
                      ₹{apt.servicePrice.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {apt.status === 'Completed' && (
                        <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>COMPLETED</span>
                      )}
                      {apt.status === 'In Service' && (
                        <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>IN SERVICE</span>
                      )}
                      {apt.status === 'Confirmed' && (
                        <span style={{ backgroundColor: '#EFEBF4', color: '#2A2237', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>CONFIRMED</span>
                      )}
                      {apt.status === 'Pending' && (
                        <span style={{ backgroundColor: '#FBEFD8', color: '#C57A0F', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>PENDING</span>
                      )}
                      {apt.status === 'Cancelled' && (
                        <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>CANCELLED</span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        {apt.status === 'Pending' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                            className="btn btn-sm btn-primary"
                          >
                            Accept Booking
                          </button>
                        )}
                        {apt.status === 'Confirmed' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'Arrived')}
                            className="btn btn-sm btn-secondary"
                          >
                            Mark Arrived
                          </button>
                        )}
                        {apt.status === 'Arrived' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'In Service')}
                            className="btn btn-sm btn-primary"
                          >
                            <Play size={12} /> Start Service
                          </button>
                        )}
                        {apt.status === 'In Service' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="btn btn-sm btn-secondary"
                            style={{ color: '#0E9C86', borderColor: '#0E9C86' }}
                          >
                            <CheckCircle size={12} /> Complete
                          </button>
                        )}
                        {apt.status === 'Completed' && (
                          <button 
                            onClick={() => setActiveModule('billing')}
                            className="btn btn-sm btn-secondary"
                            style={{ color: '#C9A24E', borderColor: '#C9A24E' }}
                          >
                            <Receipt size={12} /> Create POS Bill
                          </button>
                        )}
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                            className="btn btn-sm btn-danger"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AppointmentModal />
    </div>
  );
};
