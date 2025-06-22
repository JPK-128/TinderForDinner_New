import { Link } from 'react-router-dom';

export default function Multiplayer() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Multiplayer Session</h2>
      <p className="mb-4">Here you can create or join a multiplayer session. This is a placeholder for future functionality.</p>
      <Link to="/" className="underline">Back to Home</Link>
    </div>
  );
}
