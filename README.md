# PromHub - AI Prompt Marketplace

A modern marketplace for buying and selling AI prompts, built with Next.js 14, Supabase, and Toss Payments.

## Features

- 🔐 User Authentication (Supabase Auth)
- 🎨 Prompt Marketplace (Browse, Search, Filter)
- 💳 Payment Integration (Toss Payments)
- 📊 Seller Dashboard
- ⭐ Review System
- 🎯 SEO Optimized
- 📱 Responsive Design

## Supported AI Models

- ChatGPT
- Midjourney
- DALL-E
- Gemini

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment**: Toss Payments
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Toss Payments account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd prom_hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_toss_client_key
TOSS_SECRET_KEY=your_toss_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL script in `supabase/schema.sql` in the Supabase SQL Editor

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
prom_hub/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utility functions and Supabase clients
├── types/           # TypeScript type definitions
├── supabase/        # Database schema and migrations
└── public/          # Static assets
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

## License

MIT
