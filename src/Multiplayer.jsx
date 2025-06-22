import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Multiplayer() {
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  const createSession = async () => {
    try {
      const res = await fetch('http://localhost:3000/create');
      const data = await res.json();
      setGeneratedCode(data.code);
      joinSession(data.code);
    } catch (err) {
      console.error(err);
    }
  };

  const joinSession = (sessionCode) => {
    const ws = new WebSocket(`ws://localhost:3000?code=${sessionCode}`);
    ws.onmessage = (e) => setMessages((prev) => [...prev, e.data]);
    ws.onopen = () => setJoined(true);
    setSocket(ws);
  };

  const handleJoin = () => {
    if (code) joinSession(code);
  };

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setInput('');
    }
  };

  const sessionCode = generatedCode || code;

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Multiplayer Session</h2>
      {!joined ? (
        <div className="space-y-4">
          <button
            onClick={createSession}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Create Session
          </button>
          {generatedCode && (
            <p className="mt-2">
              Share this code: <span className="font-mono">{generatedCode}</span>
            </p>
          )}
          <div>
            <input
              className="border p-2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
            />
            <button
              onClick={handleJoin}
              className="bg-pink-500 text-white px-4 py-2 rounded ml-2"
            >
              Join
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            Session code: <span className="font-mono">{sessionCode}</span>
          </p>
          <div className="h-40 overflow-y-auto border mb-4 p-2 text-left">
            {messages.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>
          <div>
            <input
              className="border p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message"
            />
            <button
              onClick={sendMessage}
              className="bg-pink-500 text-white px-4 py-2 rounded ml-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Link to="/" className="underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
