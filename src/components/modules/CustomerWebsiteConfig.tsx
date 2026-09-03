import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Globe, Smartphone, Bell, Share2, Check } from 'lucide-react';

interface FeatureToggle {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
}

interface NotificationChannel {
  id: string;
  title: string;
  enabled: boolean;
}

export const CustomerWebsiteConfig: React.FC = () => {
  // Feature Toggles State
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([
    { id: '1', title: 'Online booking', subtitle: 'Turn off to stop new requests instantly', enabled: true },
    { id: '2', title: 'Offers carousel', subtitle: 'Auto-scrolling, swipeable', enabled: true },
    { id: '3', title: 'Image gallery', subtitle: 'Managed under Services · Offers · Media', enabled: true },
    { id: '4', title: 'Stylist section', subtitle: 'Profiles, ratings, live availability', enabled: true },
    { id: '5', title: 'Packages', subtitle: 'Bundled pricing with savings shown', enabled: true },
    { id: '6', title: 'Queue visibility', subtitle: 'Customers can see the full stylist queue', enabled: true },
    { id: '7', title: 'Loyalty visibility', subtitle: 'Points, value, progress', enabled: true },
    { id: '8', title: 'Membership visibility', subtitle: 'Silver / Gold tiers on the site', enabled: true }
  ]);

  // Notification Channels State
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    { id: 'notif-1', title: 'In-app', enabled: true },
    { id: 'notif-2', title: 'Push', enabled: true },
    { id: 'notif-3', title: 'WhatsApp', enabled: true },
    { id: 'notif-4', title: 'SMS', enabled: true },
    { id: 'notif-5', title: 'Email', enabled: true }
  ]);

  // Branding & Contact Form State
  const [salonName, setSalonName] = useState('Aurum Salon & Spa');
  const [urlSlug, setUrlSlug] = useState('aurum');
  const [location, setLocation] = useState('MVP Colony, Visakhapatnam');
  const [phone, setPhone] = useState('+91 98480 12345');
  const [whatsapp, setWhatsapp] = useState('919848012345');
  const [openingHours, setOpeningHours] = useState('10:00 AM – 9:00 PM');
  const [coverStyle, setCoverStyle] = useState<'Plum' | 'Teal' | 'Bronze'>('Plum');

  // Social Links State
  const [instagram, setInstagram] = useState('@aurum.vizag');
  const [facebook, setFacebook] = useState('AurumSalonVizag');
  const [maps, setMaps] = useState('g.page/aurum');

  const toggleFeature = (id: string) => {
    setFeatureToggles(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const toggleChannel = (id: string) => {
    setNotificationChannels(prev => prev.map(nc => nc.id === id ? { ...nc, enabled: !nc.enabled } : nc));
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Customer website
        </h2>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* LEFT COLUMN: PUBLIC URL + FEATURE TOGGLES + NOTIFICATION CHANNELS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* PUBLIC URL BANNER */}
          <div style={{ backgroundColor: '#FAF3E8', border: '1px solid #F0E1C9', borderRadius: '16px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              PUBLIC URL
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#916B27' }}>
              aurum.salonos.in · salonos.in/salon/aurum
            </div>
            <div style={{ fontSize: '0.775rem', color: '#75707E', marginTop: '0.25rem' }}>
              No login to browse. OTP login only for booking, loyalty, history, token tracking.
            </div>
          </div>

          {/* FEATURE TOGGLES LIST */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {featureToggles.map(ft => (
              <div
                key={ft.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#14121A' }}>{ft.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#75707E' }}>{ft.subtitle}</div>
                </div>

                <button
                  onClick={() => toggleFeature(ft.id)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: ft.enabled ? '#0E9C86' : '#E8E3DE',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      transform: ft.enabled ? 'translateX(20px)' : 'translateX(0px)',
                      transition: 'transform 0.2s ease'
                    }}
                  ></div>
                </button>
              </div>
            ))}
          </div>

          {/* NOTIFICATION CHANNELS (SALON-LEVEL) */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              NOTIFICATION CHANNELS (SALON-LEVEL)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {notificationChannels.map(nc => (
                <div
                  key={nc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#14121A' }}>{nc.title}</div>

                  <button
                    onClick={() => toggleChannel(nc.id)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: nc.enabled ? '#0E9C86' : '#E8E3DE',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px',
                      flexShrink: 0
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transform: nc.enabled ? 'translateX(20px)' : 'translateX(0px)',
                        transition: 'transform 0.2s ease'
                      }}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRANDING & CONTACT + SOCIAL LINKS + CANCELLATION POLICY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* BRANDING & CONTACT CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              BRANDING & CONTACT
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Salon name</label>
                <input
                  type="text"
                  value={salonName}
                  onChange={e => setSalonName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>URL slug</label>
                <input
                  type="text"
                  value={urlSlug}
                  onChange={e => setUrlSlug(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>WhatsApp number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Opening hours (display)</label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={e => setOpeningHours(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>
            </div>

            {/* COVER STYLE PILLS */}
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>COVER STYLE</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['Plum', 'Teal', 'Bronze'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setCoverStyle(style)}
                    style={{
                      padding: '0.45rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      borderRadius: '8px',
                      backgroundColor: coverStyle === style ? '#14121A' : '#FFFFFF',
                      color: coverStyle === style ? '#FFFFFF' : '#14121A',
                      border: coverStyle === style ? '1px solid #14121A' : '1px solid #E8E3DE',
                      cursor: 'pointer'
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SOCIAL LINKS
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Instagram</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Facebook</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={e => setFacebook(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Maps</label>
              <input
                type="text"
                value={maps}
                onChange={e => setMaps(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#14121A', outline: 'none' }}
              />
            </div>
          </div>

          {/* CANCELLATION POLICY */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CANCELLATION POLICY (SHOWN BEFORE CONFIRMATION)
            </div>

            <div style={{ backgroundColor: '#FAF3E8', border: '1px solid #F0E1C9', borderRadius: '12px', padding: '1rem', fontSize: '0.8rem', color: '#916B27' }}>
              Free cancellation up to 2 hours before appointment. Edit under Booking & token rules.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
