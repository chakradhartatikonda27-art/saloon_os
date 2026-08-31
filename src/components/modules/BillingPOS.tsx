import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { PaymentMethod, InvoiceItem, Invoice } from '../../types';
import { 
  Plus, 
  Trash2, 
  X,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BillingPOS: React.FC = () => {
  const { 
    customers, 
    services, 
    staff, 
    inventory, 
    createInvoice, 
    setActiveInvoicePreview 
  } = useSalon();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [filterText, setFilterText] = useState('');
  const [discountType, setDiscountType] = useState<'%' | '₹'>('%');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [partialAmount, setPartialAmount] = useState<string>('');

  const [cartItems, setCartItems] = useState<InvoiceItem[]>([
    {
      id: 'cart-1',
      type: 'Service',
      itemId: services[0]?.id || 'srv-1',
      name: 'Classic Haircut',
      quantity: 1,
      unitPrice: 350,
      staffId: staff[0]?.id || 'staff-1',
      staffName: staff[0]?.name || 'Arun',
      total: 350
    }
  ]);

  const quickItems = [
    { id: 'srv-1', name: 'Classic Haircut', duration: '30 min', price: 350, type: 'Service' },
    { id: 'srv-2', name: 'Premium Haircut & Style', duration: '45 min', price: 650, type: 'Service' },
    { id: 'srv-3', name: 'Hair Spa', duration: '60 min', price: 1200, type: 'Service' },
    { id: 'srv-4', name: 'Beard Trim & Shape', duration: '20 min', price: 250, type: 'Service' },
    { id: 'srv-5', name: 'Hot Towel Shave', duration: '30 min', price: 400, type: 'Service' },
    { id: 'srv-6', name: 'Signature Glow Facial', duration: '45 min', price: 1500, type: 'Service' },
    { id: 'srv-7', name: 'Head & Shoulder Massage', duration: '30 min', price: 700, type: 'Service' },
    { id: 'srv-8', name: 'De-Tan Treatment', duration: '40 min', price: 900, type: 'Service' },
    { id: 'srv-9', name: 'Global Hair Color', duration: '90 min', price: 2500, type: 'Service' },
    { id: 'srv-10', name: 'Root Touch-up', duration: '45 min', price: 1100, type: 'Service' },
    { id: 'srv-11', name: 'Manicure', duration: '40 min', price: 600, type: 'Service' },
    { id: 'prod-1', name: 'Argan Oil Serum 100ml', stock: '14 left', price: 750, type: 'Product' },
    { id: 'prod-2', name: 'Glow Facial Kit', stock: '6 left', price: 1200, type: 'Product' },
    { id: 'prod-3', name: 'Beard Oil 50ml', stock: '22 left', price: 399, type: 'Product' },
  ];

  const filteredQuickItems = quickItems.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleAddItem = (item: typeof quickItems[0]) => {
    const existing = cartItems.find(i => i.name === item.name);
    if (existing) {
      setCartItems(prev => prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.unitPrice } : i));
    } else {
      const newItem: InvoiceItem = {
        id: `cart-${Date.now()}`,
        type: item.type as any,
        itemId: item.id,
        name: item.name,
        quantity: 1,
        unitPrice: item.price,
        staffId: staff[0]?.id || 'staff-1',
        staffName: staff[0]?.name || 'Arun',
        total: item.price
      };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateStaff = (id: string, staffName: string) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, staffName } : item));
  };

  // Financial Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discountType === '%' 
    ? Math.round((subtotal * discountValue) / 100)
    : discountValue;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + tax;

  const handleCheckout = (isPartial = false, isDraft = false) => {
    const selectedCust = customers.find(c => c.id === selectedCustomerId) || customers[0];

    const newInvoice = createInvoice({
      customerId: selectedCust.id,
      customerName: selectedCust.name,
      customerPhone: selectedCust.phone,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      tax,
      grandTotal,
      paymentMethod,
      status: isDraft ? 'Draft' : isPartial ? 'Partially Paid' : 'Paid',
      notes: isPartial ? `Partial payment ₹${partialAmount} via ${paymentMethod}` : `POS Cashier Transaction via ${paymentMethod}`
    });

    if (!isDraft) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // fallback
      }
    }

    setActiveInvoicePreview(newInvoice);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Billing / POS
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Customer → services → staff → discount → tax → payment → invoice. Built for the front desk: one screen, no page changes.
        </p>
      </div>

      {/* Main Billing POS Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* LEFT COLUMN: 1. CUSTOMER & 2. SERVICES & PRODUCTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* SECTION 1: CUSTOMER */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1 · CUSTOMER
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <select
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#1E1A25',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select customer...</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone}) - {c.membership} Member
                  </option>
                ))}
              </select>

              <button
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#14121A',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                + New
              </button>
            </div>
          </div>

          {/* SECTION 2: SERVICES & PRODUCTS */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                2 · SERVICES & PRODUCTS
              </div>

              <input
                type="text"
                placeholder="filter.."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                style={{
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #E8E3DE',
                  borderRadius: '8px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  outline: 'none',
                  width: '140px'
                }}
              />
            </div>

            {/* Quick Add Tiles Grid (3 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
              {filteredQuickItems.map((item) => {
                const isSelected = cartItems.some(i => i.name === item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    style={{
                      backgroundColor: '#FAF8F5',
                      border: isSelected ? '1px solid #C9A24E' : '1px solid #E8E3DE',
                      borderRadius: '12px',
                      padding: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      boxShadow: isSelected ? '0 0 0 1px #C9A24E' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#14121A' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#75707E' }}>
                      {item.duration || item.stock} · ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 · BILL */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            3 · BILL
          </div>

          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '120px' }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#75707E', fontSize: '0.85rem' }}>
                No items added to bill yet. Click services or products on the left to add.
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px border-subtle #E8E3DE'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#14121A' }}>{item.name}</span>
                    <select
                      value={item.staffName || 'Arun'}
                      onChange={e => handleUpdateStaff(item.id, e.target.value)}
                      style={{
                        backgroundColor: '#FAF8F5',
                        border: '1px solid #E8E3DE',
                        borderRadius: '6px',
                        padding: '0.15rem 0.4rem',
                        fontSize: '0.75rem',
                        color: '#75707E',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Arun">Arun</option>
                      <option value="Meena">Meena</option>
                      <option value="Sanjay">Sanjay</option>
                      <option value="Priya">Priya</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#14121A' }}>₹{item.total.toLocaleString()}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      style={{ background: 'transparent', border: 'none', color: '#D9584A', cursor: 'pointer', padding: '0.1rem' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal, Discount & Tax Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid #E8E3DE', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, color: '#14121A' }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontWeight: 600, color: '#14121A' }}>Discount</span>
                <select
                  value={discountType}
                  onChange={e => setDiscountType(e.target.value as any)}
                  style={{
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '6px',
                    padding: '0.15rem 0.35rem',
                    fontSize: '0.75rem',
                    outline: 'none'
                  }}
                >
                  <option value="%">%</option>
                  <option value="₹">₹</option>
                </select>
                <input
                  type="number"
                  value={discountValue}
                  onChange={e => setDiscountValue(Number(e.target.value))}
                  style={{
                    width: '45px',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E8E3DE',
                    borderRadius: '6px',
                    padding: '0.15rem 0.35rem',
                    fontSize: '0.775rem',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
              </div>
              <span style={{ color: '#D9584A', fontWeight: 700 }}>- ₹{discountAmount.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#75707E', fontWeight: 600 }}>
              <span>GST 18%</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 900, color: '#14121A', borderTop: '1px solid #E8E3DE', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <span>Grand total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selector Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#75707E' }}>Payment</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', backgroundColor: '#FAF8F5', padding: '0.25rem', borderRadius: '10px', border: '1px solid #E8E3DE' }}>
              {(['Cash', 'UPI', 'Card', 'Other'] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method as any)}
                  style={{
                    backgroundColor: paymentMethod === method ? '#14121A' : 'transparent',
                    color: paymentMethod === method ? '#FFFFFF' : '#75707E',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.4rem 0',
                    fontSize: '0.775rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Partial Amount Input */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#75707E', fontWeight: 600 }}>Partial amount received</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E8E3DE', borderRadius: '8px', padding: '0.35rem 0.65rem', backgroundColor: '#FAF8F5', width: '100px' }}>
              <span style={{ fontSize: '0.8rem', color: '#75707E', marginRight: '0.25rem' }}>₹</span>
              <input
                type="number"
                placeholder=""
                value={partialAmount}
                onChange={e => setPartialAmount(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.8rem', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => handleCheckout(false, false)}
              style={{
                backgroundColor: '#C9A24E',
                color: '#14121A',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 900,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(201, 162, 78, 0.3)'
              }}
            >
              Collect ₹{grandTotal.toLocaleString()} · {paymentMethod}
            </button>

            <button
              onClick={() => handleCheckout(true, false)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#14121A',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Partial payment
            </button>

            <button
              onClick={() => handleCheckout(false, true)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#14121A',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Save as draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
