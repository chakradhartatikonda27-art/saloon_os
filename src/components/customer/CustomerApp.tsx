import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { CustomerHeader } from './CustomerHeader';
import { CustomerOffersCarousel } from './CustomerOffersCarousel';
import { CustomerGallery } from './CustomerGallery';
import { CustomerServicesPage } from './CustomerServicesPage';
import { CustomerBookingFlow } from './CustomerBookingFlow';
import { CustomerTokenTracker } from './CustomerTokenTracker';
import { CustomerPortal } from './CustomerPortal';
import { CustomerMobileNav } from './CustomerMobileNav';
import { Scissors, ArrowRight, Sparkles, Clock, CheckCircle, Star, ShieldCheck, Zap } from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { activeCustomerTab, setActiveCustomerTab, settings } = useSalon();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  return (
    <div className="champagne-canvas" style={{ minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Brand Header */}
      <CustomerHeader />

      {/* Main View Switcher Body */}
      <main className="workspace-padding" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        {/* HOME VIEW */}
        {activeCustomerTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* EDITORIAL HERO BANNER */}
            <div 
              className="luxury-card"
              style={{
                padding: '3rem 2.5rem',
                background: 'linear-gradient(135deg, #121118 0%, #241E2E 50%, #1A1624 100%)',
                border: '1.5px solid #C9A24E',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '2rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(18, 17, 24, 0.25)'
              }}
            >
              {/* Subtle Gold Flare Background Layer */}
              <div style={{
                position: 'absolute',
                top: '-40%',
                right: '-10%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(201, 162, 78, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              {/* Hero Left Content */}
              <div style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '1.15rem', zIndex: 1 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(201, 162, 78, 0.15)',
                  color: '#EBD28F',
                  border: '1px solid rgba(201, 162, 78, 0.4)',
                  padding: '0.45rem 1.05rem',
                  borderRadius: '99px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  width: 'fit-content'
                }}>
                  <Sparkles size={15} color="#C9A24E" /> LUXURY SALON EXPERIENCE • MINIMUM WAITING TIME
                </span>

                <h2 style={{ fontSize: '2.65rem', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
                  Elevate Your Style. <span style={{ color: '#C9A24E', fontStyle: 'italic' }}>Get Served Live.</span>
                </h2>

                <p style={{ fontSize: '1rem', color: '#B5AEBF', lineHeight: 1.6, fontWeight: 500 }}>
                  Welcome to {settings.salonName}. Select your preferred stylist, choose an available time slot, and track your live token queue position seamlessly on mobile.
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveCustomerTab('book')}
                    className="champagne-btn-gold"
                    style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
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
                      padding: '0.85rem 1.65rem',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
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
                  borderRadius: '20px',
                  padding: '1.65rem 1.85rem',
                  minWidth: '290px',
                  color: '#121118',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.95rem',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
                  zIndex: 1
                }}
              >
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#5A5463', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  LIVE SALON QUEUE STATUS
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="pulse-glow-ring" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#0E9C86' }} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0E9C86' }}>
                    Open & Operational
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#121118', fontWeight: 800 }}>
                    Current Avg Wait: <span style={{ color: '#C9A24E', fontWeight: 900 }}>14 mins</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5A5463', fontWeight: 600 }}>
                    4 Master Stylists Available Today
                  </div>
                </div>
              </div>
            </div>

            {/* OFFERS & COMBO PACKAGES CAROUSEL */}
            <CustomerOffersCarousel />

            {/* 3-STEP BOOKING JOURNEY (CHAMPAGNE EDITORIAL CARDS) */}
            <div 
              className="luxury-card"
              style={{
                padding: '2.75rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '2rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#C9A24E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  SEAMLESS APPOINTMENT EXPERIENCE
                </span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#121118', marginTop: '0.25rem' }}>
                  Book Your Visit in 3 Simple Steps
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#5A5463', marginTop: '0.25rem' }}>
                  Directly choose your favorite stylist and exact time slot.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', width: '100%' }}>
                {/* Step 1 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '18px',
                  padding: '2rem 1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.95rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#121118',
                    color: '#EBD28F',
                    border: '1.5px solid #C9A24E',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(18, 17, 24, 0.2)'
                  }}>
                    01
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118' }}>Choose Service</h4>
                  <p style={{ fontSize: '0.825rem', color: '#5A5463', lineHeight: 1.4 }}>
                    Haircut, Beard, Facial, Hair Spa, Color & Combos
                  </p>
                </div>

                {/* Step 2 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '18px',
                  padding: '2rem 1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.95rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#121118',
                    color: '#EBD28F',
                    border: '1.5px solid #C9A24E',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(18, 17, 24, 0.2)'
                  }}>
                    02
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118' }}>Select Stylist</h4>
                  <p style={{ fontSize: '0.825rem', color: '#5A5463', lineHeight: 1.4 }}>
                    Pick Arun, Meena, Ravi, or Suresh
                  </p>
                </div>

                {/* Step 3 */}
                <div style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8E3DE',
                  borderRadius: '18px',
                  padding: '2rem 1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.95rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0E9C86',
                    color: '#FFFFFF',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(14, 156, 134, 0.3)'
                  }}>
                    03
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118' }}>Get Smart Token</h4>
                  <p style={{ fontSize: '0.825rem', color: '#5A5463', lineHeight: 1.4 }}>
                    Track queue position live on mobile
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="champagne-btn-gold"
                style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}
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
