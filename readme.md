# Tinder for Dinner

This repository contains a minimal web demo for the "Tinder for Dinner" concept.
It uses React with Vite and Tailwind CSS.

## Development

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
3. Open <http://localhost:5173> in your browser.

## Building for Production

After installing dependencies you can create a production build:

```bash
npm run build
```

To preview the built version locally run:

```bash
npm run preview
```

The demo shows a simple swipe interface with placeholder recipes. Example images
are inlined directly in the code using data URI strings.

## Multiplayer Server

A simple Node WebSocket server is included for experimental multiplayer sessions.
Start it alongside the Vite dev server:

```bash
npm run server
```

The client will connect to `ws://localhost:3000` when creating or joining a session.
