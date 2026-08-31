import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { X, Search, CheckCircle, Calendar, User, Scissors, Clock } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { 
    isAppointmentModalOpen, 
    setIsAppointmentModalOpen, 
    customers, 
    services, 
    staff, 
    addAppointment,
    addCustomer 
  } = useSalon();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-08-31');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  if (!isAppointmentModalOpen) return null;

  // Available Time Slots
  const timeSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
    '12:00 PM', '01:30 PM', '02:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'
  ];

  const handleSelectCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setStep(2);
  };

  const handleCreateNewCustomer = () => {
    if (!newCustName || !newCustPhone) return;
    const created = addCustomer({
      name: newCustName,
      phone: newCustPhone,
      email: `${newCustName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      gender: 'Male',
      favoriteServices: [],
      membership: 'None',
      notes: ['Created via appointment booking flow.']
    });
    setSelectedCustomerId(created.id);
    setStep(2);
  };

  const handleFinishBooking = () => {
    const cust = customers.find(c => c.id === selectedCustomerId) || { name: newCustName, phone: newCustPhone };
    const srv = services.find(s => s.id === selectedServiceId);
    const stf = staff.find(s => s.id === selectedStaffId);

    if (!srv || !stf) return;

    addAppointment({
      customerId: selectedCustomerId,
      customerName: cust.name,
      customerPhone: cust.phone,
      serviceId: srv.id,
      serviceName: srv.name,
      servicePrice: srv.price,
      serviceDuration: srv.duration,
      staffId: stf.id,
      staffName: stf.name,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmed',
      notes
    });

    setIsAppointmentModalOpen(false);
    setStep(1);
  };

  const selectedCustObj = customers.find(c => c.id === selectedCustomerId);
  const selectedSrvObj = services.find(s => s.id === selectedServiceId);
  const selectedStfObj = staff.find(s => s.id === selectedStaffId);

  return (
    <div className="modal-overlay" onClick={() => setIsAppointmentModalOpen(false)}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>New Salon Appointment (Step {step} of 5)</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {step === 1 && "Step 1: Select or Register Customer"}
              {step === 2 && "Step 2: Choose Service"}
              {step === 3 && "Step 3: Assign Staff Specialist"}
              {step === 4 && "Step 4: Select Date & Available Time Slot"}
              {step === 5 && "Step 5: Review & Confirm Booking"}
            </div>
          </div>
          <button 
            onClick={() => setIsAppointmentModalOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Steps */}
        <div className="modal-body">
          {/* STEP 1: Select Customer */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Select Existing Customer</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                  {customers.map(c => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCustomer(c.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.phone}</div>
                      </div>
                      <span className="badge badge-confirmed">{c.membership}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>— OR CREATE NEW CUSTOMER —</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input className="form-input" placeholder="e.g. Rajesh Nair" value={newCustName} onChange={e => setNewCustName(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input className="form-input" placeholder="+91 98765 00000" value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} />
                </div>
              </div>
              <button 
                onClick={handleCreateNewCustomer} 
                className="btn btn-secondary btn-sm"
                disabled={!newCustName || !newCustPhone}
              >
                + Register & Continue
              </button>
            </div>
          )}

          {/* STEP 2: Select Service */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label className="input-label">Choose Service</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxHeight: '260px', overflowY: 'auto' }}>
                {services.map(s => (
                  <div
                    key={s.id}
                    onClick={() => { setSelectedServiceId(s.id); setStep(3); }}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: selectedServiceId === s.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                      border: '1px solid',
                      borderColor: selectedServiceId === s.id ? 'var(--primary-500)' : 'var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {s.duration} mins • ₹{s.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Staff */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label className="input-label">Select Staff Specialist</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {staff.map(st => (
                  <div
                    key={st.id}
                    onClick={() => { setSelectedStaffId(st.id); setStep(4); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: selectedStaffId === st.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                      border: '1px solid',
                      borderColor: selectedStaffId === st.id ? 'var(--primary-500)' : 'var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={st.avatar} alt={st.name} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{st.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.role} • Rating ⭐ {st.rating}</div>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: st.status === 'Available' ? '#34d399' : '#fbbf24', fontWeight: 600 }}>
                      ● {st.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Select Date & Time Slot */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Booking Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={selectedDate} 
                  onChange={e => setSelectedDate(e.target.value)} 
                />
              </div>

              <div className="input-group">
                <label className="input-label">Available Time Slots (Double-Booking Protected)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: selectedTime === t ? 'var(--primary-500)' : 'rgba(255,255,255,0.05)',
                        color: selectedTime === t ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid var(--border-strong)',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Booking Notes (Optional)</label>
                <input className="form-input" placeholder="Special customer instructions..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 5: Confirm Review */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--primary-500)', fontSize: '0.95rem' }}>Confirm Booking Details</h4>
              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div>👤 <strong>Customer:</strong> {selectedCustObj?.name || newCustName}</div>
                <div>✂️ <strong>Service:</strong> {selectedSrvObj?.name} (₹{selectedSrvObj?.price})</div>
                <div>💈 <strong>Stylist:</strong> {selectedStfObj?.name}</div>
                <div>📅 <strong>Schedule:</strong> {selectedDate} at {selectedTime}</div>
                {notes && <div>📝 <strong>Notes:</strong> {notes}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer">
          {step > 1 && (
            <button className="btn btn-outline btn-sm" onClick={() => setStep((step - 1) as any)}>
              Back
            </button>
          )}
          {step < 4 && step !== 1 && (
            <button className="btn btn-primary btn-sm" onClick={() => setStep((step + 1) as any)}>
              Next Step
            </button>
          )}
          {step === 4 && (
            <button className="btn btn-primary btn-sm" onClick={() => setStep(5)}>
              Review Booking
            </button>
          )}
          {step === 5 && (
            <button className="btn btn-primary btn-sm" onClick={handleFinishBooking}>
              Confirm & Save Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
