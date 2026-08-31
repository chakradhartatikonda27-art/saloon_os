import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory } from '../../types';
import { Plus, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { services, addService, updateService } = useSalon();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Hair');
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(450);
  const [description, setDescription] = useState('');

  const categories: string[] = ['All', 'Hair', 'Beard', 'Facial', 'Spa', 'Color', 'Skin', 'Packages'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addService({
      name,
      category,
      duration: Number(duration),
      price: Number(price),
      description,
      tax: 18,
      gender: 'All',
      assignedStaffIds: [],
      active: true
    });
    setIsModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Services Catalog & Pricing OS</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Standardized salon menu, duration presets, pricing tiers, and tax configurations.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>+ Add New Service</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: isActive ? 'var(--primary-500)' : 'var(--bg-card)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredServices.map(srv => {
          const toggleColor = srv.active ? '#34d399' : 'var(--text-dim)';
          return (
            <div
              key={srv.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-confirmed">{srv.category}</span>
                  <button 
                    onClick={() => updateService({ ...srv, active: !srv.active })}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: toggleColor }}
                  >
                    {srv.active ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{srv.name}</h3>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {srv.description}
                </p>

                {srv.variants && srv.variants.length > 0 && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', backgroundColor: 'rgba(15,23,42,0.6)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Variants:</div>
                    {srv.variants.map(v => (
                      <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem' }}>
                        <span>{v.name}</span>
                        <strong style={{ color: '#34d399' }}>₹{v.price}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} color="var(--primary-500)" />
                  <span>{srv.duration} mins</span>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ₹{srv.price}
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 500, marginLeft: '0.25rem' }}>+ GST 18%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New Service to Catalog</h3>
            </div>
            <form onSubmit={handleCreateService}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Service Name</label>
                  <input className="form-input" required placeholder="e.g. Keratin Smooth Hair Spa" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select className="form-select" value={category} onChange={e => setCategory(e.target.value as any)}>
                      {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Price (INR ₹)</label>
                    <input className="form-input" type="number" required value={price} onChange={e => setPrice(Number(e.target.value))} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Duration (Minutes)</label>
                  <input className="form-input" type="number" required value={duration} onChange={e => setDuration(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea className="form-textarea" rows={2} placeholder="Brief description of service..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
