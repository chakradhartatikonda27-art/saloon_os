import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Scissors, 
  Sparkles,
  MapPin
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
    <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Alert Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} /> Live Smart Queue Monitor
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Real-Time Token Status Tracker</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
          Minimal physical wait inside the salon — track your position in real-time from anywhere.
        </p>
      </div>

      {/* Main Token Card */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '2px solid var(--primary-500)', position: 'relative', overflow: 'hidden' }}>
        {/* Top Status Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              YOUR TOKEN NUMBER
            </span>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--primary-500)', lineHeight: 1.1, marginTop: '0.1rem' }}>
              {tokenNumText}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              TOKEN STATUS
            </span>
            <div style={{ marginTop: '0.2rem' }}>
              <span className={`badge badge-${activeToken?.status?.toLowerCase().replace('_', '-') || 'confirmed'}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
                {activeToken?.status || 'CONFIRMED'}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Situation Gauge */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Currently Serving</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f472b6', marginTop: '0.15rem' }}>
              {servingNumText}
            </div>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customers Ahead</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24', marginTop: '0.15rem' }}>
              {aheadCount} Ahead
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Waiting Time</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', marginTop: '0.15rem' }}>
              {estimatedWait} mins
            </div>
          </div>
        </div>

        {/* Live Approaching Turn Alert Banner */}
        {isNearTurn && !isInService && !isCompleted && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#34d399'
          }}>
            <Sparkles size={20} className="pulse-active" />
            <div style={{ fontSize: '0.85rem' }}>
              <strong style={{ display: 'block', fontWeight: 800 }}>You're almost next!</strong>
              Your stylist <strong>{assignedStylist.name}</strong> will be ready in ~{estimatedWait} minutes. Please head to the salon.
            </div>
          </div>
        )}

        {/* Appointment & Service Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Service:</span>
            <strong style={{ color: 'var(--text-main)' }}>{activeToken?.serviceName || 'Classic Signature Haircut'}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Stylist:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={assignedStylist.avatar} alt={assignedStylist.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
              <strong style={{ color: 'var(--primary-500)' }}>{assignedStylist.name}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Scheduled Time:</span>
            <strong>{activeToken?.time || '11:00 AM'} ({activeToken?.date || 'Today'})</strong>
          </div>
        </div>

        {/* Queue Sequence Visual Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Live Salon Waiting Line:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {tokens.slice(0, 4).map(tok => {
              const isYou = tok.id === activeCustomerTokenId;
              const tokLabel = `${tok.tokenNumber}`;
              return (
                <div
                  key={tok.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isYou ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.02)',
                    border: isYou ? '1px solid var(--primary-500)' : '1px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: isYou ? 'var(--primary-500)' : 'var(--text-main)' }}>
                      {tokLabel}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {tok.customerName} {isYou && '(YOU)'}
                    </span>
                  </div>

                  <span className={`badge badge-${tok.status.toLowerCase().replace('_', '-')}`} style={{ fontSize: '0.7rem' }}>
                    {tok.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a
            href={`tel:${settings.phone}`}
            className="btn btn-secondary btn-sm"
          >
            <Phone size={14} /> Call Salon Reception
          </a>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <MapPin size={14} /> Directions
          </a>
        </div>
      </div>
    </div>
  );
};
