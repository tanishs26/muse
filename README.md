# Muse - Music streaming application

A modern, responsive music streaming web app built with React.js, Next.js, Tailwind CSS, Supabase, Framer Motion, and Zustand.

🔗 **Live Demo:** [https://muse-tan.vercel.app](https://muse-tan.vercel.app)

---

## Features

- Responsive design supporting both desktop and mobile views  
- Seamless audio playback with play, pause, skip, and volume controls  
- Full-screen mobile player with smooth entrance and exit animations  
- User authentication via Supabase with Google and GitHub OAuth providers  
- Personalized recently played song history stored securely per user  
- Centralized playback state management using Zustand for synchronized controls  
- Backend powered by Supabase with custom PostgreSQL functions  
- Fast performance and modern UI built with Tailwind CSS  

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- npm or yarn  

### Installation and Running Locally

1. Clone the repository:
    ```
    git clone https://github.com/tanishs26/muse.git
    cd muse-player
    ```
2. Install dependencies:
    ```
    npm install
    # or
    yarn install
    ```
3. Setup Supabase project and obtain your API credentials.

4. Create a `.env.local` file based on `.env.example` and add:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

5. Run any database migrations or seeders if provided.

6. Start development server:
    ```
    npm run dev
    # or
    yarn dev
    ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

- React.js & Next.js (frontend framework)  
- Zustand (state management)  
- Tailwind CSS (styling)  
- Supabase (auth, database, backend)  
- Framer Motion (animations)  
- Vercel (deployment)  

---

## Contribution

Open issues or pull requests are always welcome to improve the project.

---

