# BY INTEGRATED CONCEPT SERVICES - Auto Service Website

A comprehensive auto service management platform built with Next.js, Supabase, and Paystack.

## Features

### Public Features
- 🏠 Professional landing page with company information
- 🔧 Service catalog organized by categories
- 📍 Multiple location information (Sokoto & Abuja)
- 📱 Fully responsive design

### Customer Features
- 👤 User authentication (sign up/login)
- 📅 Service booking system with date selection
- 💳 Secure payment via Paystack
- 📊 Booking history and status tracking
- 📝 Add notes to bookings

### Admin Features
- 📊 Dashboard with business statistics
- 🔧 Service management (CRUD operations)
- 💰 Pricing control
- 🖼️ Image management for services
- 📅 Booking management and status updates
- 👥 User management with role promotion
- 🛡️ Role-based access control

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payment:** Paystack
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Paystack account

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy \`.env.example\` to \`.env.local\`
   - Add your Paystack secret key

4. Run the database migrations:
   - The SQL scripts in \`scripts/\` folder will create all necessary tables
   - Run them in order: 001, 002, etc.

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

The email \`mantimdanzaki@gmail.com\` is automatically assigned admin role on signup.

## Database Schema

- **profiles:** User information with role-based access
- **service_categories:** Service category organization
- **services:** Available services with pricing
- **bookings:** Customer bookings with payment tracking

## Payment Integration

Payments are processed securely through Paystack:
1. Customer creates a booking
2. Redirected to Paystack payment page
3. Payment verified via webhook
4. Booking status automatically updated

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control for admin features
- Secure payment processing via Paystack
- Protected API routes

## Support

For support, email info@byintegrated.com or visit our locations in Sokoto and Abuja.

## License

© 2025 BY INTEGRATED CONCEPT SERVICES LIMITED. All rights reserved.
