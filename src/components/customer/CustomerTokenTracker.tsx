import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Phone, 
  Sparkles,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

export const CustomerTokenTracker: React.FC = () => {
  const { tokens, activeCustomerTokenId, settings, staff } = useSalon();

  const activeToken = tokens.find(t => t.id === activeCustomerTokenId) || tokens[2] || tokens[0];
  const assignedStylist = staff.find(s => s.id === activeToken?.staffId) || staff[0];
  const currentlyServingToken = tokens.find(t => t.status === 'IN_SERVICE') || tokens[0];

  const aheadCount = activeToken ? Math.max(0, activeToken.customersAhead) : 1;
  const estimatedWait = activeToken ? activeToken.estimatedWaitMins : 14;

  const isNearTurn = activeToken?.status === 'NEAR_TURN' || aheadCount <= 1;
  const isInService = activeToken?.status === 'IN_SERVICE';
  const isCompleted = activeToken?.status === 'COMPLETED';

  const tokenNumText = activeToken ? `${activeToken.tokenNumber}` : '#A27';
  const servingNumText = currentlyServingToken ? `${currentlyServingToken.tokenNumber}` : '#A25';

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Alert Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FFF9EE', color: '#C9A24E', padding: '0.35rem 0.95rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem', border: '1px solid #C9A24E' }}>
          <Sparkles size={14} color="#C9A24E" /> Live Smart Queue Monitor
        </div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#121118' }}>Real-Time Token Status Tracker</h2>
        <p style={{ color: '#5A5463', fontSize: '0.875rem', marginTop: '0.2rem', fontWeight: 600 }}>
          Minimal physical wait inside the salon — track your position in real-time from anywhere.
        </p>
      </div>

      {/* Main Token Card */}
      <div className="luxury-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '2px solid #C9A24E' }}>
        {/* Top Status Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              YOUR TOKEN NUMBER
            </span>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#121118', lineHeight: 1.1, marginTop: '0.1rem' }}>
              {tokenNumText}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TOKEN STATUS
            </span>
            <div style={{ marginTop: '0.35rem' }}>
              <span style={{
                backgroundColor: '#121118',
                color: '#EBD28F',
                border: '1px solid #C9A24E',
                fontSize: '0.85rem',
                fontWeight: 900,
                padding: '0.4rem 0.95rem',
                borderRadius: '8px',
                display: 'inline-block'
              }}>
                {activeToken?.status || 'CONFIRMED'}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Situation Gauge */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', padding: '1.15rem', borderRadius: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.725rem', color: '#5A5463', textTransform: 'uppercase', fontWeight: 800 }}>Currently Serving</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#121118', marginTop: '0.2rem' }}>
              {servingNumText}
            </div>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid #E8E3DE', borderRight: '1px solid #E8E3DE' }}>
            <span style={{ fontSize: '0.725rem', color: '#5A5463', textTransform: 'uppercase', fontWeight: 800 }}>Customers Ahead</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#C57A0F', marginTop: '0.2rem' }}>
              {aheadCount} Ahead
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.725rem', color: '#5A5463', textTransform: 'uppercase', fontWeight: 800 }}>Est. Waiting Time</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
              {estimatedWait} mins
            </div>
          </div>
        </div>

        {/* Live Approaching Turn Alert Banner */}
        {isNearTurn && !isInService && !isCompleted && (
          <div style={{
            backgroundColor: '#E6F7F4',
            border: '1px solid #0E9C86',
            borderRadius: '14px',
            padding: '1rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            color: '#0E9C86'
          }}>
            <Sparkles size={22} color="#0E9C86" />
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0E9C86', margin: 0 }}>
                ⚡ It's Almost Your Turn!
              </h5>
              <p style={{ fontSize: '0.825rem', color: '#0E9C86', marginTop: '0.15rem', margin: 0, fontWeight: 600 }}>
                Please proceed to the salon front desk. Your master stylist is preparing your chair.
              </p>
            </div>
          </div>
        )}

        {/* Assigned Stylist & Service Details */}
        <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
            <img
              src={assignedStylist.avatar}
              alt={assignedStylist.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A24E' }}
            />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase' }}>ASSIGNED STYLIST</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#121118', margin: 0 }}>{assignedStylist.name}</h4>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase' }}>SERVICE</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#121118' }}>{activeToken?.serviceName || 'Haircut & Spa'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
