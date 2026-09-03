import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { AppointmentStatus } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter, 
  User, 
  Clock, 
  CheckCircle, 
  Play, 
  XCircle,
  Receipt,
  List,
  Grid
} from 'lucide-react';
import { AppointmentModal } from './AppointmentModal';

export const Appointments: React.FC = () => {
  const { 
    appointments, 
    staff, 
    services, 
    setIsAppointmentModalOpen, 
    updateAppointmentStatus,
    setActiveModule,
    setIsInvoiceModalOpen
  } = useSalon();

  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month' | 'List'>('List');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = selectedStatusFilter === 'All' || apt.status === selectedStatusFilter;
    const matchesStaff = selectedStaffFilter === 'All' || apt.staffId === selectedStaffFilter;
    const matchesSearch = searchQuery === '' || 
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointmentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesStaff && matchesSearch;
  });

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Appointments Operating System</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Every booking from the customer web, reception and walk-ins — one table
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-card)', padding: '0.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            {(['Day', 'Week', 'Month', 'List'] as const).map(v => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: viewMode === v ? 'var(--primary-500)' : 'transparent',
                  color: viewMode === v ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <button onClick={() => setIsAppointmentModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards Row */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            COMPLETED TODAY
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.25rem' }}>
            {7 + appointments.filter(a => a.status === 'Completed').length}
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PENDING / IN PROGRESS
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14121A', marginTop: '0.25rem' }}>
            {11 + appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed' || a.status === 'In Service').length}
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CANCELLED
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D9584A', marginTop: '0.25rem' }}>
            {appointments.filter(a => a.status === 'Cancelled').length}
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            NO-SHOW
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D9584A', marginTop: '0.25rem' }}>
            0
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-input)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)' }}>
          <Search size={16} color="var(--text-dim)" />
          <input 
            type="text" 
            placeholder="Search customer, service or appointment ID..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.85rem', width: '100%' }} 
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
          <select 
            className="form-select"
            value={selectedStatusFilter}
            onChange={e => setSelectedStatusFilter(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending (Online Requests)</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Arrived">Arrived</option>
            <option value="In Service">In Service</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Staff Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Staff:</span>
          <select 
            className="form-select"
            value={selectedStaffFilter}
            onChange={e => setSelectedStaffFilter(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          >
            <option value="All">All Staff Roster</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments List Table View */}
      <div className="table-responsive">
        <table className="salon-table">
          <thead>
            <tr>
              <th>Time & Date</th>
              <th>Customer</th>
              <th>Service Details</th>
              <th>Assigned Staff</th>
              <th>Price</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <CalendarIcon size={32} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
                  <div>No appointments match your filter criteria.</div>
                  <button onClick={() => setIsAppointmentModalOpen(true)} className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>
                    + Create Appointment
                  </button>
                </td>
              </tr>
            ) : (
              filteredAppointments.map(apt => (
                <tr key={apt.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--primary-500)' }}>{apt.time}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.date}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{apt.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.customerPhone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{apt.serviceName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>⏱️ {apt.serviceDuration} mins</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} color="var(--text-muted)" />
                      <span>{apt.staffName}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ₹{apt.servicePrice.toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge badge-${apt.status.toLowerCase().replace(' ', '-')}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
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
                          style={{ color: '#34d399', borderColor: '#10b981' }}
                        >
                          <CheckCircle size={12} /> Complete
                        </button>
                      )}
                      {apt.status === 'Completed' && (
                        <button 
                          onClick={() => setActiveModule('billing')}
                          className="btn btn-sm btn-secondary"
                          style={{ color: '#fbbf24', borderColor: '#f59e0b' }}
                        >
                          <Receipt size={12} /> Create POS Bill
                        </button>
                      )}
                      {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button 
                          onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                          className="btn btn-sm btn-danger"
                          title="Cancel Appointment"
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

      <AppointmentModal />
    </div>
  );
};
