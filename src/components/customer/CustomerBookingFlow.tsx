import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Scissors, 
  UserCheck, 
  Calendar, 
  Clock, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { SmartToken } from '../../types';

export const CustomerBookingFlow: React.FC = () => {
  const { 
    services, 
    staff, 
    submitCustomerBookingRequest, 
    setActiveCustomerTab 
  } = useSalon();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Booking selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staff[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-31');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Customer info inputs
  const [custName, setCustName] = useState('Rahul Sharma');
  const [custPhone, setCustPhone] = useState('+91 99887 76655');

  // Confirmed Generated Token state
  const [generatedToken, setGeneratedToken] = useState<SmartToken | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];
  const selectedStaff = staff.find(st => st.id === selectedStaffId) || staff[0];

  const availableTimeSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
    '11:30 AM', '12:30 PM', '02:00 PM', '03:30 PM', 
    '05:00 PM', '05:30 PM', '06:30 PM', '07:30 PM'
  ];

  const handleBookingSubmit = () => {
    const token = submitCustomerBookingRequest({
      customerId: 'cust-1',
      customerName: custName,
      customerPhone: custPhone,
      serviceId: selectedService.id,
      staffId: selectedStaff.id,
      date: selectedDate,
      time: selectedTimeSlot
    });

    setGeneratedToken(token);
    setCurrentStep(4);
  };

  const tokenNumLabel = generatedToken ? `${generatedToken.tokenNumber}` : '';

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Step Indicator Header */}
      {currentStep <= 3 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
            <div style={{ flex: 1, height: '4px', borderRadius: '99px', backgroundColor: currentStep >= 1 ? 'var(--primary-500)' : 'var(--border-subtle)' }} />
            <div style={{ flex: 1, height: '4px', borderRadius: '99px', backgroundColor: currentStep >= 2 ? 'var(--primary-500)' : 'var(--border-subtle)' }} />
            <div style={{ flex: 1, height: '4px', borderRadius: '99px', backgroundColor: currentStep >= 3 ? 'var(--primary-500)' : 'var(--border-subtle)' }} />
          </div>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginLeft: '1rem', fontWeight: 700 }}>
            Step {currentStep} of 3
          </span>
        </div>
      )}

      {/* STEP 1: SELECT SERVICE */}
      {currentStep === 1 && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scissors size={20} color="var(--primary-500)" />
              <span>Step 1: Choose Your Desired Service</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Select a service from our luxury salon menu.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {services.map(srv => {
              const isSelected = selectedServiceId === srv.id;
              const cardBorder = isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)';
              const cardBg = isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)';

              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: cardBorder,
                    backgroundColor: cardBg,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {srv.imageUrl ? (
                      <img src={srv.imageUrl} alt={srv.name} style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Scissors size={20} color="#ffffff" />
                      </div>
                    )}

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{srv.name}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', marginTop: '0.15rem' }}>
                        <span>⏱️ {srv.duration} mins</span>
                        <span>•</span>
                        <span>{srv.category}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#34d399' }}>
                      ₹{srv.price}
                    </div>

                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--primary-500)' : 'transparent',
                      border: isSelected ? 'none' : '2px solid var(--border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <Check size={14} color="#ffffff" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(2)}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.5rem' }}
            >
              <span>Next: Choose Stylist</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT PREFERRED STYLIST */}
      {currentStep === 2 && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={20} color="#ec4899" />
              <span>Step 2: Choose Your Preferred Stylist</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Selected Service: <strong>{selectedService.name}</strong> (₹{selectedService.price})
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {staff.map(st => {
              const isSelected = selectedStaffId === st.id;
              const cardBorder = isSelected ? '2px solid #ec4899' : '1px solid var(--border-subtle)';
              const cardBg = isSelected ? 'rgba(236, 72, 153, 0.1)' : 'rgba(255, 255, 255, 0.02)';
              const isAvailable = st.status === 'Available';

              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaffId(st.id)}
                  style={{
                    padding: '1.1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: cardBorder,
                    backgroundColor: cardBg,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img src={st.avatar} alt={st.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{st.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.role} • {st.experienceYears || 8} yrs exp</div>
                      <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, marginTop: '0.1rem' }}>
                        ⭐ {st.rating} Rating
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.6rem' }}>
                    <span className={isAvailable ? 'badge badge-available' : 'badge badge-busy'}>
                      {isAvailable ? 'Available Today' : 'Available at 5:30 PM'}
                    </span>

                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? '#ec4899' : 'var(--text-muted)' }}>
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(1)}
              className="btn btn-secondary"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.5rem' }}
            >
              <span>Next: Choose Time Slot</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELECT TIME SLOT & CONFIRM DETAILS */}
      {currentStep === 3 && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="#34d399" />
              <span>Step 3: Select Date & Available Time Slot</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Stylist <strong>{selectedStaff.name}</strong> • Service: <strong>{selectedService.name}</strong> ({selectedService.duration} min)
            </p>
          </div>

          {/* Date Selector */}
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
            {[
              { label: 'Today', date: '2026-08-31', day: 'Mon 31' },
              { label: 'Tomorrow', date: '2026-09-01', day: 'Tue 01' },
              { label: 'Wed', date: '2026-09-02', day: 'Wed 02' },
              { label: 'Thu', date: '2026-09-03', day: 'Thu 03' },
            ].map(d => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className="btn btn-sm"
                  style={{
                    flex: 1,
                    minWidth: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.65rem',
                    backgroundColor: isSelected ? 'var(--primary-600)' : 'rgba(255,255,255,0.03)',
                    borderColor: isSelected ? 'var(--primary-500)' : 'var(--border-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-main)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{d.label}</span>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{d.day}</span>
                </button>
              );
            })}
          </div>

          {/* Available Slots */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              Available Time Slots for {selectedStaff.name}:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
              {availableTimeSlots.map((slot, idx) => {
                const isSelected = selectedTimeSlot === slot;
                const isBusy = idx === 1 || idx === 6; // simulate a busy slot
                return (
                  <button
                    key={slot}
                    disabled={isBusy}
                    onClick={() => setSelectedTimeSlot(slot)}
                    style={{
                      padding: '0.55rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? '#ec4899' : isBusy ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                      border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#ffffff' : isBusy ? 'var(--text-dim)' : 'var(--text-main)',
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '0.8rem',
                      cursor: isBusy ? 'not-allowed' : 'pointer',
                      textDecoration: isBusy ? 'line-through' : 'none'
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Input Details */}
          <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Your Contact Details:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input
                  type="text"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '0.45rem', color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={e => setCustPhone(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '0.45rem', color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(2)}
              className="btn btn-secondary"
            >
              Back
            </button>

            <button
              onClick={handleBookingSubmit}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}
            >
              <Sparkles size={16} />
              <span>Send Booking Request</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMATION & SMART TOKEN SCREEN */}
      {currentStep === 4 && generatedToken && (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>🎉 Booking Request Sent & Token Generated!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Your booking request has been dispatched to <strong>{generatedToken.staffName}</strong>.
            </p>
          </div>

          {/* Token Card */}
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            border: '2px dashed var(--primary-500)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem 2rem',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              YOUR SALON SMART TOKEN
            </span>

            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary-500)', letterSpacing: '0.05em' }}>
              {tokenNumLabel}
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <strong>{generatedToken.serviceName}</strong> with <strong>{generatedToken.staffName}</strong>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
              ⏰ Scheduled Slot: {generatedToken.time} ({generatedToken.date})
            </div>

            <div style={{ fontSize: '0.775rem', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0.35rem', borderRadius: 'var(--radius-md)' }}>
              📌 Recommended Arrival: Around {generatedToken.suggestedArrivalTime}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveCustomerTab('token')}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
            >
              <Clock size={16} />
              <span>Track Live Queue Progress</span>
            </button>

            <button
              onClick={() => setCurrentStep(1)}
              className="btn btn-secondary"
            >
              Book Another Visit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
