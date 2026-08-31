import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Search, Plus } from 'lucide-react';

interface SampleInvoiceRow {
  id: string;
  invoiceNo: string;
  date: string;
  customer: string;
  items: string;
  staff: string;
  total: number;
  paidAmount: number;
  method: string;
  status: 'Paid' | 'Partially Paid' | 'Draft' | 'Cancelled';
}

export const Invoices: React.FC = () => {
  const { invoices, setActiveInvoicePreview, setActiveModule } = useSalon();
  const [filterTab, setFilterTab] = useState<'All' | 'Paid' | 'Partially Paid' | 'Draft' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sampleRows: SampleInvoiceRow[] = [
    { id: 'inv-1', invoiceNo: 'INV-1407', date: '31 Aug 3:00 PM', customer: 'Imran M.', items: 'Hair Spa', staff: 'Meena', total: 1416, paidAmount: 1416, method: 'UPI', status: 'Paid' },
    { id: 'inv-2', invoiceNo: 'INV-1406', date: '31 Aug 1:30 PM', customer: 'Ravi B.', items: 'Hot Towel Shave', staff: 'Sanjay', total: 472, paidAmount: 472, method: 'Card', status: 'Paid' },
    { id: 'inv-3', invoiceNo: 'INV-1403', date: '31 Aug 1:05 PM', customer: 'Divya M.', items: 'Premium Haircut & Style, Beard Trim & Shape', staff: 'Arun', total: 1062, paidAmount: 1062, method: 'Card', status: 'Paid' },
    { id: 'inv-4', invoiceNo: 'INV-1404', date: '31 Aug 12:45 PM', customer: 'Anjali P.', items: 'Signature Glow Facial', staff: 'Meena', total: 1770, paidAmount: 1770, method: 'Cash', status: 'Paid' },
    { id: 'inv-5', invoiceNo: 'INV-1402', date: '31 Aug 11:30 AM', customer: 'Kiran R.', items: 'Classic Haircut', staff: 'Arun', total: 413, paidAmount: 413, method: 'UPI', status: 'Paid' },
    { id: 'inv-6', invoiceNo: 'INV-1405', date: '31 Aug 11:20 AM', customer: 'Sneha K.', items: 'Classic Haircut, Beard Trim & Shape', staff: 'Sanjay', total: 708, paidAmount: 708, method: 'Cash', status: 'Paid' },
    { id: 'inv-7', invoiceNo: 'INV-1385', date: '30 Aug 4:15 PM', customer: 'Vikram T.', items: 'Root Touch-up', staff: 'Arun', total: 1298, paidAmount: 1298, method: 'UPI', status: 'Paid' },
    { id: 'inv-8', invoiceNo: 'INV-1386', date: '30 Aug 3:05 PM', customer: 'Aditya S.', items: 'Root Touch-up, Beard Trim & Shape', staff: 'Arun', total: 1593, paidAmount: 1593, method: 'UPI', status: 'Paid' },
    { id: 'inv-9', invoiceNo: 'INV-1388', date: '30 Aug 3:00 PM', customer: 'Farhan A.', items: 'Hot Towel Shave', staff: 'Arun', total: 472, paidAmount: 472, method: 'UPI', status: 'Paid' },
  ];

  // Merge real invoices from context with sample display rows
  const allRows: SampleInvoiceRow[] = [
    ...invoices.map(inv => ({
      id: inv.id,
      invoiceNo: inv.invoiceNumber,
      date: inv.date,
      customer: inv.customerName,
      items: inv.items.map(i => i.name).join(', '),
      staff: inv.items[0]?.staffName || 'Staff',
      total: inv.grandTotal,
      paidAmount: inv.status === 'Paid' ? inv.grandTotal : inv.status === 'Partially Paid' ? Math.round(inv.grandTotal * 0.5) : 0,
      method: inv.paymentMethod,
      status: inv.status as any
    })),
    ...sampleRows
  ];

  const filteredRows = allRows.filter(row => {
    const matchesFilter = filterTab === 'All' || row.status === filterTab;
    const matchesSearch = searchQuery === '' ||
      row.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openInvoicePreview = (row: SampleInvoiceRow) => {
    const foundReal = invoices.find(i => i.invoiceNumber === row.invoiceNo || i.id === row.id);
    if (foundReal) {
      setActiveInvoicePreview(foundReal);
    } else {
      setActiveInvoicePreview({
        id: row.id,
        tenantId: 'tenant-1',
        invoiceNumber: row.invoiceNo,
        date: row.date,
        customerId: 'cust-1',
        customerName: row.customer,
        customerPhone: '+91 98765 43210',
        items: [
          {
            id: 'item-1',
            type: 'Service',
            itemId: 'srv-1',
            name: row.items,
            quantity: 1,
            unitPrice: row.total,
            staffName: row.staff,
            total: row.total
          }
        ],
        subtotal: Math.round(row.total / 1.18),
        discount: 0,
        tax: row.total - Math.round(row.total / 1.18),
        grandTotal: row.total,
        paymentMethod: row.method as any,
        status: row.status as any,
        notes: 'Tax Invoice'
      });
    }
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Invoices
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Digital invoices with GSTIN · print, share, download
        </p>
      </div>

      {/* Top 5 Metrics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {/* PAID */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PAID
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
            368
          </div>
        </div>

        {/* PARTIALLY PAID */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PARTIALLY PAID
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>
            25
          </div>
        </div>

        {/* DRAFT */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            DRAFT
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            15
          </div>
        </div>

        {/* CANCELLED */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CANCELLED
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            0
          </div>
        </div>

        {/* RECEIVABLES */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            RECEIVABLES
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>
            ₹37,364
          </div>
        </div>
      </div>

      {/* Search, Filter Pills & Action Button Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.45rem 0.85rem', borderRadius: '10px', border: '1px solid #E8E3DE', width: '260px' }}>
            <Search size={15} color="#75707E" />
            <input
              type="text"
              placeholder="Search invoice # or customer"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#1E1A25', outline: 'none', fontSize: '0.825rem', width: '100%' }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['All', 'Paid', 'Partially Paid', 'Draft', 'Cancelled'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                style={{
                  backgroundColor: filterTab === tab ? '#14121A' : '#FFFFFF',
                  color: filterTab === tab ? '#FFFFFF' : '#14121A',
                  border: filterTab === tab ? '1px solid #14121A' : '1px solid #E8E3DE',
                  borderRadius: '99px',
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: + New invoice */}
        <button
          onClick={() => setActiveModule('billing')}
          style={{
            backgroundColor: '#C9A24E',
            color: '#14121A',
            border: 'none',
            borderRadius: '10px',
            padding: '0.55rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 2px 6px rgba(201, 162, 78, 0.25)'
          }}
        >
          <span>+ New invoice</span>
        </button>
      </div>

      {/* Invoices Master Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>INVOICE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>DATE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>CUSTOMER</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ITEMS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>TOTAL</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>PAID</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>METHOD</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                  {/* INVOICE */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.875rem', color: '#14121A' }}>
                    {row.invoiceNo}
                  </td>

                  {/* DATE */}
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', color: '#75707E' }}>
                    {row.date}
                  </td>

                  {/* CUSTOMER */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontSize: '0.875rem', color: '#1E1A25' }}>
                    {row.customer}
                  </td>

                  {/* ITEMS */}
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', color: '#1E1A25' }}>
                    {row.items}
                  </td>

                  {/* STAFF */}
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', color: '#75707E' }}>
                    {row.staff}
                  </td>

                  {/* TOTAL */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.875rem', color: '#14121A' }}>
                    ₹{row.total.toLocaleString()}
                  </td>

                  {/* PAID */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.875rem', color: '#14121A' }}>
                    ₹{row.paidAmount.toLocaleString()}
                  </td>

                  {/* METHOD */}
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.825rem', color: '#75707E' }}>
                    {row.method}
                  </td>

                  {/* STATUS BADGE */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {row.status === 'Paid' && (
                      <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Paid
                      </span>
                    )}
                    {row.status === 'Partially Paid' && (
                      <span style={{ backgroundColor: '#FBEFD8', color: '#C57A0F', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Partially Paid
                      </span>
                    )}
                    {row.status === 'Draft' && (
                      <span style={{ backgroundColor: '#EFEBF4', color: '#2A2237', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Draft
                      </span>
                    )}
                    {row.status === 'Cancelled' && (
                      <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Cancelled
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => openInvoicePreview(row)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8E3DE',
                        borderRadius: '8px',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        color: '#14121A',
                        cursor: 'pointer'
                      }}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
