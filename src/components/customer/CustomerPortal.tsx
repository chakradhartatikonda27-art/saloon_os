import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  User, 
  Award, 
  Calendar, 
  Receipt, 
  Tag, 
  Sparkles, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const { customers, appointments, invoices, offers, setActiveInvoicePreview } = useSalon();
  const [activeTab, setActiveTab] = useState<'loyalty' | 'appointments' | 'invoices' | 'offers'>('loyalty');

  const currentCust = customers[0];

  const loyaltyPoints = currentCust.loyaltyPoints || 1250;
  const walletValue = Math.round(loyaltyPoints * 0.1);
  const targetPoints = 2000;
  const progressPercent = Math.min(100, Math.round((loyaltyPoints / targetPoints) * 100));

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Profile Summary Header Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid var(--primary-500)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-600)',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            RS
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{currentCust.name}</h3>
              <span className="badge badge-gold">{currentCust.membership} Member</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              {currentCust.phone} • {currentCust.email}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Salon Spend</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
            ₹{currentCust.totalSpend.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>{currentCust.totalVisits} visits completed</span>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('loyalty')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'loyalty' ? 'var(--primary-600)' : 'transparent',
            color: activeTab === 'loyalty' ? '#ffffff' : 'var(--text-muted)',
            borderColor: activeTab === 'loyalty' ? 'var(--primary-500)' : 'transparent'
          }}
        >
          <Award size={15} /> Loyalty Wallet
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'appointments' ? 'var(--primary-600)' : 'transparent',
            color: activeTab === 'appointments' ? '#ffffff' : 'var(--text-muted)',
            borderColor: activeTab === 'appointments' ? 'var(--primary-500)' : 'transparent'
          }}
        >
          <Calendar size={15} /> My Visits
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'invoices' ? 'var(--primary-600)' : 'transparent',
            color: activeTab === 'invoices' ? '#ffffff' : 'var(--text-muted)',
            borderColor: activeTab === 'invoices' ? 'var(--primary-500)' : 'transparent'
          }}
        >
          <Receipt size={15} /> Invoices
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'offers' ? 'var(--primary-600)' : 'transparent',
            color: activeTab === 'offers' ? '#ffffff' : 'var(--text-muted)',
            borderColor: activeTab === 'offers' ? 'var(--primary-500)' : 'transparent'
          }}
        >
          <Tag size={15} /> My Offers
        </button>
      </div>

      {/* LOYALTY WALLET TAB */}
      {activeTab === 'loyalty' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.15))', border: '1px solid var(--primary-500)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  URBAN GLOW LOYALTY BALANCE
                </span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.1rem' }}>
                  {loyaltyPoints.toLocaleString()} Points
                </div>
                <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>
                  Equivalent Redeemable Value: ₹{walletValue} INR
                </div>
              </div>

              <div style={{ padding: '0.85rem', borderRadius: '50%', backgroundColor: 'rgba(236,72,153,0.2)', color: '#f472b6' }}>
                <Award size={36} />
              </div>
            </div>

            {/* Progress Bar to Next Reward */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Progress to Gold Tier Reward</span>
                <span>{loyaltyPoints} / {targetPoints} pts ({targetPoints - loyaltyPoints} pts remaining)</span>
              </div>
              <div style={{ height: '8px', borderRadius: '99px', backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #ec4899)' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENTS TAB */}
      {activeTab === 'appointments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {appointments.map(apt => {
            const badgeClass = `badge badge-${apt.status.toLowerCase().replace(' ', '-')}`;
            return (
              <div
                key={apt.id}
                className="glass-panel"
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{apt.serviceName}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Date: {apt.date} at {apt.time} • Stylist: <strong>{apt.staffName}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#34d399' }}>₹{apt.servicePrice}</div>
                  <span className={badgeClass} style={{ fontSize: '0.725rem', marginTop: '0.2rem' }}>
                    {apt.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INVOICES TAB */}
      {activeTab === 'invoices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {invoices.map(inv => (
            <div
              key={inv.id}
              className="glass-panel"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{inv.invoiceNumber}</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Date: {inv.date} • Paid via {inv.paymentMethod}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>₹{inv.grandTotal}</div>
                  <span className="badge badge-completed" style={{ fontSize: '0.7rem' }}>Paid</span>
                </div>

                <button
                  onClick={() => setActiveInvoicePreview(inv)}
                  className="btn btn-sm btn-secondary"
                >
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OFFERS TAB */}
      {activeTab === 'offers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {offers.map(off => (
            <div
              key={off.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: '4px solid #ec4899'
              }}
            >
              <div>
                <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{off.discountText}</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginTop: '0.35rem' }}>{off.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{off.description}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', color: '#fbbf24', fontWeight: 800 }}>
                  {off.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
