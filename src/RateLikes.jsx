import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

export default function RateLikes() {
  const location = useLocation();
  const likedRecipes = location.state?.likedRecipes || [];
  const [ratings, setRatings] = useState(likedRecipes.map(() => 0));

  const handleChange = (index, value) => {
    setRatings((prev) => prev.map((r, i) => (i === index ? Number(value) : r)));
  };

  if (likedRecipes.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">No likes this session</h2>
        <Link to="/" className="underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Rate your liked recipes</h2>
      <div className="space-y-6">
        {likedRecipes.map((recipe, index) => (
          <div key={recipe.id} className="text-center">
            <img
              src={recipe.img}
              alt={recipe.name}
              className="mx-auto mb-2 w-40 h-40 object-cover rounded"
            />
            <p className="font-semibold mb-1">{recipe.name}</p>
            <select
              className="border p-1"
              value={ratings[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/" className="bg-pink-500 text-white px-4 py-2 rounded">Finish</Link>
      </div>
    </div>
  );
}

