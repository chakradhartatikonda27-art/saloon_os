import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ExpenseCategory, PaymentMethod } from '../../types';
import { Wallet, Plus, TrendingDown, DollarSign, PieChart, Banknote, QrCode, CreditCard } from 'lucide-react';

export const Expenses: React.FC = () => {
  const { expenses, addExpense, invoices } = useSalon();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Rent');
  const [amount, setAmount] = useState(5000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [description, setDescription] = useState('');

  const totalRevenue = invoices.reduce((sum, i) => sum + i.grandTotal, 0) + 24850;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netResult = totalRevenue - totalExpenses;

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense({
      title,
      category,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      description,
      addedBy: 'Ananya Sharma'
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Expense Management OS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Salon operating outflows, rent, utility bills, inventory purchases, and net operating profit tracking.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ backgroundColor: '#f43f5e', borderColor: '#e11d48' }}>
          <Plus size={18} />
          <span>+ Add Salon Expense</span>
        </button>
      </div>

      {/* Net Operating Result Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Gross Operating Revenue
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Inflows from POS + Bookings</span>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Outflow Expenses
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f472b6' }}>
            ₹{totalExpenses.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{expenses.length} Expense Entries</span>
        </div>

        <div className="stat-card" style={{ gridColumn: 'span 2' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Net Operating Profit Result
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: netResult >= 0 ? '#34d399' : '#ef4444' }}>
            ₹{netResult.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            Calculated as Gross Revenue (₹{totalRevenue.toLocaleString()}) − Total Expenses (₹{totalExpenses.toLocaleString()})
          </span>
        </div>
      </div>

      {/* Expenses History Table */}
      <div className="table-responsive">
        <table className="salon-table">
          <thead>
            <tr>
              <th>Expense Item</th>
              <th>Category</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{exp.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.description}</div>
                </td>
                <td>
                  <span className="badge badge-pending">{exp.category}</span>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.date}</td>
                <td style={{ fontSize: '0.8rem' }}>{exp.paymentMethod}</td>
                <td style={{ fontWeight: 800, color: '#f472b6' }}>₹{exp.amount.toLocaleString()}</td>
                <td style={{ fontSize: '0.775rem', color: 'var(--text-dim)' }}>{exp.addedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Log New Expense</h3>
            </div>
            <form onSubmit={handleCreateExpense}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Expense Title / Vendor</label>
                  <input className="form-input" required placeholder="e.g. BESCOM Power Bill" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select className="form-select" value={category} onChange={e => setCategory(e.target.value as any)}>
                      <option value="Rent">Rent</option>
                      <option value="Salary">Salary</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Amount (INR ₹)</label>
                    <input className="form-input" type="number" required value={amount} onChange={e => setAmount(Number(e.target.value))} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Payment Method</label>
                  <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as any)}>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Description / Notes</label>
                  <input className="form-input" placeholder="Additional expense notes..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ backgroundColor: '#f43f5e' }}>Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
