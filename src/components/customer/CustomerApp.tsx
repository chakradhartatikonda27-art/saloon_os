import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { CustomerHeader } from './CustomerHeader';
import { CustomerOffersCarousel } from './CustomerOffersCarousel';
import { CustomerGallery } from './CustomerGallery';
import { CustomerServicesPage } from './CustomerServicesPage';
import { CustomerBookingFlow } from './CustomerBookingFlow';
import { CustomerTokenTracker } from './CustomerTokenTracker';
import { CustomerPortal } from './CustomerPortal';
import { CustomerMobileNav } from './CustomerMobileNav';
import { Scissors, UserCheck, Calendar, ArrowRight, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { activeCustomerTab, setActiveCustomerTab, settings } = useSalon();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', paddingBottom: '80px', fontFamily: 'var(--font-body)' }}>
      {/* Brand Header */}
      <CustomerHeader />

      {/* Main View Switcher Body */}
      <main className="workspace-padding" style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* HOME VIEW */}
        {activeCustomerTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Hero Banner Section */}
            <div 
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.15))',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <div style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(236, 72, 153, 0.2)',
                  color: '#f472b6',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  width: 'fit-content'
                }}>
                  <Sparkles size={14} /> Luxury Salon Experience • No Physical Waiting
                </span>

                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
                  Book. Track. Arrive. <span style={{ color: 'var(--primary-500)' }}>Get Served.</span>
                </h2>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Welcome to {settings.salonName}. Select your preferred stylist, choose an available time slot, and track your live token queue position in real-time.
                </p>

                <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => setActiveCustomerTab('book')}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg, #6366f1, #ec4899)', border: 'none', fontSize: '0.95rem' }}
                  >
                    <Scissors size={18} />
                    <span>Book Your Visit Now</span>
                  </button>

                  <button
                    onClick={() => setActiveCustomerTab('token')}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                  >
                    <Clock size={18} />
                    <span>Track My Token</span>
                  </button>
                </div>
              </div>

              {/* Quick Queue Status Badge Card */}
              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                minWidth: '260px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  LIVE SALON QUEUE STATUS
                </div>

                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>
                  🟢 Open & Operational
                </div>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Current Avg Wait: <strong style={{ color: '#fbbf24' }}>14 mins</strong>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
                  4 Master Stylists Available Today
                </div>
              </div>
            </div>

            {/* OFFERS CAROUSEL */}
            <CustomerOffersCarousel />

            {/* QUICK BOOKING 3-STEP TEASER */}
            <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Book Your Visit in 3 Simple Steps</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Directly choose your favorite stylist and exact time slot.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                <div 
                  onClick={() => setActiveCustomerTab('book')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(99,102,241,0.2)', color: 'var(--primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    1
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Choose Service</h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Haircut, Beard, Facial, Hair Spa, Color</p>
                </div>

                <div 
                  onClick={() => setActiveCustomerTab('book')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(236,72,153,0.2)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    2
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Select Stylist</h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Pick Arun, Meena, Ravi, or Suresh</p>
                </div>

                <div 
                  onClick={() => setActiveCustomerTab('book')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    3
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Get Smart Token</h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Track queue position live on mobile</p>
                </div>
              </div>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="btn btn-primary"
                style={{ alignSelf: 'center', padding: '0.65rem 2rem' }}
              >
                <span>Start Booking Now</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* SALON GALLERY */}
            <CustomerGallery />
          </div>
        )}

        {/* SERVICES VIEW */}
        {activeCustomerTab === 'services' && <CustomerServicesPage />}

        {/* BOOKING FLOW VIEW */}
        {activeCustomerTab === 'book' && <CustomerBookingFlow />}

        {/* LIVE TOKEN TRACKER VIEW */}
        {activeCustomerTab === 'token' && <CustomerTokenTracker />}

        {/* ACCOUNT PORTAL VIEW */}
        {activeCustomerTab === 'account' && <CustomerPortal />}
      </main>

      {/* Sticky Mobile Bottom Navigation */}
      <CustomerMobileNav />
    </div>
  );
};
