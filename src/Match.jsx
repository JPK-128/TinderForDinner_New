import { useLocation, Link } from 'react-router-dom';

export default function Match() {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div className="p-4 text-center">
        <h2>No match yet</h2>
        <Link className="underline" to="/swipe">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">It&apos;s a match!</h2>
      <img src={recipe.img} alt={recipe.name} className="mx-auto mb-4" />
      <p className="mb-1 font-semibold">{recipe.name}</p>
      {recipe.description && <p className="mb-4 text-sm">{recipe.description}</p>}
      <Link className="bg-red-500 text-white px-4 py-2 rounded" to="/swipe">
        Keep Swiping
      </Link>
    </div>
  );
}
