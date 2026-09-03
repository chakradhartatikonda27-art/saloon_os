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
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Profile Summary Header Card */}
      <div className="luxury-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderLeft: '6px solid #C9A24E' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#121118',
            color: '#EBD28F',
            border: '2px solid #C9A24E',
            fontWeight: 900,
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(18, 17, 24, 0.2)'
          }}>
            RS
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#121118', margin: 0 }}>{currentCust.name}</h3>
              <span style={{
                backgroundColor: '#121118',
                color: '#EBD28F',
                border: '1px solid #C9A24E',
                fontSize: '0.725rem',
                fontWeight: 900,
                padding: '0.2rem 0.65rem',
                borderRadius: '99px'
              }}>
                {currentCust.membership} Member
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#5A5463', marginTop: '0.25rem', fontWeight: 600, margin: 0 }}>
              {currentCust.phone} • {currentCust.email}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.775rem', color: '#5A5463', fontWeight: 800 }}>Total Salon Spend</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#121118' }}>
            ₹{currentCust.totalSpend.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.775rem', color: '#5A5463', fontWeight: 600 }}>{currentCust.totalVisits} visits completed</span>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.65rem', borderBottom: '1px solid #E8E3DE', paddingBottom: '0.65rem' }}>
        {(['loyalty', 'appointments', 'invoices', 'offers'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#121118' : '#FFFFFF',
              color: activeTab === tab ? '#EBD28F' : '#121118',
              border: activeTab === tab ? '1.5px solid #C9A24E' : '1px solid #E8E3DE',
              borderRadius: '99px',
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'loyalty' ? 'Loyalty Wallet' : tab === 'appointments' ? 'My Visits' : tab}
          </button>
        ))}
      </div>

      {/* TAB 1: LOYALTY WALLET */}
      {activeTab === 'loyalty' && (
        <div className="luxury-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase' }}>Loyalty Reward Points</span>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.2rem' }}>
                {loyaltyPoints} pts
              </div>
              <span style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 600 }}>10 pts = ₹1 wallet redemption</span>
            </div>

            <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase' }}>Redeemable Wallet Balance</span>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
                ₹{walletValue}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 600 }}>Usable on any service or invoice</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY VISITS */}
      {activeTab === 'appointments' && (
        <div className="luxury-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118' }}>Appointment History</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {appointments.map(apt => (
              <div key={apt.id} style={{ padding: '1rem', backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 900, color: '#121118' }}>{apt.serviceName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 600 }}>{apt.date} • {apt.time} • Stylist: {apt.staffName}</div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#121118' }}>₹{apt.servicePrice}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="luxury-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118' }}>Invoices & Digital Receipts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {invoices.map(inv => (
              <div key={inv.id} style={{ padding: '1rem', backgroundColor: '#FAF7F2', border: '1px solid #E8E3DE', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 900, color: '#121118' }}>{inv.invoiceNumber}</div>
                  <div style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 600 }}>{inv.date} • Paid via {inv.paymentMethod}</div>
                </div>
                <button
                  onClick={() => setActiveInvoicePreview(inv)}
                  className="champagne-btn-primary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  View Bill
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
