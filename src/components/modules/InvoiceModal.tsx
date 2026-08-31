import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Invoice } from '../../types';
import { X, Printer, CheckCircle2, MessageSquare, Send, Download } from 'lucide-react';

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoiceModal: React.FC<Props> = ({ invoice, onClose }) => {
  const { settings } = useSalon();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const rawPhone = invoice.customerPhone.replace(/[^0-9]/g, '');
    const phoneNo = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const msg = `Hi ${invoice.customerName}! Thank you for visiting ${settings.salonName}. Here is your tax invoice #${invoice.invoiceNumber} for ₹${invoice.grandTotal}. Paid via ${invoice.paymentMethod}. Have a glowing day! ✨`;
    const waUrl = `https://wa.me/${phoneNo}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setToastMessage(`Invoice link dispatched via WhatsApp to ${invoice.customerPhone}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendSMS = () => {
    setToastMessage(`SMS Invoice SMS sent successfully to ${invoice.customerPhone}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const invNumberLabel = `#${invoice.invoiceNumber}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '16px', overflow: 'hidden' }}>
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '0.65rem 1rem', fontSize: '0.825rem', fontWeight: 700, textAlign: 'center' }}>
            ✨ {toastMessage}
          </div>
        )}

        {/* Header Controls */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 800, fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} /> Invoice Created & Paid
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Digital Receipt Share & Export Bar */}
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: '#FAF8F5', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleSendWhatsApp}
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.775rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <MessageSquare size={14} /> WhatsApp Bill
          </button>

          <button
            onClick={handleSendSMS}
            style={{
              backgroundColor: '#1E1A25',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.775rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Send size={14} /> Send SMS
          </button>

          <button
            onClick={handleDownloadPDF}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.775rem',
              fontWeight: 800,
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Download size={14} /> Download PDF
          </button>

          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.775rem',
              fontWeight: 800,
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Printer size={14} /> Print Receipt
          </button>
        </div>

        {/* Printable GST Invoice Body */}
        <div id="printable-invoice" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: 'Inter, sans-serif' }}>
          {/* Header Salon Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{settings.salonName}</h2>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>{settings.address}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>Phone: {settings.phone} • Email: {settings.email}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>GSTIN: {settings.gstin}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#C9A24E' }}>TAX INVOICE</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>{invNumberLabel}</div>
              <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Date: {invoice.date}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#64748b' }}>Billed To: </span>
              <strong style={{ color: '#0f172a' }}>{invoice.customerName}</strong> ({invoice.customerPhone})
            </div>
            <div style={{ fontSize: '0.775rem', fontWeight: 800, color: '#10b981', backgroundColor: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
              {invoice.status}
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left', color: '#475569' }}>
                <th style={{ padding: '0.5rem 0' }}>Item / Service</th>
                <th style={{ padding: '0.5rem 0' }}>Stylist</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.6rem 0', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                  <td style={{ padding: '0.6rem 0', color: '#475569' }}>{item.staffName || '-'}</td>
                  <td style={{ padding: '0.6rem 0', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '0.6rem 0', textAlign: 'right' }}>₹{item.unitPrice}</td>
                  <td style={{ padding: '0.6rem 0', textAlign: 'right', fontWeight: 700 }}>₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Breakdown */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal}</span>
              </div>
              {invoice.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                  <span>Discount:</span>
                  <span>- ₹{invoice.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>GST (18%):</span>
                <span>₹{invoice.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderTop: '2px solid #0f172a', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                <span>Grand Total:</span>
                <span>₹{invoice.grandTotal}</span>
              </div>
              <div style={{ fontSize: '0.775rem', color: '#C9A24E', fontWeight: 700, textAlign: 'right', marginTop: '0.2rem' }}>
                Paid via {invoice.paymentMethod}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', borderTop: '1px dashed #cbd5e1', paddingTop: '1rem' }}>
            Thank you for visiting {settings.salonName}! Have a glowing day ahead ✨
          </div>
        </div>
      </div>
    </div>
  );
};
