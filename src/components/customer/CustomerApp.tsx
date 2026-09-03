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
import { Scissors, ArrowRight, Sparkles, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const { activeCustomerTab, setActiveCustomerTab, settings } = useSalon();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D0C10', color: '#F8FAFC', paddingBottom: '90px', fontFamily: 'var(--font-body)' }}>
      {/* Brand Header */}
      <CustomerHeader />

      {/* Main View Switcher Body */}
      <main className="workspace-padding" style={{ padding: '1.75rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* HOME VIEW */}
        {activeCustomerTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {/* HERO BANNER SECTION (3D FLOATING CARD) */}
            <div 
              className="card-3d-hover"
              style={{
                padding: '2.75rem 2.25rem',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(36, 30, 46, 0.95) 0%, rgba(20, 18, 26, 0.98) 100%)',
                border: '1px solid rgba(201, 162, 78, 0.35)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(201, 162, 78, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.75rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Gold Ambient Background Glow */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(201, 162, 78, 0.18) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 1 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(201, 162, 78, 0.12)',
                  color: '#EBD28F',
                  border: '1px solid rgba(201, 162, 78, 0.35)',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '99px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  width: 'fit-content'
                }}>
                  <Sparkles size={14} color="#C9A24E" /> Luxury Salon Experience • Minimum Waiting Time
                </span>

                <h2 style={{ fontSize: '2.35rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                  Book. Track. Arrive. <span style={{ color: '#C9A24E', textShadow: '0 0 20px rgba(201, 162, 78, 0.4)' }}>Get Served.</span>
                </h2>

                <p style={{ fontSize: '0.95rem', color: '#A19BAA', lineHeight: 1.6 }}>
                  Welcome to {settings.salonName}. Select your preferred stylist, choose an available time slot, and track your live token queue position in real-time.
                </p>

                <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveCustomerTab('book')}
                    className="btn-3d-gold"
                    style={{ padding: '0.8rem 1.85rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Scissors size={18} />
                    <span>Book Your Visit Now</span>
                  </button>

                  <button
                    onClick={() => setActiveCustomerTab('token')}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '0.8rem 1.5rem',
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

              {/* Quick Queue Status Badge Card */}
              <div 
                className="card-3d-hover"
                style={{
                  backgroundColor: 'rgba(13, 12, 16, 0.9)',
                  border: '1px solid rgba(14, 156, 134, 0.4)',
                  borderRadius: '18px',
                  padding: '1.5rem 1.75rem',
                  minWidth: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                  zIndex: 1
                }}
              >
                <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#A19BAA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  LIVE SALON QUEUE STATUS
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="pulse-glow-ring" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#0E9C86' }} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0E9C86' }}>
                    Open & Operational
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700 }}>
                    Current Avg Wait: <span style={{ color: '#C9A24E', fontWeight: 900 }}>14 mins</span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#A19BAA' }}>
                    4 Master Stylists Available Today
                  </div>
                </div>
              </div>
            </div>

            {/* OFFERS CAROUSEL */}
            <CustomerOffersCarousel />

            {/* 3-STEP BOOKING GUIDE (TRENDY 3D CARDS) */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              color: '#14121A',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.75rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#14121A' }}>
                  Book Your Visit in 3 Simple Steps
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#75707E', marginTop: '0.25rem' }}>
                  Directly choose your favorite stylist and exact time slot.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', width: '100%' }}>
                {/* Step 1 */}
                <div style={{
                  backgroundColor: '#2A2436',
                  borderRadius: '18px',
                  padding: '1.75rem 1.25rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#C9A24E',
                    color: '#14121A',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(201, 162, 78, 0.4)'
                  }}>
                    1
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Choose Service</h4>
                  <p style={{ fontSize: '0.775rem', color: '#A19BAA' }}>
                    Haircut, Beard, Facial, Hair Spa, Color
                  </p>
                </div>

                {/* Step 2 */}
                <div style={{
                  backgroundColor: '#2A2436',
                  borderRadius: '18px',
                  padding: '1.75rem 1.25rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#C9A24E',
                    color: '#14121A',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(201, 162, 78, 0.4)'
                  }}>
                    2
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Select Stylist</h4>
                  <p style={{ fontSize: '0.775rem', color: '#A19BAA' }}>
                    Pick Arun, Meena, Ravi, or Suresh
                  </p>
                </div>

                {/* Step 3 */}
                <div style={{
                  backgroundColor: '#2A2436',
                  borderRadius: '18px',
                  padding: '1.75rem 1.25rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#0E9C86',
                    color: '#FFFFFF',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(14, 156, 134, 0.4)'
                  }}>
                    3
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Get Smart Token</h4>
                  <p style={{ fontSize: '0.775rem', color: '#A19BAA' }}>
                    Track queue position live on mobile
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCustomerTab('book')}
                className="btn-3d-gold"
                style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
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

      {/* Floating 3D Bottom Dock Navigation */}
      <CustomerMobileNav />
    </div>
  );
};
