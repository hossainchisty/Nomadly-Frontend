# Nomadly

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Nomadly** is a high-performance, aesthetically pleasing web application tailored for the modern digital nomad. It bridges the gap between travelers seeking work-friendly environments and hosts offering premium accommodations. Built with a focus on speed, responsiveness, and a premium user experience.

---

## ✨ Key Features

### 🌍 For Travelers
- **Intuitive Discovery**: Advanced filtering and search for finding the perfect stay.
- **Detailed Property Overviews**: Comprehensive views including amenities, location data, and pricing.
- **Nomadly Score™**: Custom quality badges (NomadlyScoreBadge) to highlight top-tier workspaces.
- **Secure Bookings**: Streamlined booking request flow with real-time feedback.
- **Personalized Profiles**: Manage travel history and preferences.

### 🏠 For Hosts
- **Powerful Dashboard**: Real-time analytics and overview of hosting operations.
- **Complete Property Control**: Effortless listing management with a robust editor.
- **Booking Intelligence**: Track upcoming stays, guest details, and history.
- **Financial Analytics**: In-depth revenue tracking and performance insights.
- **Subscription Management**: Access premium features via an integrated subscription system.
- **Reputation Management**: Dedicated review tracking to maintain high standards.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI primitives
- **Animations**: Framer Motion
- **Data Management**: TanStack Query (v5), Axios
- **Form Handling**: React Hook Form, Zod validation
- **Routing**: React Router DOM (v6)
- **UI/UX**: Lucide Icons, Sonner Toasts, Recharts for data visualization

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- [Bun](https://bun.sh/) (Recommended) or npm/yarn/pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hossainchisty/Nomadly-Frontend.git
   cd Nomadly-Frontend
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file in the root directory and add your backend API URL:
   ```env
   VITE_API_BASE_URL=your_api_url_here
   ```

4. **Launch Development Server:**
   ```bash
   bun dev
   # or
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # UI Building blocks (Atomic design / Shadcn)
│   ├── ui/         # Base Shadcn components
│   └── ...         # Feature-specific components (Navigation, Cards, etc.)
├── contexts/       # Global state management (Auth, Subscriptions)
├── hooks/          # Domain-specific and utility React hooks
├── lib/            # External library configurations (Axios, Utils)
├── pages/          # Full-page route components
│   ├── admin/      # Management/Host dashboard pages
│   └── host/       # Specialized host tools
├── utils/          # Pure helper functions
└── App.tsx         # Routing configuration and provider wrapping
```

---

## 🤝 Contributing

We welcome contributions from the community! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with passion for the global nomad community.*
