# Salon OS — Complete Salon Management SaaS & Customer Web App

**Salon OS** is a modern, responsive, production-ready **Salon Management SaaS Operating System** built for salon owners, managers, receptionists, and customers.

It solves the core industry challenge: **"No more unnecessary physical waiting at the salon."**

---

## ✨ Features

### 🏢 Salon Owner & Staff Operating System (Admin OS)
- **5-Second Dashboard**: Real-time revenue metrics (Cash, UPI GPay/PhonePe, Card POS), total appointments, customers served, live queue monitor, and staff roster availability.
- **Appointments Schedule Manager**: Day, Week, Month, and List agenda views with 5-step booking flow and double-booking protection.
- **Dedicated Walk-in & Live Queue**: Queue cards (#1, #2, #3) with urgency alerts (>20 min wait), staff assignment, and 1-click status dispatching.
- **Customer CRM**: Complete customer profiles, lifetime spend tracking, visit counts, favorite stylists, Gold/Platinum membership tiers, and WhatsApp re-engagement.
- **Services & Pricing Catalog**: Categorized menu (Hair, Beard, Facial, Spa, Color, Skin, Packages), prices, durations, variants, and 18% GST calculation.
- **Staff Management & Commissions**: Attendance status, specialization tags, rating score, and percentage/fixed commission calculations.
- **Reception POS & Billing**: Cashier terminal with service/product cart, discount application, GST 18% tax calculation, confetti celebratory feedback, and printable GST tax invoices.
- **Expenses & Net Profit Calculator**: Track outflows (Rent, Salaries, Inventory) with live Net Operating Profit calculation (`Gross Revenue - Expenses`).
- **Inventory & Stock Management**: Product catalog with low-stock threshold alerts and restock workflow.
- **Marketing CRM**: Targeted campaigns (Inactive 30/60/90 days, VIP) with WhatsApp message dispatching.
- **Reports & Analytics**: Financial overview, Staff Revenue Leaderboard, and Top Booked Services.

### 📱 Customer Web Experience & Smart Token Queue (`CustomerApp.tsx`)
- **Branded Public Website**: Custom domain simulation (`salon.yourplatform.com`) with logo, address, hours, call, and WhatsApp links.
- **Offers Carousel**: Auto-scrolling & swipeable discount cards ("Flat 20% OFF on Hair Spa", "Gentlemen Combo ₹699").
- **Salon Photo Gallery**: Interactive interior styling station, hair spa suite, and reception showcase.
- **3-Step Customer Booking Flow**: Select Service -> Choose Preferred Stylist -> Select Date & Available Time Slot.
- **Smart Token Generator**: Generates token `#A27` upon booking confirmation.
- **"Track My Token" Live Queue Monitor**: Track real-time queue position, currently serving token (`#A25`), customers ahead (`1`), estimated wait time (`12 mins`), and approaching-turn alerts (*"You're almost next!"*).
- **Stylist Request Alert Banner**: Real-time incoming request alert for stylists with `[ ACCEPT ]` and `[ DECLINE ]` actions.
- **Customer Account & Loyalty Portal**: Redeemable loyalty points wallet (`1,250 Points = ₹125 value`), visit history, digital tax invoices, and personalized promo codes.

---

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript + Vite 8
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Styling**: Vanilla CSS with custom HSL design tokens, glassmorphism, and responsive layout systems (Desktop, Tablet, Mobile)

---

## 💻 Local Development Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/chakradhartatikonda27-art/saloon_os.git
   cd saloon_os
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## ⚡ Deployment

This application is ready to be deployed on [Vercel](https://vercel.com) or Netlify.

```bash
npx vercel --prod
```

---

## 📄 License

MIT License © 2026 Salon OS Team.
