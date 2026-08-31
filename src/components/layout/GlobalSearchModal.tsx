import React, { useState, useEffect } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Search, X, User, Calendar, Receipt } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isGlobalSearchOpen, 
    setIsGlobalSearchOpen, 
    customers, 
    appointments, 
    invoices, 
    services, 
    staff,
    setActiveModule,
    setActiveCustomerProfileId,
    setActiveInvoicePreview
  } = useSalon();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingCustomers = cleanQuery ? customers.filter(c => 
    c.name.toLowerCase().includes(cleanQuery) || c.phone.includes(cleanQuery) || c.email.toLowerCase().includes(cleanQuery)
  ) : customers.slice(0, 3);

  const matchingAppointments = cleanQuery ? appointments.filter(a => 
    a.customerName.toLowerCase().includes(cleanQuery) || 
    a.serviceName.toLowerCase().includes(cleanQuery) || 
    a.appointmentNumber.toLowerCase().includes(cleanQuery)
  ) : appointments.slice(0, 3);

  const matchingInvoices = cleanQuery ? invoices.filter(i => 
    i.customerName.toLowerCase().includes(cleanQuery) || i.invoiceNumber.toLowerCase().includes(cleanQuery)
  ) : invoices.slice(0, 3);

  return (
    <div className="modal-overlay" onClick={() => setIsGlobalSearchOpen(false)}>
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '650px', top: '10vh', position: 'absolute' }}
      >
        {/* Search Header Input */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Search size={20} color="var(--primary-500)" />
          <input
            type="text"
            autoFocus
            placeholder="Search customers, appointments, invoices, services, staff..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />
          <button 
            onClick={() => setIsGlobalSearchOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', gap: '1.5rem' }}>
          {/* Customers Section */}
          {matchingCustomers.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Customers ({matchingCustomers.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {matchingCustomers.map(cust => (
                  <div
                    key={cust.id}
                    onClick={() => {
                      setActiveCustomerProfileId(cust.id);
                      setActiveModule('customers');
                      setIsGlobalSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <User size={16} color="var(--primary-500)" />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{cust.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cust.phone} • {cust.membership} Member</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                      ₹{cust.totalSpend.toLocaleString()} Total Spend
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appointments Section */}
          {matchingAppointments.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Appointments ({matchingAppointments.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {matchingAppointments.map(apt => {
                  const badgeClass = `badge badge-${apt.status.toLowerCase().replace(' ', '-')}`;
                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setActiveModule('appointments');
                        setIsGlobalSearchOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Calendar size={16} color="var(--accent-sky)" />
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{apt.customerName} - {apt.serviceName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.appointmentNumber} • {apt.time} with {apt.staffName}</div>
                        </div>
                      </div>
                      <span className={badgeClass}>
                        {apt.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Invoices Section */}
          {matchingInvoices.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Invoices ({matchingInvoices.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {matchingInvoices.map(inv => (
                  <div
                    key={inv.id}
                    onClick={() => {
                      setActiveInvoicePreview(inv);
                      setIsGlobalSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Receipt size={16} color="var(--accent-gold)" />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{inv.invoiceNumber} - {inv.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.date} • {inv.paymentMethod}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      ₹{inv.grandTotal.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
