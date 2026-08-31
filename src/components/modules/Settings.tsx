import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Settings as SettingsIcon, Save, Building, ShieldCheck, CreditCard, Bell, Sparkles } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSalon();

  const [salonName, setSalonName] = useState(settings.salonName);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [gstin, setGstin] = useState(settings.gstin);
  const [invoicePrefix, setInvoicePrefix] = useState(settings.invoicePrefix);
  const [defaultTaxRate, setDefaultTaxRate] = useState(settings.defaultTaxRate);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      salonName,
      phone,
      email,
      address,
      gstin,
      invoicePrefix,
      defaultTaxRate
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Salon OS Tenant & Business Settings</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tenant isolation parameters, GST invoice configuration, store business hours, and subscription plan.
          </p>
        </div>

        {savedSuccess && (
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>
            ✓ Settings saved successfully!
          </div>
        )}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Salon Profile Panel */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={18} color="var(--primary-500)" />
            <span>Salon Business Profile & GSTIN</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Salon Business Name</label>
              <input className="form-input" value={salonName} onChange={e => setSalonName(e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">GSTIN Tax Identification</label>
              <input className="form-input" value={gstin} onChange={e => setGstin(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Phone Contact</label>
              <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Official Email</label>
              <input className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Physical Address</label>
            <input className="form-input" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
        </div>

        {/* Billing & Invoice Defaults */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={18} color="#fbbf24" />
            <span>Billing & Invoice Configuration</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Invoice Prefix</label>
              <input className="form-input" value={invoicePrefix} onChange={e => setInvoicePrefix(e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Default Tax Rate (%)</label>
              <input className="form-input" type="number" value={defaultTaxRate} onChange={e => setDefaultTaxRate(Number(e.target.value))} />
            </div>
          </div>
        </div>

        {/* SaaS Subscription Info */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-500)', textTransform: 'uppercase' }}>Current Subscription</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Growth Pro Plan (Multi-Branch Active)</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tenant ID: {settings.tenantId} • Renews on 31 Dec 2026</div>
          </div>

          <span className="badge badge-completed" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
            Active Subscription
          </span>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Save size={18} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
