import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Bell, Check, X, Clock, User, Scissors } from 'lucide-react';

export const StylistRequestAlert: React.FC = () => {
  const { incomingStylistRequest, acceptStylistRequest, declineStylistRequest } = useSalon();

  if (!incomingStylistRequest) return null;

  const tokenLabel = `${incomingStylistRequest.tokenNumber}`;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      zIndex: 9999,
      maxWidth: '420px',
      width: 'calc(100vw - 48px)',
      backgroundColor: '#0f172a',
      border: '2px solid #ec4899',
      borderRadius: 'var(--radius-xl)',
      padding: '1.25rem',
      boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899', fontWeight: 800, fontSize: '0.85rem' }}>
          <Bell size={18} className="pulse-active" />
          <span>⚡ NEW CUSTOMER BOOKING REQUEST</span>
        </div>

        <span style={{
          backgroundColor: '#ec4899',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '0.75rem',
          padding: '0.15rem 0.55rem',
          borderRadius: 'var(--radius-full)'
        }}>
          Token {tokenLabel}
        </span>
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <User size={14} color="var(--primary-500)" />
          <span>Customer: <strong>{incomingStylistRequest.customerName}</strong> ({incomingStylistRequest.customerPhone})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Scissors size={14} color="#34d399" />
          <span>Service: <strong>{incomingStylistRequest.serviceName}</strong> (₹{incomingStylistRequest.servicePrice})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={14} color="#fbbf24" />
          <span>Requested Slot: <strong>{incomingStylistRequest.time}</strong> ({incomingStylistRequest.date})</span>
        </div>

        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Requested Stylist: <strong>{incomingStylistRequest.staffName}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button
          onClick={() => declineStylistRequest(incomingStylistRequest.id)}
          className="btn btn-secondary"
          style={{ justifyContent: 'center', borderColor: '#ef4444', color: '#fca5a5' }}
        >
          <X size={16} /> Decline
        </button>

        <button
          onClick={() => acceptStylistRequest(incomingStylistRequest.id)}
          className="btn btn-primary"
          style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}
        >
          <Check size={16} /> ACCEPT REQUEST
        </button>
      </div>
    </div>
  );
};
