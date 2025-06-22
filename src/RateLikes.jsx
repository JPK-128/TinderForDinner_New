import { useLocation, Link } from 'react-router-dom';
import { useState, useRef } from 'react';

export default function RateLikes() {
  const location = useLocation();
  const likedRecipes = location.state?.likedRecipes || [];
  const [ordered, setOrdered] = useState(likedRecipes);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const items = [...ordered];
    const dragged = items[dragItem.current];
    items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setOrdered(items);
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
      <h2 className="text-xl font-bold mb-4 text-center">
        Rank your liked recipes by dragging them
      </h2>
      <div className="flex justify-center space-x-4 overflow-x-auto">
        {ordered.map((recipe, index) => (
          <div
            key={recipe.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="text-center cursor-move"
          >
            <img
              src={recipe.img}
              alt={recipe.name}
              className="mb-2 w-40 h-40 object-cover rounded"
            />
            <p className="font-semibold mb-1">{recipe.name}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/"
          state={{ rankedRecipes: ordered }}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Finish
        </Link>
      </div>
    </div>
  );
}

