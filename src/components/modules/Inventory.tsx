import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Package, Plus, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Inventory: React.FC = () => {
  const { inventory, updateStock } = useSalon();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [restockQty, setRestockQty] = useState(10);

  const lowStockItems = inventory.filter(p => p.stock <= p.minStockThreshold);

  const handleRestock = () => {
    if (!selectedProductId) return;
    updateStock(selectedProductId, restockQty);
    setSelectedProductId(null);
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Salon Product Inventory & Stock OS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Track retail products, professional salon supplies, SKU units, and low-stock replenishment alerts.
          </p>
        </div>
      </div>

      {/* Low Stock Alert Header Banner */}
      {lowStockItems.length > 0 && (
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          color: '#fbbf24'
        }}>
          <AlertTriangle size={24} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Low Stock Alert ({lowStockItems.length} Products Below Threshold)
            </div>
            <div style={{ fontSize: '0.775rem', color: '#fef08a' }}>
              {lowStockItems.map(i => `${i.name} (${i.stock} ${i.unit} left)`).join(' • ')}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="table-responsive">
        <table className="salon-table">
          <thead>
            <tr>
              <th>Product & SKU</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Min Threshold</th>
              <th>Supplier</th>
              <th style={{ textAlign: 'right' }}>Restock Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(prod => {
              const isLow = prod.stock <= prod.minStockThreshold;
              return (
                <tr key={prod.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{prod.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {prod.sku}</div>
                  </td>
                  <td>
                    <span className="badge badge-confirmed">{prod.category}</span>
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 800,
                      color: isLow ? '#ef4444' : '#34d399',
                      fontSize: '0.95rem'
                    }}>
                      {prod.stock} {prod.unit}
                    </span>
                  </td>
                  <td>₹{prod.purchasePrice}</td>
                  <td style={{ fontWeight: 700 }}>₹{prod.sellingPrice}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{prod.minStockThreshold} {prod.unit}</td>
                  <td style={{ fontSize: '0.775rem', color: 'var(--text-dim)' }}>{prod.supplier}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => { setSelectedProductId(prod.id); setRestockQty(10); }}
                      className="btn btn-sm btn-secondary"
                    >
                      + Restock Stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Restock Modal */}
      {selectedProductId && (
        <div className="modal-overlay" onClick={() => setSelectedProductId(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Restock Product Inventory</h3>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label className="input-label">Quantity to Add to Stock</label>
                <input 
                  className="form-input" 
                  type="number" 
                  value={restockQty} 
                  onChange={e => setRestockQty(Number(e.target.value))} 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedProductId(null)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleRestock}>Add Units to Stock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
