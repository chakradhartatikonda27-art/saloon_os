import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { ServiceCategory, Service } from '../../types';
import { Plus, Clock, Search, Sparkles, TrendingUp, X, Gift, Tag, Check, Zap } from 'lucide-react';

interface ComboPack {
  id: string;
  name: string;
  badge: string;
  savings: number;
  originalPrice: number;
  comboPrice: number;
  duration: number;
  itemsIncluded: string[];
  description: string;
  gradient: string;
  popular?: boolean;
}

export const Services: React.FC = () => {
  const { services, addService, updateService, setActiveModule } = useSalon();
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

  const categories = ['All', 'Combo Packs', 'Hair', 'Beard', 'Facial', 'Spa', 'Color', 'Skin', 'Packages'];

  // Color Mapping Helper for Categories
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Hair': return { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE' };
      case 'Beard': return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' };
      case 'Facial': return { bg: '#D1FAE5', text: '#059669', border: '#A7F3D0' };
      case 'Spa': return { bg: '#FCE7F3', text: '#DB2777', border: '#FBCFE8' };
      case 'Color': return { bg: '#F3E8FF', text: '#9333EA', border: '#E9D5FF' };
      case 'Skin': return { bg: '#CFFAFE', text: '#0891B2', border: '#A5F3FC' };
      case 'Combo Packs':
      case 'Packages': return { bg: '#FFFBEB', text: '#B45309', border: '#FCD34D' };
      default: return { bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' };
    }
  };

  // Combo Packs Data
  const comboPacks: ComboPack[] = [
    {
      id: 'combo-1',
      name: "Gentlemen's Royal Royalty Combo",
      badge: "MOST POPULAR",
      savings: 850,
      originalPrice: 3200,
      comboPrice: 2350,
      duration: 105,
      itemsIncluded: ['Classic Haircut & Blow-dry', 'Royale Beard Sculpting', 'Charcoal Detox Facial', 'Head & Shoulder Scalp Massage'],
      description: 'The complete grooming experience designed for gentlemen before big events.',
      gradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      popular: true
    },
    {
      id: 'combo-2',
      name: "Glow & Renewal Spa Combo",
      badge: "BEST VALUE",
      savings: 1200,
      originalPrice: 5500,
      comboPrice: 4300,
      duration: 150,
      itemsIncluded: ['Signature Glow Facial', 'Argan Oil Repair Hair Spa', 'De-Tan Treatment', 'Global Hair Gloss'],
      description: 'Total rejuvenation package for skin hydration, hair repair, and vibrant glow.',
      gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)'
    },
    {
      id: 'combo-3',
      name: "Quick Executive Express Combo",
      badge: "FAST & FRESH",
      savings: 350,
      originalPrice: 1650,
      comboPrice: 1300,
      duration: 45,
      itemsIncluded: ['Precision Haircut', 'Beard Line-Up & Trim', 'Express Face Cleanup'],
      description: 'Quick 45-minute makeover package for busy executives on the go.',
      gradient: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)'
    },
    {
      id: 'combo-4',
      name: "Bridal Pamper Deluxe Package",
      badge: "LUXURY SPECIAL",
      savings: 1800,
      originalPrice: 7800,
      comboPrice: 6000,
      duration: 210,
      itemsIncluded: ['Full Face LED Facial', 'Global Hair Color & Styling', 'Deep Spa Therapy', 'Manicure & Nail Polish'],
      description: 'Premium head-to-toe beauty transformation for special occasions.',
      gradient: 'linear-gradient(135deg, #831843 0%, #BE185D 100%)'
    }
  ];

  // Standard Individual Services Data
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
      name: 'Skin Brightening De-Tan',
      category: 'Skin',
      description: 'Instant sun tan removal scrub with fruit antioxidant therapy.',
      duration: 40,
      price: 900,
      tax: 18,
      gender: 'All',
      assignedStaffIds: ['staff-2'],
      active: true
    }
  ];

  const allDisplayServices = services.length >= 6 ? services : defaultServices;

  const filteredServices = allDisplayServices.filter(srv => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Combo Packs' || srv.category === activeCategory;
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
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Services Menu & Combo Packs OS
            </h2>
            <span style={{ backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: '99px', letterSpacing: '0.05em' }}>
              SPECIAL COMBOS LIVE 🔥
            </span>
          </div>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Standardized single services, bundled combo packages, duration presets, and pricing tiers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#4F46E5',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '0.7rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
          }}
        >
          <Plus size={18} />
          <span>+ Add New Service</span>
        </button>
      </div>

      {/* Trendy Colorful SaaS Intelligence KPI Overview Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {/* KPI 1 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.25rem', borderLeft: '5px solid #4F46E5', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TOTAL MENU SERVICES
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#4F46E5', marginTop: '0.2rem' }}>
            {allDisplayServices.length + comboPacks.length} Items
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
            {allDisplayServices.length} Single · 4 Combo Bundles
          </div>
        </div>

        {/* KPI 2 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.25rem', borderLeft: '5px solid #059669', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TOP SELLING COMBO BUNDLE
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#059669', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Gift size={18} /> Royal Royalty Combo
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '0.2rem' }}>
            Save ₹850 · 142 booked this month
          </div>
        </div>

        {/* KPI 3 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.25rem', borderLeft: '5px solid #D97706', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVERAGE COMBO SAVINGS
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#D97706', marginTop: '0.2rem' }}>
            ₹1,050 OFF
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
            Up to 30% discount on bundles
          </div>
        </div>

        {/* KPI 4 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.25rem', borderLeft: '5px solid #DB2777', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVG COMBINED TIME
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#DB2777', marginTop: '0.2rem' }}>
            110 mins
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
            Multi-stylist simultaneous booking
          </div>
        </div>
      </div>

      {/* Colorful Category Pills & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const style = getCategoryColor(cat);
            const count = cat === 'All' 
              ? allDisplayServices.length + comboPacks.length
              : cat === 'Combo Packs'
              ? comboPacks.length
              : allDisplayServices.filter(s => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '99px',
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  backgroundColor: isActive ? (cat === 'Combo Packs' ? '#B45309' : '#0F172A') : style.bg,
                  color: isActive ? '#FFFFFF' : style.text,
                  border: isActive ? '1px solid #0F172A' : `1px solid ${style.border}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat === 'Combo Packs' ? '🎁 Combo Packs' : cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.5rem 0.9rem', borderRadius: '12px', border: '1px solid #CBD5E1', width: '280px' }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            placeholder="Search services or combos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#0F172A', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      {/* SECTION 1: COMBO PACK SERVICES & VALUE BUNDLES (Shown when All or Combo Packs selected) */}
      {(activeCategory === 'All' || activeCategory === 'Combo Packs') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} color="#B45309" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
                Featured Combo Packs & Value Bundles
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 800, backgroundColor: '#FEF3C7', padding: '0.25rem 0.75rem', borderRadius: '99px', border: '1px solid #FCD34D' }}>
              🎁 Save up to ₹1,800 on Bundles
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {comboPacks.map(combo => (
              <div
                key={combo.id}
                style={{
                  background: combo.gradient,
                  borderRadius: '20px',
                  padding: '1.5rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Badge & Savings Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 900, padding: '0.25rem 0.65rem', borderRadius: '99px', letterSpacing: '0.05em' }}>
                      {combo.badge}
                    </span>

                    <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 900, padding: '0.25rem 0.75rem', borderRadius: '99px', boxShadow: '0 2px 6px rgba(16,185,129,0.4)' }}>
                      🔥 SAVE ₹{combo.savings}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: '1.3', marginBottom: '0.4rem' }}>
                    {combo.name}
                  </h3>
                  <p style={{ fontSize: '0.825rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1rem' }}>
                    {combo.description}
                  </p>

                  {/* Included Services List */}
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>INCLUDED SERVICES:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                      {combo.itemsIncluded.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '0.775rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} color="#34D399" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', opacity: 0.9 }}>
                    <Clock size={15} color="#FCD34D" />
                    <span>{combo.duration} mins total</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', opacity: 0.7, marginRight: '0.35rem' }}>
                        ₹{combo.originalPrice}
                      </span>
                      <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#34D399' }}>
                        ₹{combo.comboPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveModule('billing')}
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.55rem 1rem',
                        fontSize: '0.825rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      Bill Combo →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: STANDARD INDIVIDUAL SERVICES */}
      {activeCategory !== 'Combo Packs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
            Standard Individual Services Menu
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {filteredServices.map(srv => {
              const catStyle = getCategoryColor(srv.category);
              const currentVariantId = selectedVariantId[srv.id] || (srv.variants && srv.variants[1]?.id) || 'default';
              const activeVariant = srv.variants?.find(v => v.id === currentVariantId);
              const displayPrice = activeVariant ? activeVariant.price : srv.price;
              const displayDuration = activeVariant ? activeVariant.duration : srv.duration;

              return (
                <div
                  key={srv.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
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
                    {/* Vibrant Category Pill & Active Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          backgroundColor: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`,
                          fontSize: '0.725rem',
                          fontWeight: 900,
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
                            backgroundColor: srv.active ? '#10B981' : '#CBD5E1',
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
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                      {srv.name}
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: '1.4' }}>
                      {srv.description}
                    </p>

                    {/* Interactive Slate Variant Tier Selector Box */}
                    {srv.variants && srv.variants.length > 0 && (
                      <div style={{ marginTop: '0.85rem', backgroundColor: '#475569', borderRadius: '12px', padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
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
                                backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'transparent',
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
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>
                      <Clock size={15} color="#4F46E5" />
                      <span>{displayDuration} mins</span>
                    </div>

                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A' }}>
                      ₹{displayPrice.toLocaleString()}
                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginLeft: '0.25rem' }}>
                        + GST 18%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', backgroundColor: '#FFFFFF', color: '#0F172A', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add New Service to Menu</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>SERVICE NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Keratin Hair Treatment"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>CATEGORY</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    {categories.filter(c => c !== 'All' && c !== 'Combo Packs').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>GENDER</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  >
                    <option value="All">Unisex / All</option>
                    <option value="Men">Men Only</option>
                    <option value="Women">Women Only</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>DURATION (MINS)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>BASE PRICE (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Describe treatment steps and benefits..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#4F46E5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
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
