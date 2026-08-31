import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { Invoice } from '../../types';
import { X, Printer, CheckCircle2 } from 'lucide-react';

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoiceModal: React.FC<Props> = ({ invoice, onClose }) => {
  const { settings } = useSalon();

  const handlePrint = () => {
    window.print();
  };

  const invNumberLabel = `#${invoice.invoiceNumber}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px', backgroundColor: '#ffffff', color: '#0f172a' }}>
        {/* Header Controls */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 700, fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} /> Invoice Created & Paid Successfully
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm" style={{ color: '#0f172a', borderColor: '#cbd5e1' }}>
              <Printer size={14} /> Print Receipt
            </button>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable GST Invoice Body */}
        <div id="printable-invoice" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
          {/* Header Salon Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{settings.salonName}</h2>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>{settings.address}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>Phone: {settings.phone} • Email: {settings.email}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>GSTIN: {settings.gstin}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4f46e5' }}>TAX INVOICE</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>{invNumberLabel}</div>
              <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Date: {invoice.date}</div>
            </div>
          </div>

          {/* Customer Info */}
          <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <span style={{ color: '#64748b' }}>Billed To: </span>
            <strong style={{ color: '#0f172a' }}>{invoice.customerName}</strong> ({invoice.customerPhone})
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
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
              <div style={{ fontSize: '0.775rem', color: '#4f46e5', fontWeight: 700, textAlign: 'right', marginTop: '0.2rem' }}>
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
