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
import { Scissors, ArrowRight, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { activeCustomerTab, setActiveCustomerTab, settings } = useSalon();

  return (
    <div className="champagne-canvas" style={{ minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Brand Header */}
      <CustomerHeader />

      {/* Main View Switcher Body */}
      <main style={{ padding: '1.25rem 0.85rem', maxWidth: '1280px', margin: '0 auto' }}>
        {/* HOME VIEW */}
        {activeCustomerTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* EDITORIAL HERO BANNER */}
            <div 
              className="luxury-card"
              style={{
                padding: '2rem 1.35rem',
                background: 'linear-gradient(135deg, #121118 0%, #241E2E 50%, #1A1624 100%)',
                border: '1.5px solid #C9A24E',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(18, 17, 24, 0.25)'
              }}
            >
              {/* Subtle Gold Flare Background Layer */}
              <div style={{
                position: 'absolute',
                top: '-40%',
                right: '-10%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(201, 162, 78, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              {/* Hero Left Content */}
              <div style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '0.95rem', zIndex: 1, width: '100%' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(201, 162, 78, 0.15)',
                  color: '#EBD28F',
                  border: '1px solid rgba(201, 162, 78, 0.4)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  width: 'fit-content'
                }}>
                  <Sparkles size={14} color="#C9A24E" /> LUXURY SALON EXPERIENCE • MINIMAL WAIT
                </span>

                <h2 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0 }}>
                  Elevate Your Style. <span style={{ color: '#C9A24E', fontStyle: 'italic' }}>Get Served Live.</span>
                </h2>

                <p style={{ fontSize: '0.875rem', color: '#B5AEBF', lineHeight: 1.5, fontWeight: 500, margin: 0 }}>
                  Welcome to {settings.salonName}. Choose your stylist, select a slot, and track your live token queue position seamlessly on mobile.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem', flexWrap: 'wrap', width: '100%' }}>
                  <button
                    onClick={() => setActiveCustomerTab('book')}
                    className="champagne-btn-gold"
                    style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', flex: '1 1 180px' }}
                  >
                    <Scissors size={18} />
                    <span>Book Your Visit Now</span>
                  </button>

                  <button
                    onClick={() => setActiveCustomerTab('token')}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '12px',
                      padding: '0.8rem 1.35rem',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      flex: '1 1 160px'
                    }}
                  >
                    <Clock size={18} color="#C9A24E" />
                    <span>Track My Token</span>
                  </button>
                </div>
              </div>

              {/* Hero Right Queue Status Card */}
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  width: '100%',
                  color: '#121118',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                  zIndex: 1
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  LIVE SALON QUEUE STATUS
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="pulse-glow-ring" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0E9C86' }} />
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0E9C86' }}>
                    Open & Operational
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <div style={{ color: '#121118', fontWeight: 800 }}>
                    Avg Wait: <span style={{ color: '#C9A24E', fontWeight: 900 }}>14 mins</span>
                  </div>
                  <div style={{ color: '#5A5463', fontWeight: 600 }}>
                    4 Stylists Active
                  </div>
                </div>
              </div>
            </div>

            {/* OFFERS & COMBO PACKAGES CAROUSEL */}
            <CustomerOffersCarousel />

            {/* 3-STEP BOOKING JOURNEY */}
            <div 
              className="luxury-card"
              style={{
                padding: '2rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.5rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.725rem', fontWeight: 900, color: '#C9A24E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  SEAMLESS APPOINTMENT EXPERIENCE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#121118', marginTop: '0.2rem' }}>
                  Book Your Visit in 3 Simple Steps
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', width: '100%' }}>
                {/* Step 1 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#121118',
                    color: '#EBD28F',
                    border: '1.5px solid #C9A24E',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    01
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#121118', margin: 0 }}>Choose Service</h4>
                  <p style={{ fontSize: '0.8rem', color: '#5A5463', lineHeight: 1.4, margin: 0 }}>
                    Haircut, Beard, Facial, Hair Spa & Combos
                  </p>
                </div>

                {/* Step 2 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#121118',
                    color: '#EBD28F',
                    border: '1.5px solid #C9A24E',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    02
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#121118', margin: 0 }}>Select Stylist</h4>
                  <p style={{ fontSize: '0.8rem', color: '#5A5463', lineHeight: 1.4, margin: 0 }}>
                    Pick Arun, Meena, Ravi, or Suresh
                  </p>
                </div>

                {/* Step 3 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#0E9C86',
                    color: '#FFFFFF',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    03
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#121118', margin: 0 }}>Get Smart Token</h4>
                  <p style={{ fontSize: '0.8rem', color: '#5A5463', lineHeight: 1.4, margin: 0 }}>
                    Track queue position live on mobile
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-gold"
                style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
                <span>Start Booking Now</span> <ArrowRight size={18} />
              </button>
            </div>

            {/* PHOTO GALLERY SHOWCASE */}
            <CustomerGallery />
          </div>
        )}

        {/* SERVICES VIEW */}
        {activeCustomerTab === 'services' && <CustomerServicesPage />}

        {/* BOOK VISIT FLOW */}
        {activeCustomerTab === 'book' && <CustomerBookingFlow />}

        {/* LIVE TOKEN TRACKER */}
        {activeCustomerTab === 'token' && <CustomerTokenTracker />}

        {/* ACCOUNT PORTAL */}
        {activeCustomerTab === 'account' && <CustomerPortal />}
      </main>

      {/* Floating Bottom Navigation Dock */}
      <CustomerMobileNav />
    </div>
  );
};
