import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { FileText, CheckCircle2, Calendar, Printer, X } from 'lucide-react';

interface PayrollRecord {
  id: string;
  staff: string;
  role: string;
  base: number;
  lopDays: number;
  commission: number;
  bonus: number;
  advance: number;
  status: 'Draft' | 'Paid';
}

export const Payroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);

  const [payrollData, setPayrollData] = useState<PayrollRecord[]>([
    { id: 'pay-1', staff: 'Kavya R.', role: 'Manager', base: 35000, lopDays: 2.5, commission: 0, bonus: 0, advance: 0, status: 'Draft' },
    { id: 'pay-2', staff: 'Nithya S.', role: 'Receptionist', base: 18000, lopDays: 0, commission: 0, bonus: 0, advance: 0, status: 'Draft' },
    { id: 'pay-3', staff: 'Arun', role: 'Stylist', base: 25000, lopDays: 0.5, commission: 12847, bonus: 0, advance: 0, status: 'Draft' },
    { id: 'pay-4', staff: 'Meena', role: 'Stylist', base: 24000, lopDays: 1.5, commission: 14261, bonus: 0, advance: 0, status: 'Draft' },
    { id: 'pay-5', staff: 'Sanjay', role: 'Barber', base: 20000, lopDays: 2, commission: 8220, bonus: 0, advance: 0, status: 'Draft' },
    { id: 'pay-6', staff: 'Priya', role: 'Therapist', base: 21000, lopDays: 1, commission: 14155, bonus: 0, advance: 0, status: 'Draft' }
  ]);

  const handleUpdateField = (id: string, field: 'bonus' | 'advance', val: number) => {
    setPayrollData(prev => prev.map(p => p.id === id ? { ...p, [field]: Math.max(0, val) } : p));
  };

  const handleMarkPaid = (id: string) => {
    setPayrollData(prev => prev.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
  };

  const calculateBaseAfterLop = (base: number, lopDays: number) => {
    const dailyRate = base / 26;
    return Math.round(base - (lopDays * dailyRate));
  };

  const calculateNetPay = (record: PayrollRecord) => {
    const baseAfterLop = calculateBaseAfterLop(record.base, record.lopDays);
    return baseAfterLop + record.commission + record.bonus - record.advance;
  };

  // Summary Metrics Calculations
  const totalPayrollSum = payrollData.reduce((sum, p) => sum + calculateNetPay(p), 0);
  const totalCommissionSum = payrollData.reduce((sum, p) => sum + p.commission, 0);
  const totalAdvanceSum = payrollData.reduce((sum, p) => sum + p.advance, 0);
  const paidCount = payrollData.filter(p => p.status === 'Paid').length;

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Payroll
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Base salary – loss of pay + commission + bonus – advances. Marking "Paid" posts a Salary expense automatically.
        </p>
      </div>

      {/* Top Row: Month Picker & 4 Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
        {/* Month Selector */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Month
          </div>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{
              backgroundColor: '#FAF8F5',
              border: '1px solid #E8E3DE',
              borderRadius: '8px',
              padding: '0.45rem 0.65rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#14121A',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="August 2026">August 2026 📅</option>
            <option value="July 2026">July 2026 📅</option>
            <option value="June 2026">June 2026 📅</option>
          </select>
        </div>

        {/* PAYROLL TOTAL */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PAYROLL TOTAL
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#D9584A', marginTop: '0.2rem' }}>
            ₹{totalPayrollSum.toLocaleString()}
          </div>
        </div>

        {/* COMMISSION */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            COMMISSION
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            ₹{totalCommissionSum.toLocaleString()}
          </div>
        </div>

        {/* PAID */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PAID
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>
            {paidCount}/{payrollData.length}
          </div>
        </div>

        {/* ADVANCES */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ADVANCES
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            ₹{totalAdvanceSum.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Payroll Master Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem' }}>
        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ROLE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>BASE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>LOP DAYS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>BASE AFTER LOP</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>COMMISSION</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>BONUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ADVANCE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>NET PAY</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>PAYSLIP</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map(row => {
                const baseAfterLop = calculateBaseAfterLop(row.base, row.lopDays);
                const netPay = calculateNetPay(row);

                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                    {/* STAFF */}
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>
                      {row.staff}
                    </td>

                    {/* ROLE */}
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>
                      {row.role}
                    </td>

                    {/* BASE */}
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                      ₹{row.base.toLocaleString()}
                    </td>

                    {/* LOP DAYS */}
                    <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>
                      {row.lopDays}
                    </td>

                    {/* BASE AFTER LOP */}
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                      ₹{baseAfterLop.toLocaleString()}
                    </td>

                    {/* COMMISSION */}
                    <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                      ₹{row.commission.toLocaleString()}
                    </td>

                    {/* BONUS INPUT */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="number"
                        value={row.bonus}
                        onChange={e => handleUpdateField(row.id, 'bonus', Number(e.target.value))}
                        style={{
                          width: '70px',
                          backgroundColor: '#FAF8F5',
                          border: '1px solid #E8E3DE',
                          borderRadius: '6px',
                          padding: '0.25rem 0.4rem',
                          fontSize: '0.8rem',
                          outline: 'none'
                        }}
                      />
                    </td>

                    {/* ADVANCE INPUT */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="number"
                        value={row.advance}
                        onChange={e => handleUpdateField(row.id, 'advance', Number(e.target.value))}
                        style={{
                          width: '70px',
                          backgroundColor: '#FAF8F5',
                          border: '1px solid #E8E3DE',
                          borderRadius: '6px',
                          padding: '0.25rem 0.4rem',
                          fontSize: '0.8rem',
                          outline: 'none'
                        }}
                      />
                    </td>

                    {/* NET PAY */}
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>
                      ₹{netPay.toLocaleString()}
                    </td>

                    {/* STATUS */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {row.status === 'Paid' ? (
                        <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                          Paid
                        </span>
                      ) : (
                        <span style={{ backgroundColor: '#EFEBF4', color: '#75707E', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                          Draft
                        </span>
                      )}
                    </td>

                    {/* PAYSLIP ACTIONS */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedPayslip(row)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E8E3DE',
                            borderRadius: '8px',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.775rem',
                            fontWeight: 800,
                            color: '#14121A',
                            cursor: 'pointer'
                          }}
                        >
                          View
                        </button>

                        {row.status !== 'Paid' && (
                          <button
                            onClick={() => handleMarkPaid(row.id)}
                            style={{
                              backgroundColor: '#0E9C86',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.775rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            Mark paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Modal */}
      {selectedPayslip && (
        <div className="modal-overlay" onClick={() => setSelectedPayslip(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', backgroundColor: '#FFFFFF', color: '#14121A', borderRadius: '18px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E8E3DE', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Salary Payslip — {selectedMonth}</h3>
                <div style={{ fontSize: '0.8rem', color: '#75707E' }}>{selectedPayslip.staff} ({selectedPayslip.role})</div>
              </div>
              <button onClick={() => setSelectedPayslip(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#75707E' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem 0', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>Base Salary:</span>
                <span style={{ fontWeight: 700 }}>₹{selectedPayslip.base.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>LOP Days ({selectedPayslip.lopDays}):</span>
                <span style={{ color: '#D9584A', fontWeight: 700 }}>- ₹{(selectedPayslip.base - calculateBaseAfterLop(selectedPayslip.base, selectedPayslip.lopDays)).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>Base After LOP:</span>
                <span style={{ fontWeight: 700 }}>₹{calculateBaseAfterLop(selectedPayslip.base, selectedPayslip.lopDays).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>Commission Earned:</span>
                <span style={{ color: '#0E9C86', fontWeight: 700 }}>+ ₹{selectedPayslip.commission.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>Bonus:</span>
                <span style={{ color: '#0E9C86', fontWeight: 700 }}>+ ₹{selectedPayslip.bonus.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#75707E' }}>Advance Deduction:</span>
                <span style={{ color: '#D9584A', fontWeight: 700 }}>- ₹{selectedPayslip.advance.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #14121A', paddingTop: '0.75rem', marginTop: '0.5rem', fontSize: '1.15rem', fontWeight: 900 }}>
                <span>Net Payable:</span>
                <span>₹{calculateNetPay(selectedPayslip).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #E8E3DE', paddingTop: '1rem' }}>
              <button
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E3DE',
                  borderRadius: '10px',
                  padding: '0.65rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#14121A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <Printer size={16} /> Print Payslip
              </button>

              {selectedPayslip.status !== 'Paid' && (
                <button
                  onClick={() => { handleMarkPaid(selectedPayslip.id); setSelectedPayslip(null); }}
                  style={{
                    flex: 1,
                    backgroundColor: '#0E9C86',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.65rem',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Mark Paid & Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
