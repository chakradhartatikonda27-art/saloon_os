import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Customer } from '../../types';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Clock, 
  MessageSquare, 
  Plus, 
  Receipt,
  Scissors,
  CheckCircle2
} from 'lucide-react';

interface Props {
  customerId: string;
  onClose: () => void;
}

export const CustomerProfile: React.FC<Props> = ({ customerId, onClose }) => {
  const { customers, appointments, invoices, setIsAppointmentModalOpen, setActiveModule } = useSalon();
  const [newNote, setNewNote] = useState('');

  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  const customerAppointments = appointments.filter(a => a.customerId === customerId);
  const customerInvoices = invoices.filter(i => i.customerId === customerId);

  const avgBill = customer.totalVisits > 0 ? Math.round(customer.totalSpend / customer.totalVisits) : 0;

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${customer.name}, greetings from Urban Glow Salon! We'd love to welcome you for your next hair spa session.`);
    window.open(`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(15, 23, 42, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-glow)',
              border: '2px solid var(--primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#ffffff'
            }}>
              {customer.name.charAt(0)}
            </div>

            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{customer.name}</h3>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                {customer.phone} • Member since {customer.customerSince}
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          <button 
            onClick={() => { onClose(); setIsAppointmentModalOpen(true); }}
            className="btn btn-primary btn-sm"
          >
            <Calendar size={14} /> Book Appt
          </button>
          <button 
            onClick={() => { onClose(); setActiveModule('billing'); }}
            className="btn btn-secondary btn-sm"
          >
            <Receipt size={14} /> Bill POS
          </button>
          <button 
            onClick={handleSendWhatsApp}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: '#25D366', color: '#25D366' }}
          >
            <MessageSquare size={14} /> WhatsApp
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          {/* Customer Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Visits</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-500)' }}>{customer.totalVisits}</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Spend</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>₹{customer.totalSpend.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Bill</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>₹{avgBill.toLocaleString()}</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Loyalty & Tier</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24' }}>
                ⭐ {customer.loyaltyPoints} pts ({customer.membership})
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Customer Preferences
            </h4>
            <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>💈 <strong>Preferred Stylist:</strong> {customer.favoriteStaffName || 'Arun Kumar'}</div>
              <div>✂️ <strong>Favorite Services:</strong> {customer.favoriteServices.join(', ') || 'Classic Haircut, Beard Trim'}</div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Staff & Salon Notes
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {customer.notes.map((note, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)', borderLeft: '3px solid var(--primary-500)' }}>
                  "{note}"
                </div>
              ))}
            </div>
          </div>

          {/* Appointment History */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Recent Appointment History
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {customerAppointments.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>No previous appointments logged.</div>
              ) : (
                customerAppointments.map(apt => (
                  <div key={apt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{apt.serviceName}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{apt.date} • {apt.staffName}</div>
                    </div>
                    <span className={`badge badge-${apt.status.toLowerCase().replace(' ', '-')}`}>{apt.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
