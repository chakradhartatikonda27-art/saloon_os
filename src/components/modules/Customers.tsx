import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { CustomerSegment } from '../../types';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Star, 
  Phone, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CustomerProfile } from './CustomerProfile';

export const Customers: React.FC = () => {
  const { 
    customers, 
    addCustomer, 
    activeCustomerProfileId, 
    setActiveCustomerProfileId 
  } = useSalon();

  const [segmentFilter, setSegmentFilter] = useState<CustomerSegment>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Customer Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const filteredCustomers = customers.filter(c => {
    const matchesSegment = segmentFilter === 'All' || c.segment === segmentFilter;
    const matchesSearch = searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    addCustomer({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      gender,
      favoriteServices: ['Haircut'],
      membership: 'None',
      notes: ['Registered directly into CRM.']
    });
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Customer Relationship CRM</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Complete customer records, loyalty tiers, lifetime spend, and service history tracking.
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
          <UserPlus size={18} />
          <span>+ Add Customer</span>
        </button>
      </div>

      {/* Segment Filters & Search */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
          {(['All', 'VIP', 'New', 'Returning', 'Inactive'] as CustomerSegment[]).map(seg => (
            <button
              key={seg}
              onClick={() => setSegmentFilter(seg)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.775rem',
                fontWeight: 600,
                backgroundColor: segmentFilter === seg ? 'var(--primary-500)' : 'rgba(255, 255, 255, 0.04)',
                color: segmentFilter === seg ? '#ffffff' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {seg} Customers
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-input)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', width: '280px' }}>
          <Search size={16} color="var(--text-dim)" />
          <input 
            type="text" 
            placeholder="Search by name, phone..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.825rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Customer CRM Table */}
      <div className="table-responsive">
        <table className="salon-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Segment & Tier</th>
              <th>Total Visits</th>
              <th>Total Spend</th>
              <th>Loyalty Pts</th>
              <th>Last Visit</th>
              <th>Pref. Stylist</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(cust => (
              <tr key={cust.id}>
                <td>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{cust.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.phone} • {cust.email}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className="badge badge-confirmed">{cust.segment}</span>
                    {cust.membership !== 'None' && (
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#fbbf24' }}>
                        ★ {cust.membership}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{cust.totalVisits} visits</td>
                <td style={{ fontWeight: 800, color: '#34d399' }}>₹{cust.totalSpend.toLocaleString()}</td>
                <td style={{ color: '#fbbf24', fontWeight: 700 }}>⭐ {cust.loyaltyPoints}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cust.lastVisit}</td>
                <td style={{ fontSize: '0.8rem' }}>{cust.favoriteStaffName || 'Arun Kumar'}</td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    onClick={() => setActiveCustomerProfileId(cust.id)}
                    className="btn btn-sm btn-secondary"
                  >
                    View Profile <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Profile Drawer */}
      {activeCustomerProfileId && (
        <CustomerProfile 
          customerId={activeCustomerProfileId} 
          onClose={() => setActiveCustomerProfileId(null)} 
        />
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Register New Customer</h3>
            </div>
            <form onSubmit={handleCreateCustomer}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input className="form-input" required placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input className="form-input" required placeholder="+91 99887 76655" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address (Optional)</label>
                  <input className="form-input" type="email" placeholder="rahul@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
