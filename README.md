Convertor (React)

A lightweight currency converter built with React and Vite. It uses a tiny serverless proxy on Vercel to call the Wallex public API safely from the browser.

Live: https://convertor-react.vercel.app/

Repo: https://github.com/SanaAfshani/convertor-react

Features

⚡️ Fast, client‑side UI (React + Vite)

🔁 Real‑time market data via Wallex API (proxied through Vercel Functions)

🧰 Minimal code, easy to read and extend

🔒 No API secrets exposed to the browser (serverless proxy handles that)

🚀 One‑click deploy to Vercel

Tech Stack

Frontend: React (Vite)

Serverless: Vercel Functions (Web Fetch handler)

API: Wallex (https://api.wallex.ir)

Getting Started (Local)
Prerequisites

Node.js 20+ (Node 20 recommended)
npm or yarn or pnpm

Install & Run

# install deps
npm install

# env
create .env

# start dev server
npm run dev
