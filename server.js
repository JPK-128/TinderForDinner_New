const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sessions = {};

function generateCode() {
  let code;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (sessions[code]);
  sessions[code] = new Set();
  return code;
}

app.get('/create', (req, res) => {
  const code = generateCode();
  res.json({ code });
});

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get('code');
  if (!code) {
    ws.close();
    return;
  }
  if (!sessions[code]) {
    sessions[code] = new Set();
  }
  sessions[code].add(ws);

  ws.on('message', (msg) => {
    sessions[code].forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on('close', () => {
    sessions[code].delete(ws);
    if (sessions[code].size === 0) {
      delete sessions[code];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

