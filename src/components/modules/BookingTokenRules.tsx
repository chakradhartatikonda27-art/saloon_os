import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Clock, ShieldAlert, Check } from 'lucide-react';

export const BookingTokenRules: React.FC = () => {
  // Left Column State
  const [stylistResponseWindow, setStylistResponseWindow] = useState(120);
  const [noShowGracePeriod, setNoShowGracePeriod] = useState(10);
  const [advanceBookingPeriod, setAdvanceBookingPeriod] = useState(7);
  const [tokenFormat, setTokenFormat] = useState('Per stylist — #A27, #B12');
  const [priorityTokensGold, setPriorityTokensGold] = useState<'On' | 'Off'>('On');

  // Right Column State
  const [bufferBetweenServices, setBufferBetweenServices] = useState(5);
  const [freeCancellationHours, setFreeCancellationHours] = useState(2);
  const [breakLengthMinutes, setBreakLengthMinutes] = useState(15);
  const [walkInQueueRule, setWalkInQueueRule] = useState('Fill earliest gap (may delay later slots)');
  const [autoNoShow, setAutoNoShow] = useState<'On' | 'Off'>('On');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveRules = () => {
    setToastMessage('Booking & Token Rules saved successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '0.65rem 1rem', fontSize: '0.825rem', fontWeight: 700, borderRadius: '10px', textAlign: 'center' }}>
          ✨ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Booking & token rules
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Request window · buffer · grace · cancellation · token format · walk-in rule · priority · auto no-show
        </p>
      </div>

      {/* Main 2-Column Form Grid */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. Stylist response window */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Stylist response window (seconds)
              </label>
              <input
                type="number"
                value={stylistResponseWindow}
                onChange={e => setStylistResponseWindow(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Request expires → customer offered other stylist/time. Never auto-confirmed.
              </div>
            </div>

            {/* 2. No-show grace period */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                No-show grace period (min)
              </label>
              <input
                type="number"
                value={noShowGracePeriod}
                onChange={e => setNoShowGracePeriod(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Unchecked-in tokens past grace are auto-released.
              </div>
            </div>

            {/* 3. Advance booking period */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Advance booking period (days)
              </label>
              <input
                type="number"
                value={advanceBookingPeriod}
                onChange={e => setAdvanceBookingPeriod(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                How far ahead customers can see slots.
              </div>
            </div>

            {/* 4. Token format */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Token format
              </label>
              <select
                value={tokenFormat}
                onChange={e => setTokenFormat(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Per stylist — #A27, #B12">Per stylist — #A27, #B12</option>
                <option value="Global Sequential — #001, #002">Global Sequential — #001, #002</option>
                <option value="Category Prefix — H-101, F-201">Category Prefix — H-101, F-201</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Applies to new tokens. Sequence resets daily.
              </div>
            </div>

            {/* 5. Priority tokens for Gold members */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Priority tokens for Gold members
              </label>
              <select
                value={priorityTokensGold}
                onChange={e => setPriorityTokensGold(e.target.value as 'On' | 'Off')}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Priority breaks ties inside the same slot only.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. Buffer between services */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Buffer between services (min)
              </label>
              <input
                type="number"
                value={bufferBetweenServices}
                onChange={e => setBufferBetweenServices(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Used by availability, conflict lock and queue estimates.
              </div>
            </div>

            {/* 2. Free cancellation */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Free cancellation (hours before)
              </label>
              <input
                type="number"
                value={freeCancellationHours}
                onChange={e => setFreeCancellationHours(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Policy displayed to customers before requesting.
              </div>
            </div>

            {/* 3. Break length added to queue */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Break length added to queue (min)
              </label>
              <input
                type="number"
                value={breakLengthMinutes}
                onChange={e => setBreakLengthMinutes(Number(e.target.value))}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Applied when a stylist taps "Take a break".
              </div>
            </div>

            {/* 4. Walk-in queue rule */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Walk-in queue rule
              </label>
              <select
                value={walkInQueueRule}
                onChange={e => setWalkInQueueRule(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Fill earliest gap (may delay later slots)">Fill earliest gap (may delay later slots)</option>
                <option value="Strict Appointments First (Hold slot until appointment arrives)">Strict Appointments First (Hold slot until appointment arrives)</option>
                <option value="FIFO Queue Allocation">FIFO Queue Allocation</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Fairness default: confirmed appointments first.
              </div>
            </div>

            {/* 5. Auto no-show */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14121A', display: 'block', marginBottom: '0.35rem' }}>
                Auto no-show
              </label>
              <select
                value={autoNoShow}
                onChange={e => setAutoNoShow(e.target.value as 'On' | 'Off')}
                style={{
                  width: '100%',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#14121A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
              <div style={{ fontSize: '0.75rem', color: '#75707E', marginTop: '0.35rem' }}>
                Releases slot, updates queue, notifies staff and customer.
              </div>
            </div>
          </div>
        </div>

        {/* Save Rules Action Bar */}
        <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSaveRules}
            style={{
              backgroundColor: '#C9A24E',
              color: '#14121A',
              border: 'none',
              borderRadius: '10px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(201, 162, 78, 0.3)'
            }}
          >
            Save Booking & Token Rules
          </button>
        </div>
      </div>
    </div>
  );
};
