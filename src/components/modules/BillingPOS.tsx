import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { PaymentMethod, InvoiceItem, Invoice } from '../../types';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  QrCode, 
  Banknote, 
  CreditCard, 
  User, 
  Scissors, 
  Package, 
  Sparkles,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InvoiceModal } from './InvoiceModal';

export const BillingPOS: React.FC = () => {
  const { 
    customers, 
    services, 
    staff, 
    inventory, 
    createInvoice, 
    activeInvoicePreview, 
    setActiveInvoicePreview 
  } = useSalon();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([
    {
      id: 'cart-1',
      type: 'Service',
      itemId: services[0]?.id || 'srv-1',
      name: services[0]?.name || 'Classic Haircut',
      quantity: 1,
      unitPrice: services[0]?.price || 450,
      staffId: staff[0]?.id || 'staff-1',
      staffName: staff[0]?.name || 'Arun Kumar',
      total: services[0]?.price || 450
    }
  ]);

  const [discountAmount, setDiscountAmount] = useState<number>(50);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const handleAddServiceItem = (serviceId: string) => {
    const srv = services.find(s => s.id === serviceId);
    if (!srv) return;
    const newItem: InvoiceItem = {
      id: `cart-${Date.now()}`,
      type: 'Service',
      itemId: srv.id,
      name: srv.name,
      quantity: 1,
      unitPrice: srv.price,
      staffId: staff[0]?.id,
      staffName: staff[0]?.name,
      total: srv.price
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleAddProductItem = (productId: string) => {
    const prod = inventory.find(p => p.id === productId);
    if (!prod) return;
    const newItem: InvoiceItem = {
      id: `cart-${Date.now()}`,
      type: 'Product',
      itemId: prod.id,
      name: prod.name,
      quantity: 1,
      unitPrice: prod.sellingPrice,
      total: prod.sellingPrice
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateItemStaff = (itemId: string, staffId: string) => {
    const selectedStf = staff.find(s => s.id === staffId);
    setCartItems(prev => prev.map(item => item.id === itemId ? {
      ...item,
      staffId: selectedStf?.id,
      staffName: selectedStf?.name
    } : item));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + tax;

  const handleCheckout = () => {
    if (!selectedCustomer || cartItems.length === 0) return;

    const newInvoice = createInvoice({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      tax,
      grandTotal,
      paymentMethod,
      status: 'Paid',
      notes: `POS Cashier Transaction via ${paymentMethod}`
    });

    // Trigger celebration confetti
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // fallback
    }

    setActiveInvoicePreview(newInvoice);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Billing & POS Reception Terminal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Fast cashier checkout, GST tax calculations, discounts, payment methods, and instant digital receipt.
          </p>
        </div>
      </div>

      {/* Main Billing Grid: Items Selection & Checkout Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Cart Items & Add Items Picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Customer Selection Card */}
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={20} color="var(--primary-500)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Select Billing Customer</div>
                <select
                  value={selectedCustomerId}
                  onChange={e => setSelectedCustomerId(e.target.value)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>
                      {c.name} ({c.phone}) - {c.membership} Member
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Items in Cart Table */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Billable Items & Services</h3>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                Your cart is empty. Select services or retail products below to add.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(15,23,42,0.6)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                        <span>Type: {item.type}</span>
                        {item.type === 'Service' && (
                          <select
                            value={item.staffId || ''}
                            onChange={e => handleUpdateItemStaff(item.id, e.target.value)}
                            style={{
                              backgroundColor: 'var(--bg-input)',
                              border: '1px solid var(--border-strong)',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--text-main)',
                              fontSize: '0.725rem',
                              padding: '0.15rem 0.35rem',
                              outline: 'none'
                            }}
                          >
                            <option value="">Attributed Staff</option>
                            {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>₹{item.total}</span>
                      <button onClick={() => handleRemoveItem(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Pickers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Quick Add Services */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Scissors size={14} color="var(--primary-500)" />
                <span>+ Add Service to Cart</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '140px', overflowY: 'auto' }}>
                {services.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => handleAddServiceItem(srv.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.4rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.775rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{srv.name}</span>
                    <strong style={{ color: '#34d399' }}>+ ₹{srv.price}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Add Retail Products */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Package size={14} color="var(--accent-sky)" />
                <span>+ Add Product Sale</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '140px', overflowY: 'auto' }}>
                {inventory.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleAddProductItem(prod.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.4rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.775rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{prod.name}</span>
                    <strong style={{ color: '#34d399' }}>+ ₹{prod.sellingPrice}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary & Payment Methods */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              Payment & Checkout Summary
            </h3>

            {/* Subtotal, Discount & Tax */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{subtotal.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Discount (₹):</span>
                <input 
                  type="number" 
                  value={discountAmount} 
                  onChange={e => setDiscountAmount(Number(e.target.value))}
                  style={{
                    width: '90px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#34d399',
                    fontWeight: 700,
                    textAlign: 'right',
                    padding: '0.25rem 0.5rem',
                    outline: 'none'
                  }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <span>GST (18%):</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{tax.toLocaleString()}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                borderTop: '1px solid var(--border-strong)',
                paddingTop: '0.75rem'
              }}>
                <span>Grand Total:</span>
                <span style={{ color: 'var(--primary-500)' }}>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <label className="input-label">Select Payment Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { mode: 'UPI' as PaymentMethod, label: 'UPI / QR', icon: QrCode, color: '#34d399' },
                  { mode: 'Cash' as PaymentMethod, label: 'Cash', icon: Banknote, color: '#fbbf24' },
                  { mode: 'Card' as PaymentMethod, label: 'Card POS', icon: CreditCard, color: '#38bdf8' }
                ].map(m => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.mode;
                  return (
                    <button
                      key={m.mode}
                      onClick={() => setPaymentMethod(m.mode)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? `${m.color}25` : 'rgba(255,255,255,0.03)',
                        border: '1px solid',
                        borderColor: isSelected ? m.color : 'var(--border-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={18} color={m.color} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 800 }}
          >
            <Sparkles size={20} /> Complete Payment & Print Receipt
          </button>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {activeInvoicePreview && (
        <InvoiceModal 
          invoice={activeInvoicePreview} 
          onClose={() => setActiveInvoicePreview(null)} 
        />
      )}
    </div>
  );
};
