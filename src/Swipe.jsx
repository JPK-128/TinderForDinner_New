import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';

const sampleRecipes = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    img: 'https://via.placeholder.com/400x300?text=Spaghetti',
  },
  {
    id: 2,
    name: 'Vegetarian Curry',
    img: 'https://via.placeholder.com/400x300?text=Curry',
  },
  {
    id: 3,
    name: 'Pancakes',
    img: 'https://via.placeholder.com/400x300?text=Pancakes',
  },
];

export default function Swipe() {
  const navigate = useNavigate();
  const [recipes] = useState(sampleRecipes);

  const handleSwipe = (dir, recipe) => {
    if (dir === 'right') {
      navigate('/match', { state: { recipe } });
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="w-80 h-96">
        {recipes.map((recipe) => (
          <TinderCard
            className="absolute"
            key={recipe.id}
            onSwipe={(dir) => handleSwipe(dir, recipe)}
          >
            <div
              className="bg-white h-96 rounded shadow-lg flex flex-col justify-end"
              style={{
                backgroundImage: `url(${recipe.img})`,
                backgroundSize: 'cover',
              }}
            >
              <div className="bg-black bg-opacity-60 text-white p-2">
                {recipe.name}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
