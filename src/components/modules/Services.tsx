import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory, Service } from '../../types';
import { Plus, Clock, Search, Sparkles, SlidersHorizontal, Edit3, Copy, TrendingUp, X } from 'lucide-react';

export const Services: React.FC = () => {
  const { services, addService, updateService } = useSalon();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<Record<string, string>>({});

  // Form State for Add Service Modal
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Hair');
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(450);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState<'All' | 'Men' | 'Women'>('All');

  const categories = ['All', 'Hair', 'Beard', 'Facial', 'Spa', 'Color', 'Skin', 'Packages'];

  // Rich preset menu items for high-end demonstration
  const defaultServices: Service[] = [
    {
      id: 'srv-1',
      tenantId: 'tenant-1',
      name: 'Classic Signature Haircut',
      category: 'Hair',
      description: 'Precision haircut with head wash, blow-dry, and signature styling.',
      duration: 30,
      price: 450,
      tax: 18,
      gender: 'Men',
      assignedStaffIds: ['staff-1'],
      active: true,
      variants: [
        { id: 'v1', name: 'Basic Trim', price: 350, duration: 20 },
        { id: 'v2', name: 'Signature Cut & Wash', price: 450, duration: 30 },
        { id: 'v3', name: 'Luxury Cut + Scalp Massage', price: 650, duration: 45 }
      ]
    },
    {
      id: 'srv-2',
      tenantId: 'tenant-1',
      name: 'Royale Beard Sculpting & Trim',
      category: 'Beard',
      description: 'Hot towel treatment, sharp line-up, and nourishing beard oil.',
      duration: 25,
      price: 300,
      tax: 18,
      gender: 'Men',
      assignedStaffIds: ['staff-1'],
      active: true
    },
    {
      id: 'srv-3',
      tenantId: 'tenant-1',
      name: 'Argan Oil Deep Repair Hair Spa',
      category: 'Spa',
      description: 'Intense moisture restoration, scalp massage, steam treatment.',
      duration: 60,
      price: 1450,
      tax: 18,
      gender: 'All',
      assignedStaffIds: ['staff-2'],
      active: true
    },
    {
      id: 'srv-4',
      tenantId: 'tenant-1',
      name: 'Charcoal Glow & Detox Facial',
      category: 'Facial',
      description: 'Deep pore cleansing, blackhead extraction, LED therapy.',
      duration: 50,
      price: 1850,
      tax: 18,
      gender: 'All',
      assignedStaffIds: ['staff-2'],
      active: true
    },
    {
      id: 'srv-5',
      tenantId: 'tenant-1',
      name: 'Global Hair Color & Gloss',
      category: 'Color',
      description: 'Ammonia-free global color with shine boost serum.',
      duration: 90,
      price: 3200,
      tax: 18,
      gender: 'All',
      assignedStaffIds: ['staff-1'],
      active: true
    },
    {
      id: 'srv-6',
      tenantId: 'tenant-1',
      name: 'Grooming Combo (Cut + Beard + Facial)',
      category: 'Packages',
      description: 'Ultimate transformation package for gentlemen.',
      duration: 90,
      price: 2200,
      tax: 18,
      gender: 'Men',
      assignedStaffIds: ['staff-1', 'staff-2'],
      active: true
    }
  ];

  const allDisplayServices = services.length >= 6 ? services : defaultServices;

  const filteredServices = allDisplayServices.filter(srv => {
    const matchesCategory = activeCategory === 'All' || srv.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      gender,
      assignedStaffIds: [],
      active: true
    });
    setIsModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
            Services Catalog & Pricing OS
          </h2>
          <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            Standardized salon menu, duration presets, pricing tiers, and tax configurations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#C9A24E',
            color: '#14121A',
            border: 'none',
            borderRadius: '12px',
            padding: '0.65rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(201, 162, 78, 0.25)'
          }}
        >
          <Plus size={16} />
          <span>+ Add New Service</span>
        </button>
      </div>

      {/* Trendy SaaS KPI Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ACTIVE CATALOG ITEMS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            {allDisplayServices.length} Menu Items
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            MOST BOOKED SERVICE
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <TrendingUp size={18} /> Haircut (342/mo)
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TOP REVENUE GENERATOR
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#C9A24E', marginTop: '0.35rem' }}>
            Global Hair Color
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVG SERVICE DURATION
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#14121A', marginTop: '0.2rem' }}>
            42 mins
          </div>
        </div>
      </div>

      {/* Category Pills & Search Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' ? allDisplayServices.length : allDisplayServices.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '99px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: isActive ? '#C9A24E' : '#FFFFFF',
                  color: isActive ? '#14121A' : '#75707E',
                  border: isActive ? '1px solid #C9A24E' : '1px solid #E8E3DE',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.45rem 0.85rem', borderRadius: '10px', border: '1px solid #E8E3DE', width: '260px' }}>
          <Search size={15} color="#75707E" />
          <input
            type="text"
            placeholder="Search service menu.."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#1E1A25', outline: 'none', fontSize: '0.825rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Trendy Services Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {filteredServices.map(srv => {
          const currentVariantId = selectedVariantId[srv.id] || (srv.variants && srv.variants[1]?.id) || 'default';
          const activeVariant = srv.variants?.find(v => v.id === currentVariantId);
          const displayPrice = activeVariant ? activeVariant.price : srv.price;
          const displayDuration = activeVariant ? activeVariant.duration : srv.duration;

          return (
            <div
              key={srv.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E3DE',
                borderRadius: '18px',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                {/* Category Pill & Active Toggle Switch */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      backgroundColor: '#F7F2EB',
                      color: '#8C733E',
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '99px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {srv.category}
                  </span>

                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={srv.active}
                      onChange={() => updateService({ ...srv, active: !srv.active })}
                      style={{ display: 'none' }}
                    />
                    <div
                      style={{
                        width: '36px',
                        height: '20px',
                        backgroundColor: srv.active ? '#10b981' : '#D1D5DB',
                        borderRadius: '99px',
                        padding: '2px',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '50%',
                          transform: srv.active ? 'translateX(16px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </div>
                  </label>
                </div>

                {/* Service Name & Description */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14121A', marginBottom: '0.35rem' }}>
                  {srv.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#75707E', lineHeight: '1.4' }}>
                  {srv.description}
                </p>

                {/* Variant Tiers Box (Matching Screenshot Slate Variant Bar) */}
                {srv.variants && srv.variants.length > 0 && (
                  <div style={{ marginTop: '0.85rem', backgroundColor: '#64748B', borderRadius: '12px', padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {srv.variants.map(v => {
                      const isSelected = (selectedVariantId[srv.id] || srv.variants?.[1]?.id) === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVariantId(prev => ({ ...prev, [srv.id]: v.id }))}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.775rem',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'transparent',
                            fontWeight: isSelected ? 800 : 500
                          }}
                        >
                          <span>{v.name}</span>
                          <strong style={{ color: '#34D399', fontWeight: 800 }}>₹{v.price}</strong>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer: Duration & Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E8E3DE',
                  paddingTop: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: '#75707E', fontWeight: 600 }}>
                  <Clock size={15} color="#C9A24E" />
                  <span>{displayDuration} mins</span>
                </div>

                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#14121A' }}>
                  ₹{displayPrice.toLocaleString()}
                  <span style={{ fontSize: '0.7rem', color: '#75707E', fontWeight: 600, marginLeft: '0.25rem' }}>
                    + GST 18%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', backgroundColor: '#FFFFFF', color: '#14121A', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add New Service to Menu</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#75707E' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>SERVICE NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Keratin Hair Treatment"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>CATEGORY</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>GENDER</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    <option value="All">Unisex / All</option>
                    <option value="Men">Men Only</option>
                    <option value="Women">Women Only</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>DURATION (MINS)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>BASE PRICE (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#75707E', display: 'block', marginBottom: '0.35rem' }}>DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Describe treatment steps and benefits..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '10px', padding: '0.65rem', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
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
                Publish Service to Menu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
