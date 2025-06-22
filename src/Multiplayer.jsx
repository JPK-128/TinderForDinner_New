import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { RecipeContext } from './RecipeContext';

export default function Multiplayer() {
  const { recipes } = useContext(RecipeContext);

  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [clientId] = useState(() => Math.random().toString(36).slice(2));

  const [sessionRecipes, setSessionRecipes] = useState(recipes);
  const [liked, setLiked] = useState([]);
  const [localDone, setLocalDone] = useState(false);
  const [remoteLikes, setRemoteLikes] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (joined) {
      setSessionRecipes(recipes);
      setLiked([]);
      setLocalDone(false);
      setRemoteLikes(null);
      setMatches(null);
    }
  }, [joined, recipes]);

  const createSession = async () => {
    setCreating(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/create');
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setGeneratedCode(data.code);
      joinSession(data.code);
    } catch (err) {
      console.error(err);
      setError('Failed to create session. Make sure the server is running.');
    } finally {
      setCreating(false);
    }
  };

  const joinSession = (sessionCode) => {
    const ws = new WebSocket(`ws://localhost:3000?code=${sessionCode}`);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.sender === clientId) return;
        if (msg.type === 'done') {
          setRemoteLikes(msg.likes);
        }
      } catch {
        // ignore
      }
    };
    ws.onopen = () => setJoined(true);
    ws.onerror = () => {
      setError('Connection failed. Make sure the server is running.');
    };
    setSocket(ws);
  };

  const handleJoin = () => {
    if (code) joinSession(code);
  };

  const finalize = (likesList) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ type: 'done', likes: likesList.map((r) => r.id), sender: clientId })
      );
    }
    setLocalDone(true);
  };

  const handleSwipe = (dir, recipe) => {
    const remaining = sessionRecipes.filter((r) => r.id !== recipe.id);
    if (dir === 'right') {
      const newLiked = [...liked, recipe];
      setLiked(newLiked);
      if (remaining.length === 0) {
        finalize(newLiked);
      }
    } else if (dir === 'left') {
      if (remaining.length === 0) {
        finalize(liked);
      }
    }
    setSessionRecipes(remaining);
  };

  useEffect(() => {
    if (localDone && remoteLikes !== null) {
      const localIds = liked.map((r) => r.id);
      const intersection = recipes.filter(
        (r) => localIds.includes(r.id) && remoteLikes.includes(r.id)
      );
      setMatches(intersection);
    }
  }, [localDone, remoteLikes, liked, recipes]);

  const sessionCode = generatedCode || code;

  let content;

  if (!joined) {
    content = (
      <div className="space-y-4">
        <button
          onClick={createSession}
          className="bg-pink-500 text-white px-4 py-2 rounded"
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Session'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
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
    );
  } else if (matches) {
    content = (
      <div>
        <h2 className="text-xl font-bold mb-4">Matched Recipes</h2>
        {matches.length > 0 ? (
          <div className="flex justify-center space-x-4 overflow-x-auto">
            {matches.map((recipe) => (
              <div key={recipe.id} className="text-center">
                <img src={recipe.img} alt={recipe.name} className="w-40 h-40 object-cover rounded mb-2" />
                <p className="font-semibold">{recipe.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No matches found</p>
        )}
      </div>
    );
  } else if (localDone && remoteLikes === null) {
    content = <p>Waiting for the other player...</p>;
  } else {
    content = (
      <div className="flex justify-center items-center h-full p-4">
        <div className="relative w-80 h-96">
          {sessionRecipes.map((recipe) => (
            <TinderCard
              className="absolute inset-0"
              key={recipe.id}
              onSwipe={(dir) => handleSwipe(dir, recipe)}
              swipeRequirementType="position"
              swipeThreshold={100}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                <img
                  src={recipe.img}
                  alt={recipe.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                  <h3 className="text-xl font-bold">{recipe.name}</h3>
                  <p className="text-sm">{recipe.description}</p>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Multiplayer Session</h2>
      {content}
      <div className="mt-4">
        <p className="mb-2">Session code: <span className="font-mono">{sessionCode}</span></p>
        <Link to="/" className="underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
