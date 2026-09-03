import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Scissors, 
  UserCheck, 
  Calendar, 
  Check, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Clock
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
    <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Step Progress Bar Header */}
      {currentStep <= 3 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
            <div style={{ flex: 1, height: '6px', borderRadius: '99px', backgroundColor: currentStep >= 1 ? '#C9A24E' : '#E8E3DE', transition: 'all 0.3s ease' }} />
            <div style={{ flex: 1, height: '6px', borderRadius: '99px', backgroundColor: currentStep >= 2 ? '#C9A24E' : '#E8E3DE', transition: 'all 0.3s ease' }} />
            <div style={{ flex: 1, height: '6px', borderRadius: '99px', backgroundColor: currentStep >= 3 ? '#C9A24E' : '#E8E3DE', transition: 'all 0.3s ease' }} />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#121118', marginLeft: '1.25rem', fontWeight: 800 }}>
            Step {currentStep} of 3
          </span>
        </div>
      )}

      {/* STEP 1: SELECT SERVICE */}
      {currentStep === 1 && (
        <div className="luxury-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scissors size={22} color="#C9A24E" />
              <span>Step 1: Choose Your Desired Service</span>
            </h3>
            <p style={{ color: '#5A5463', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 500 }}>
              Select a service from our luxury salon menu.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {services.map(srv => {
              const isSelected = selectedServiceId === srv.id;
              const cardBorder = isSelected ? '2px solid #C9A24E' : '1px solid #E8E3DE';
              const cardBg = isSelected ? '#FFF9EE' : '#FFFFFF';

              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  style={{
                    backgroundColor: cardBg,
                    border: cardBorder,
                    borderRadius: '16px',
                    padding: '1.15rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(201, 162, 78, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid #E8E3DE'
                    }}>
                      <img src={srv.imageUrl} alt={srv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', margin: 0 }}>
                        {srv.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', color: '#5A5463', marginTop: '0.25rem', fontWeight: 600 }}>
                        <span>⏱️ {srv.duration} mins</span>
                        <span>•</span>
                        <span style={{ textTransform: 'capitalize', color: '#C9A24E', fontWeight: 800 }}>{srv.category}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118' }}>
                      ₹{srv.price}
                    </span>

                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #C9A24E' : '2px solid #E8E3DE',
                      backgroundColor: isSelected ? '#C9A24E' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#121118'
                    }}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(2)}
              className="champagne-btn-gold"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <span>Next: Choose Stylist</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT STYLIST */}
      {currentStep === 2 && (
        <div className="luxury-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={22} color="#C9A24E" />
              <span>Step 2: Choose Your Preferred Stylist</span>
            </h3>
            <p style={{ color: '#5A5463', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 600 }}>
              Selected Service: <strong style={{ color: '#121118' }}>{selectedService.name} (₹{selectedService.price})</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {staff.map(st => {
              const isSelected = selectedStaffId === st.id;
              const cardBorder = isSelected ? '2px solid #C9A24E' : '1px solid #E8E3DE';
              const cardBg = isSelected ? '#FFF9EE' : '#FFFFFF';

              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStaffId(st.id)}
                  style={{
                    backgroundColor: cardBg,
                    border: cardBorder,
                    borderRadius: '16px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: isSelected ? '0 4px 15px rgba(201, 162, 78, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={st.avatar}
                      alt={st.name}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #C9A24E'
                      }}
                    />

                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', margin: 0 }}>
                        {st.name}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#5A5463', marginTop: '0.15rem', fontWeight: 600 }}>
                        {st.role} • {st.experienceYears} yrs exp
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#C9A24E', fontWeight: 800, marginTop: '0.15rem' }}>
                        ★ {st.rating} Rating
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      backgroundColor: st.status === 'Available' ? '#E6F7F4' : '#FFF9EE',
                      color: st.status === 'Available' ? '#0E9C86' : '#C57A0F',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {st.status === 'Available' ? 'Available Today' : 'Available At 5:30 PM'}
                    </span>

                    <span style={{ fontSize: '0.825rem', fontWeight: 900, color: isSelected ? '#C9A24E' : '#121118' }}>
                      {isSelected ? 'Selected ✓' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(1)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '10px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                color: '#121118',
                cursor: 'pointer'
              }}
            >
              Back
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="champagne-btn-gold"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <span>Next: Choose Time Slot</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELECT DATE & TIME SLOT & CUSTOMER INFO */}
      {currentStep === 3 && (
        <div className="luxury-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#121118', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={22} color="#C9A24E" />
              <span>Step 3: Select Date & Available Time Slot</span>
            </h3>
            <p style={{ color: '#5A5463', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 600 }}>
              Stylist <strong>{selectedStaff.name}</strong> • Service: <strong>{selectedService.name} ({selectedService.duration} min)</strong>
            </p>
          </div>

          {/* Date Picker Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {[
              { label: 'Today', dateStr: '2026-08-31', display: 'Mon 31' },
              { label: 'Tomorrow', dateStr: '2026-09-01', display: 'Tue 01' },
              { label: 'Wed', dateStr: '2026-09-02', display: 'Wed 02' },
              { label: 'Thu', dateStr: '2026-09-03', display: 'Thu 03' }
            ].map(d => {
              const isSelDate = selectedDate === d.dateStr;
              return (
                <button
                  key={d.dateStr}
                  onClick={() => setSelectedDate(d.dateStr)}
                  style={{
                    backgroundColor: isSelDate ? '#121118' : '#FAF7F2',
                    color: isSelDate ? '#EBD28F' : '#121118',
                    border: isSelDate ? '2px solid #C9A24E' : '1px solid #E8E3DE',
                    borderRadius: '12px',
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: isSelDate ? '0 4px 15px rgba(18, 17, 24, 0.2)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{d.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, marginTop: '0.2rem' }}>{d.display}</div>
                </button>
              );
            })}
          </div>

          {/* Time Slot Grid */}
          <div>
            <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#121118', marginBottom: '0.75rem' }}>
              Available Time Slots for {selectedStaff.name}:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
              {availableTimeSlots.map(slot => {
                const isSelSlot = selectedTimeSlot === slot;
                const isBooked = slot === '10:00 AM' || slot === '02:00 PM';

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => setSelectedTimeSlot(slot)}
                    style={{
                      backgroundColor: isBooked ? '#F3F0EC' : (isSelSlot ? '#C9A24E' : '#FFFFFF'),
                      color: isBooked ? '#A19BAA' : (isSelSlot ? '#121118' : '#121118'),
                      border: isSelSlot ? '2px solid #121118' : '1px solid #E8E3DE',
                      borderRadius: '10px',
                      padding: '0.65rem',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      textDecoration: isBooked ? 'line-through' : 'none',
                      opacity: isBooked ? 0.6 : 1
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Info Form */}
          <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#121118' }}>
              Your Contact Details
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
                <input
                  type="text"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E3DE',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#121118',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', display: 'block', marginBottom: '0.35rem' }}>Phone Number</label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={e => setCustPhone(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E3DE',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#121118',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button
              onClick={() => setCurrentStep(2)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '10px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                color: '#121118',
                cursor: 'pointer'
              }}
            >
              Back
            </button>

            <button
              onClick={handleBookingSubmit}
              className="champagne-btn-gold"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={18} />
              <span>Send Booking Request</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMED GENERATED TOKEN SCREEN */}
      {currentStep === 4 && generatedToken && (
        <div className="luxury-card" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#E6F7F4',
            color: '#0E9C86',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(14, 156, 134, 0.25)'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#121118' }}>
              🎉 Booking Request Sent & Token Generated!
            </h3>
            <p style={{ color: '#5A5463', fontSize: '0.9rem', marginTop: '0.35rem', fontWeight: 500 }}>
              Your booking request has been dispatched to <strong>{selectedStaff.name}</strong>.
            </p>
          </div>

          {/* Smart Token Card */}
          <div style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#121118',
            border: '2px dashed #C9A24E',
            borderRadius: '20px',
            padding: '1.75rem',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 12px 30px rgba(18, 17, 24, 0.25)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EBD28F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              YOUR SALON SMART TOKEN
            </div>

            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.05em' }}>
              {tokenNumLabel}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.85rem', width: '100%', textAlign: 'center', fontSize: '0.825rem', color: '#B5AEBF' }}>
              {selectedService.name} with {selectedStaff.name}
            </div>

            <div style={{ backgroundColor: 'rgba(201, 162, 78, 0.15)', border: '1px solid rgba(201, 162, 78, 0.4)', borderRadius: '10px', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#EBD28F', fontWeight: 700 }}>
              ⏰ Scheduled Slot: {selectedTimeSlot} ({selectedDate})
            </div>

            <div style={{ backgroundColor: 'rgba(14, 156, 134, 0.15)', border: '1px solid rgba(14, 156, 134, 0.4)', borderRadius: '10px', padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#0E9C86', fontWeight: 700 }}>
              📌 Recommended Arrival: Around 10:45 AM
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => setActiveCustomerTab('token')}
              className="champagne-btn-gold"
              style={{ padding: '0.85rem 1.75rem', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Track Live Queue Progress
            </button>

            <button
              onClick={() => {
                setGeneratedToken(null);
                setCurrentStep(1);
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '12px',
                padding: '0.85rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#121118',
                cursor: 'pointer'
              }}
            >
              Book Another Visit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
