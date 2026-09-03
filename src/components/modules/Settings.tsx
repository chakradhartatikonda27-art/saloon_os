import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Building, Calendar, Users, CreditCard, Bell, Sparkles, Check, Upload } from 'lucide-react';

interface RolePermissionRow {
  module: string;
  owner: boolean;
  manager: boolean;
  receptionist: boolean;
  stylist: boolean;
  barber: boolean;
  therapist: boolean;
}

export const Settings: React.FC = () => {
  const { settings, updateSettings, setActiveModule } = useSalon();

  const [activeTab, setActiveTab] = useState<'Salon profile' | 'Booking' | 'Staff' | 'Billing' | 'Notifications' | 'Subscription'>('Salon profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tab 1: Salon Profile State
  const [salonName, setSalonName] = useState('Aurum Salon & Spa');
  const [urlSlug, setUrlSlug] = useState('aurum');
  const [address, setAddress] = useState('Plot 12, Sector 4, MVP Colony, Visakhapatnam 530017');
  const [phone, setPhone] = useState('+91 98480 12345');
  const [email, setEmail] = useState('hello@aurum.in');
  const [gstin, setGstin] = useState('37AABCU9603R1ZX');
  const [businessHours, setBusinessHours] = useState('10:00 AM – 9:00 PM');

  // Tab 2: Booking State
  const [defaultDuration, setDefaultDuration] = useState(30);
  const [bufferTime, setBufferTime] = useState(5);
  const [advanceBookingDays, setAdvanceBookingDays] = useState(7);
  const [freeCancellationHours, setFreeCancellationHours] = useState(2);
  const [noShowGraceMin, setNoShowGraceMin] = useState(10);
  const [advancePaymentPercent, setAdvancePaymentPercent] = useState(0);

  // Tab 3: Staff Roles & Permissions Matrix State
  const [rolePermissions, setRolePermissions] = useState<RolePermissionRow[]>([
    { module: 'dashboard', owner: true, manager: true, receptionist: true, stylist: false, barber: false, therapist: false },
    { module: 'live', owner: true, manager: true, receptionist: true, stylist: true, barber: true, therapist: true },
    { module: 'queue', owner: true, manager: true, receptionist: true, stylist: true, barber: true, therapist: true },
    { module: 'appointments', owner: true, manager: true, receptionist: true, stylist: true, barber: true, therapist: true },
    { module: 'pos', owner: true, manager: true, receptionist: true, stylist: false, barber: false, therapist: false },
    { module: 'invoices', owner: true, manager: true, receptionist: true, stylist: false, barber: false, therapist: false },
    { module: 'customers', owner: true, manager: true, receptionist: true, stylist: false, barber: false, therapist: false },
    { module: 'staff', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'attendance', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'payroll', owner: true, manager: false, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'commissions', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'expenses', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'inventory', owner: true, manager: true, receptionist: true, stylist: false, barber: false, therapist: false },
    { module: 'marketing', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'reports', owner: true, manager: true, receptionist: false, stylist: false, barber: false, therapist: false },
    { module: 'settings', owner: true, manager: false, receptionist: false, stylist: false, barber: false, therapist: false }
  ]);

  // Tab 4: Billing State
  const [invoicePrefix, setInvoicePrefix] = useState('INV');
  const [gstPercent, setGstPercent] = useState(18);
  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    upi: true,
    card: true,
    other: true
  });

  const toggleRolePermission = (moduleName: string, roleKey: 'manager' | 'receptionist' | 'stylist' | 'barber' | 'therapist') => {
    setRolePermissions(prev => prev.map(row => row.module === moduleName ? { ...row, [roleKey]: !row[roleKey] } : row));
  };

  const togglePaymentMethod = (method: 'cash' | 'upi' | 'card' | 'other') => {
    setPaymentMethods(prev => ({ ...prev, [method]: !prev[method] }));
  };

  const handleSave = () => {
    updateSettings({
      salonName,
      phone,
      email,
      address,
      gstin,
      invoicePrefix,
      defaultTaxRate: gstPercent
    });
    setToastMessage('Settings updated successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '0.65rem 1rem', fontSize: '0.825rem', fontWeight: 700, borderRadius: '10px', textAlign: 'center' }}>
          ✨ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Settings
        </h2>
      </div>

      {/* Navigation Pills Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid #E8E3DE', paddingBottom: '0.85rem' }}>
        {(['Salon profile', 'Booking', 'Staff', 'Billing', 'Notifications', 'Subscription'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#14121A' : '#FFFFFF',
              color: activeTab === tab ? '#FFFFFF' : '#14121A',
              border: activeTab === tab ? '1px solid #14121A' : '1px solid #E8E3DE',
              borderRadius: '99px',
              padding: '0.45rem 1.15rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: SALON PROFILE (SCREENSHOT 1) */}
      {activeTab === 'Salon profile' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Salon name</label>
              <input
                type="text"
                value={salonName}
                onChange={e => setSalonName(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>URL slug</label>
              <input
                type="text"
                value={urlSlug}
                onChange={e => setUrlSlug(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Email</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>GSTIN</label>
              <input
                type="text"
                value={gstin}
                onChange={e => setGstin(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Business hours (display)</label>
              <input
                type="text"
                value={businessHours}
                onChange={e => setBusinessHours(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Logo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#C9A24E', color: '#14121A', fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  A
                </div>
                <button
                  onClick={handleSave}
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.55rem 1rem', fontSize: '0.8rem', fontWeight: 800, color: '#14121A', cursor: 'pointer' }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              style={{ backgroundColor: '#C9A24E', color: '#14121A', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 900, cursor: 'pointer' }}
            >
              Save Salon Profile
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING (SCREENSHOT 2) */}
      {activeTab === 'Booking' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Default appointment duration (min)</label>
              <input
                type="number"
                value={defaultDuration}
                onChange={e => setDefaultDuration(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Buffer time (min)</label>
              <input
                type="number"
                value={bufferTime}
                onChange={e => setBufferTime(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Advance booking (days)</label>
              <input
                type="number"
                value={advanceBookingDays}
                onChange={e => setAdvanceBookingDays(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Free cancellation (hours before)</label>
              <input
                type="number"
                value={freeCancellationHours}
                onChange={e => setFreeCancellationHours(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>No-show grace (min)</label>
              <input
                type="number"
                value={noShowGraceMin}
                onChange={e => setNoShowGraceMin(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Advance payment required (%) · 0 = off</label>
              <input
                type="number"
                value={advancePaymentPercent}
                onChange={e => setAdvancePaymentPercent(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ fontSize: '0.775rem', color: '#75707E' }}>
            Request window, token format, walk-in rule and priority tokens live under{' '}
            <span
              onClick={() => setActiveModule('booking_rules')}
              style={{ color: '#C9A24E', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
            >
              Booking & token rules
            </span>.
          </div>

          <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              style={{ backgroundColor: '#C9A24E', color: '#14121A', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 900, cursor: 'pointer' }}
            >
              Save Booking Defaults
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF (SCREENSHOTS 3 & 4) */}
      {activeTab === 'Staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* ROLES & PERMISSIONS MATRIX TABLE */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ROLES & PERMISSIONS
            </div>

            <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>MODULE</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>OWNER</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>MANAGER</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>RECEPTIONIST</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>STYLIST</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>BARBER</th>
                    <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>THERAPIST</th>
                  </tr>
                </thead>
                <tbody>
                  {rolePermissions.map(row => (
                    <tr key={row.module} style={{ borderBottom: '1px solid #E8E3DE' }}>
                      {/* MODULE */}
                      <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: '#14121A' }}>
                        {row.module}
                      </td>

                      {/* OWNER CHECKMARK */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#14121A', fontWeight: 900 }}>
                        ✓
                      </td>

                      {/* MANAGER TOGGLE */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleRolePermission(row.module, 'manager')}
                          style={{
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: row.manager ? '#0E9C86' : '#E8E3DE',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', transform: row.manager ? 'translateX(16px)' : 'translateX(0px)', transition: 'transform 0.2s ease' }}></div>
                        </button>
                      </td>

                      {/* RECEPTIONIST TOGGLE */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleRolePermission(row.module, 'receptionist')}
                          style={{
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: row.receptionist ? '#0E9C86' : '#E8E3DE',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', transform: row.receptionist ? 'translateX(16px)' : 'translateX(0px)', transition: 'transform 0.2s ease' }}></div>
                        </button>
                      </td>

                      {/* STYLIST TOGGLE */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleRolePermission(row.module, 'stylist')}
                          style={{
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: row.stylist ? '#0E9C86' : '#E8E3DE',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', transform: row.stylist ? 'translateX(16px)' : 'translateX(0px)', transition: 'transform 0.2s ease' }}></div>
                        </button>
                      </td>

                      {/* BARBER TOGGLE */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleRolePermission(row.module, 'barber')}
                          style={{
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: row.barber ? '#0E9C86' : '#E8E3DE',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', transform: row.barber ? 'translateX(16px)' : 'translateX(0px)', transition: 'transform 0.2s ease' }}></div>
                        </button>
                      </td>

                      {/* THERAPIST TOGGLE */}
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggleRolePermission(row.module, 'therapist')}
                          style={{
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: row.therapist ? '#0E9C86' : '#E8E3DE',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF', transform: row.therapist ? 'translateX(16px)' : 'translateX(0px)', transition: 'transform 0.2s ease' }}></div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COMMISSION DEFAULTS CARD */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              COMMISSION DEFAULTS
            </div>
            <div style={{ fontSize: '0.8rem', color: '#75707E' }}>
              Set per staff under <span onClick={() => setActiveModule('staff')} style={{ color: '#C9A24E', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Staff → Commission rules</span>. Arun: 10% · Meena: 10% · Sanjay: ₹60/service · Priya: 10%
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BILLING (SCREENSHOT 5) */}
      {activeTab === 'Billing' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>Invoice prefix</label>
              <input
                type="text"
                value={invoicePrefix}
                onChange={e => setInvoicePrefix(e.target.value)}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>GST %</label>
              <input
                type="number"
                value={gstPercent}
                onChange={e => setGstPercent(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.875rem', color: '#14121A', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              PAYMENT METHODS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(['cash', 'upi', 'card', 'other'] as const).map(method => (
                <div
                  key={method}
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
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#14121A', textTransform: 'capitalize' }}>
                    {method === 'upi' ? 'UPI' : method}
                  </div>

                  <button
                    onClick={() => togglePaymentMethod(method)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: paymentMethods[method] ? '#0E9C86' : '#E8E3DE',
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
                        transform: paymentMethods[method] ? 'translateX(20px)' : 'translateX(0px)',
                        transition: 'transform 0.2s ease'
                      }}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E8E3DE', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              style={{ backgroundColor: '#C9A24E', color: '#14121A', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 900, cursor: 'pointer' }}
            >
              Save Billing Defaults
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: NOTIFICATIONS & TAB 6: SUBSCRIPTION */}
      {(activeTab === 'Notifications' || activeTab === 'Subscription') && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {activeTab.toUpperCase()} CONFIGURATION
          </div>
          <div style={{ fontSize: '0.9rem', color: '#14121A' }}>
            Active Subscription: <strong>Pro Plan (Multi-Branch Active)</strong> · Renews 30 Sep 2026.
          </div>
        </div>
      )}
    </div>
  );
};
