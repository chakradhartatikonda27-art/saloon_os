import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Percent, Edit3, X, Check } from 'lucide-react';

interface StaffCommissionSummary {
  id: string;
  staff: string;
  rule: string;
  servicesCount: number;
  serviceRevenue: number;
  commission: number;
  effectiveRate: string;
}

interface CommissionLedgerEntry {
  id: string;
  date: string;
  invoice: string;
  staff: string;
  service: string;
  serviceAmount: number;
  commission: number;
}

export const Commissions: React.FC = () => {
  const [selectedStaffRule, setSelectedStaffRule] = useState<StaffCommissionSummary | null>(null);

  const [staffSummaries, setStaffSummaries] = useState<StaffCommissionSummary[]>([
    { id: '1', staff: 'Arun', rule: '10% default, 6 overrides', servicesCount: 102, serviceRevenue: 112150, commission: 12847, effectiveRate: '11%' },
    { id: '2', staff: 'Meena', rule: '10% default, 6 overrides', servicesCount: 101, serviceRevenue: 123900, commission: 14261, effectiveRate: '12%' },
    { id: '3', staff: 'Sanjay', rule: 'Fixed ₹60/service', servicesCount: 99, serviceRevenue: 71650, commission: 8220, effectiveRate: '11%' },
    { id: '4', staff: 'Priya', rule: '10% default, 6 overrides', servicesCount: 106, serviceRevenue: 119800, commission: 14155, effectiveRate: '12%' }
  ]);

  const ledgerEntries: CommissionLedgerEntry[] = [
    { id: 'leg-1', date: '31 Aug', invoice: 'INV-1407', staff: 'Meena', service: 'Hair Spa', serviceAmount: 1200, commission: 144 },
    { id: 'leg-2', date: '31 Aug', invoice: 'INV-1406', staff: 'Sanjay', service: 'Hot Towel Shave', serviceAmount: 400, commission: 60 },
    { id: 'leg-3', date: '31 Aug', invoice: 'INV-1405', staff: 'Sanjay', service: 'Classic Haircut', serviceAmount: 350, commission: 60 },
    { id: 'leg-4', date: '31 Aug', invoice: 'INV-1405', staff: 'Sanjay', service: 'Beard Trim & Shape', serviceAmount: 250, commission: 60 },
    { id: 'leg-5', date: '31 Aug', invoice: 'INV-1404', staff: 'Meena', service: 'Signature Glow Facial', serviceAmount: 1500, commission: 225 },
    { id: 'leg-6', date: '31 Aug', invoice: 'INV-1403', staff: 'Arun', service: 'Premium Haircut & Style', serviceAmount: 650, commission: 65 },
    { id: 'leg-7', date: '30 Aug', invoice: 'INV-1385', staff: 'Arun', service: 'Root Touch-up', serviceAmount: 1100, commission: 110 },
    { id: 'leg-8', date: '30 Aug', invoice: 'INV-1386', staff: 'Arun', service: 'Beard Trim & Shape', serviceAmount: 250, commission: 25 },
    { id: 'leg-9', date: '30 Aug', invoice: 'INV-1388', staff: 'Arun', service: 'Hot Towel Shave', serviceAmount: 400, commission: 40 }
  ];

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Commissions
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Auto-calculated from every paid service line · Aug to date
        </p>
      </div>

      {/* TOP SECTION: PER STAFF TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          PER STAFF
        </div>

        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>RULE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICES</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICE REVENUE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>COMMISSION</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>EFFECTIVE RATE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {staffSummaries.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                  {/* STAFF */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#14121A' }}>
                    {row.staff}
                  </td>

                  {/* RULE */}
                  <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>
                    {row.rule}
                  </td>

                  {/* SERVICES */}
                  <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                    {row.servicesCount}
                  </td>

                  {/* SERVICE REVENUE */}
                  <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                    ₹{row.serviceRevenue.toLocaleString()}
                  </td>

                  {/* COMMISSION */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 900, color: '#14121A' }}>
                    ₹{row.commission.toLocaleString()}
                  </td>

                  {/* EFFECTIVE RATE */}
                  <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>
                    {row.effectiveRate}
                  </td>

                  {/* ACTIONS */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedStaffRule(row)}
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
                      Edit rules
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM SECTION: COMMISSION LEDGER (LATEST 60) TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          COMMISSION LEDGER (LATEST 60)
        </div>

        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>DATE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>INVOICE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICE</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SERVICE AMOUNT</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>COMMISSION</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                  {/* DATE */}
                  <td style={{ padding: '0.85rem 1rem', color: '#75707E' }}>
                    {entry.date}
                  </td>

                  {/* INVOICE */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#14121A' }}>
                    {entry.invoice}
                  </td>

                  {/* STAFF */}
                  <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                    {entry.staff}
                  </td>

                  {/* SERVICE */}
                  <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                    {entry.service}
                  </td>

                  {/* SERVICE AMOUNT */}
                  <td style={{ padding: '0.85rem 1rem', color: '#14121A' }}>
                    ₹{entry.serviceAmount.toLocaleString()}
                  </td>

                  {/* COMMISSION */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 900, color: '#14121A' }}>
                    ₹{entry.commission.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Commission Rules Modal */}
      {selectedStaffRule && (
        <div className="modal-overlay" onClick={() => setSelectedStaffRule(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', backgroundColor: '#FFFFFF', color: '#14121A', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Edit Commission Rules — {selectedStaffRule.staff}</h3>
              <button onClick={() => setSelectedStaffRule(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#75707E' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>DEFAULT COMMISSION RULE</label>
                <input
                  type="text"
                  defaultValue={selectedStaffRule.rule}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>EFFECTIVE COMM RATE (%)</label>
                <input
                  type="text"
                  defaultValue={selectedStaffRule.effectiveRate}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <button
                onClick={() => setSelectedStaffRule(null)}
                style={{
                  backgroundColor: '#C9A24E',
                  color: '#14121A',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 2px 8px rgba(201, 162, 78, 0.3)'
                }}
              >
                Save Commission Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
