import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Plus, Upload, Trash2, Check } from 'lucide-react';

interface ServiceVisibilityItem {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  color: string;
  visible: boolean;
}

interface OfferItem {
  id: string;
  title: string;
  validity: string;
  color: string;
  enabled: boolean;
}

interface GalleryItem {
  id: string;
  caption: string;
  color: string;
  visible: boolean;
}

interface StylistVisibilityItem {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  visible: boolean;
}

export const ServicesConfig: React.FC = () => {
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');

  // 1. Services Visibility & Pricing State
  const [servicesList, setServicesList] = useState<ServiceVisibilityItem[]>([
    { id: '1', name: 'Classic Haircut', category: 'Hair', duration: 30, price: 350, color: '#5B4B8A', visible: true },
    { id: '2', name: 'Premium Haircut & Style', category: 'Hair', duration: 45, price: 650, color: '#4B3F72', visible: true },
    { id: '3', name: 'Hair Spa', category: 'Hair', duration: 60, price: 1200, color: '#3E345D', visible: true },
    { id: '4', name: 'Beard Trim & Shape', category: 'Beard', duration: 20, price: 250, color: '#A07830', visible: true },
    { id: '5', name: 'Hot Towel Shave', category: 'Beard', duration: 30, price: 400, color: '#916B27', visible: true },
    { id: '6', name: 'Signature Glow Facial', category: 'Facial', duration: 45, price: 1500, color: '#D9584A', visible: true },
    { id: '7', name: 'Head & Shoulder Massage', category: 'Spa', duration: 30, price: 700, color: '#0E9C86', visible: true },
    { id: '8', name: 'De-Tan Treatment', category: 'Skin', duration: 40, price: 900, color: '#D97706', visible: true },
    { id: '9', name: 'Global Hair Color', category: 'Color', duration: 90, price: 2500, color: '#B93829', visible: true },
    { id: '10', name: 'Root Touch-up', category: 'Color', duration: 45, price: 1100, color: '#9C3A27', visible: true },
    { id: '11', name: 'Manicure', category: 'Other', duration: 40, price: 600, color: '#4A5568', visible: true }
  ]);

  // 2. Offers State
  const [offersList, setOffersList] = useState<OfferItem[]>([
    { id: 'off-1', title: 'Flat 20% OFF on Hair Spa', validity: 'Valid till 15 Sep', color: '#5B4B8A', enabled: true },
    { id: 'off-2', title: 'Haircut Package ₹699', validity: 'Sat & Sun only', color: '#4A3F2C', enabled: true },
    { id: 'off-3', title: '₹500 OFF on Gold Membership', validity: 'This month', color: '#0E9C86', enabled: true }
  ]);

  // 3. Gallery Media State
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([
    { id: 'gal-1', caption: 'Reception', color: '#5B4B8A', visible: true },
    { id: 'gal-2', caption: 'Styling floor', color: '#A07830', visible: true },
    { id: 'gal-3', caption: 'Wash bar', color: '#0E9C86', visible: true },
    { id: 'gal-4', caption: 'Spa suite', color: '#5B4B8A', visible: true },
    { id: 'gal-5', caption: 'Color studio', color: '#B93829', visible: true },
    { id: 'gal-6', caption: 'The team', color: '#2B213A', visible: true }
  ]);

  // 4. Stylists Visibility State
  const [stylistsList, setStylistsList] = useState<StylistVisibilityItem[]>([
    { id: 'sty-1', name: 'Arun', role: 'Senior Stylist', avatarColor: '#2B213A', visible: true },
    { id: 'sty-2', name: 'Meena', role: 'Hair & Beauty Specialist', avatarColor: '#0E9C86', visible: true },
    { id: 'sty-3', name: 'Sanjay', role: 'Barber & Grooming Expert', avatarColor: '#8C6F2B', visible: true },
    { id: 'sty-4', name: 'Priya', role: 'Skin & Spa Therapist', avatarColor: '#D9584A', visible: true }
  ]);

  // Toggle Helpers
  const toggleService = (id: string) => {
    setServicesList(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const updateServicePrice = (id: string, newPrice: number) => {
    setServicesList(prev => prev.map(s => s.id === id ? { ...s, price: Math.max(0, newPrice) } : s));
  };

  const toggleOffer = (id: string) => {
    setOffersList(prev => prev.map(o => o.id === id ? { ...o, enabled: !o.enabled } : o));
  };

  const handleAddOffer = () => {
    if (!newOfferTitle.trim()) return;
    setOffersList(prev => [
      ...prev,
      { id: `off-${Date.now()}`, title: newOfferTitle.trim(), validity: 'Limited time', color: '#5B4B8A', enabled: true }
    ]);
    setNewOfferTitle('');
  };

  const toggleGallery = (id: string) => {
    setGalleryList(prev => prev.map(g => g.id === id ? { ...g, visible: !g.visible } : g));
  };

  const handleRemoveGallery = (id: string) => {
    setGalleryList(prev => prev.filter(g => g.id !== id));
  };

  const handleUploadGallery = () => {
    if (!newGalleryCaption.trim()) return;
    setGalleryList(prev => [
      ...prev,
      { id: `gal-${Date.now()}`, caption: newGalleryCaption.trim(), color: '#0E9C86', visible: true }
    ]);
    setNewGalleryCaption('');
  };

  const toggleStylist = (id: string) => {
    setStylistsList(prev => prev.map(st => st.id === id ? { ...st, visible: !st.visible } : st));
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Services · Offers · Media
        </h2>
      </div>

      {/* Main 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* LEFT COLUMN: SERVICES VISIBILITY & PRICING + STYLIST VISIBILITY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* SERVICES VISIBILITY & PRICING CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SERVICES VISIBILITY & PRICING
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {servicesList.map(srv => (
                <div
                  key={srv.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Color Avatar Tile */}
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: srv.color, flexShrink: 0 }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14121A' }}>{srv.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#75707E' }}>{srv.category} · {srv.duration} min</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Inline Price Input Box */}
                    <input
                      type="number"
                      value={srv.price}
                      onChange={e => updateServicePrice(srv.id, Number(e.target.value))}
                      style={{
                        width: '75px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8E3DE',
                        borderRadius: '6px',
                        padding: '0.35rem 0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#14121A',
                        textAlign: 'center',
                        outline: 'none'
                      }}
                    />

                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleService(srv.id)}
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: srv.visible ? '#0E9C86' : '#E8E3DE',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          transform: srv.visible ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease'
                        }}
                      ></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STYLIST VISIBILITY (CUSTOMER WEB) CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              STYLIST VISIBILITY (CUSTOMER WEB)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {stylistsList.map(st => (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Stylist Circle Avatar */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: st.avatarColor,
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14121A' }}>{st.name}</div>
                      <div style={{ fontSize: '0.725rem', color: '#75707E' }}>{st.role}</div>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleStylist(st.id)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: st.visible ? '#0E9C86' : '#E8E3DE',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transform: st.visible ? 'translateX(20px)' : 'translateX(0px)',
                        transition: 'transform 0.2s ease'
                      }}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OFFERS + GALLERY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* OFFERS CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              OFFERS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {offersList.map(off => (
                <div
                  key={off.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: off.color, flexShrink: 0 }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14121A' }}>{off.title}</div>
                      <div style={{ fontSize: '0.725rem', color: '#75707E' }}>{off.validity}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleOffer(off.id)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: off.enabled ? '#0E9C86' : '#E8E3DE',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transform: off.enabled ? 'translateX(20px)' : 'translateX(0px)',
                        transition: 'transform 0.2s ease'
                      }}
                    ></div>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Offer Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="New offer title, e.g. Monsoon Spa ₹899"
                value={newOfferTitle}
                onChange={e => setNewOfferTitle(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleAddOffer}
                style={{
                  backgroundColor: '#14121A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* GALLERY (SALON PROFILE → MEDIA) CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              GALLERY (SALON PROFILE → MEDIA)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {galleryList.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: item.color, flexShrink: 0 }}></div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14121A' }}>{item.caption}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleRemoveGallery(item.id)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8E3DE',
                        borderRadius: '6px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#14121A',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => toggleGallery(item.id)}
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: item.visible ? '#0E9C86' : '#E8E3DE',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          transform: item.visible ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease'
                        }}
                      ></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="Image caption (upload simulated)"
                value={newGalleryCaption}
                onChange={e => setNewGalleryCaption(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleUploadGallery}
                style={{
                  backgroundColor: '#14121A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
