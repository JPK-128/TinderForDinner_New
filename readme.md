# Tinder for Dinner

This repository contains a minimal web demo for the "Tinder for Dinner" concept.
It uses React with Vite and Tailwind CSS.

## Development

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server (this will also launch the WebSocket server):
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
The WebSocket server starts automatically when running `npm run dev`. You can
also launch it separately if needed:

```bash
npm run server
```

The client will connect to `ws://localhost:3000` when creating or joining a session.

Open the multiplayer page in one browser and click **Create Session**. A six digit
code will appear and the page will automatically join that session. In another
browser or device, open the same page and enter that code to join.

