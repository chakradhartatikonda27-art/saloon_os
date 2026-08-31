import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { X, Scissors, User, Sparkles } from 'lucide-react';

export const WalkInModal: React.FC = () => {
  const { 
    isWalkInOpen, 
    setIsWalkInOpen, 
    customers, 
    services, 
    staff, 
    addWalkInToQueue,
    addCustomer 
  } = useSalon();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');

  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  if (!isWalkInOpen) return null;

  const handleFinishWalkIn = () => {
    let finalCustId = selectedCustomerId;

    if (!finalCustId && newCustName && newCustPhone) {
      const created = addCustomer({
        name: newCustName,
        phone: newCustPhone,
        email: `${newCustName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        gender: 'Male',
        favoriteServices: [],
        membership: 'None',
        notes: ['Registered as walk-in customer.']
      });
      finalCustId = created.id;
    }

    if (!finalCustId || !selectedServiceId) return;

    addWalkInToQueue(finalCustId, selectedServiceId, selectedStaffId || undefined);
    setIsWalkInOpen(false);

    // Reset
    setSelectedCustomerId('');
    setSelectedServiceId('');
    setSelectedStaffId('');
    setNewCustName('');
    setNewCustPhone('');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsWalkInOpen(false)}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Fast 3-Step Walk-In Entry</h3>
          </div>
          <button onClick={() => setIsWalkInOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Step 1: Select Customer */}
          <div className="input-group">
            <label className="input-label">1. Select Existing Customer OR Enter Walk-in Name</label>
            <select 
              className="form-select" 
              value={selectedCustomerId} 
              onChange={e => setSelectedCustomerId(e.target.value)}
            >
              <option value="">-- Choose Existing Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>

            {!selectedCustomerId && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input className="form-input" placeholder="Walk-in Customer Name" value={newCustName} onChange={e => setNewCustName(e.target.value)} />
                <input className="form-input" placeholder="Mobile Number" value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} />
              </div>
            )}
          </div>

          {/* Step 2: Select Service */}
          <div className="input-group">
            <label className="input-label">2. Select Service Requested</label>
            <select 
              className="form-select" 
              value={selectedServiceId} 
              onChange={e => setSelectedServiceId(e.target.value)}
            >
              <option value="">-- Select Service --</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.duration} min • ₹{s.price})</option>
              ))}
            </select>
          </div>

          {/* Step 3: Preferred Staff */}
          <div className="input-group">
            <label className="input-label">3. Preferred Staff (Optional / Any Available)</label>
            <select 
              className="form-select" 
              value={selectedStaffId} 
              onChange={e => setSelectedStaffId(e.target.value)}
            >
              <option value="">Any Available Stylist / Barber</option>
              {staff.map(st => (
                <option key={st.id} value={st.id}>{st.name} ({st.status})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline btn-sm" onClick={() => setIsWalkInOpen(false)}>Cancel</button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleFinishWalkIn}
            disabled={(!selectedCustomerId && (!newCustName || !newCustPhone)) || !selectedServiceId}
            style={{ backgroundColor: '#10b981', borderColor: '#059669' }}
          >
            <Sparkles size={16} /> Add to Live Queue
          </button>
        </div>
      </div>
    </div>
  );
};
