import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';

const sampleRecipes = [
  {
    id: 1,
    name: 'Classic Pizza',
    description: 'Tomato, mozzarella and fresh basil',
    img:
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 2,
    name: 'Sushi Platter',
    description: 'Assorted fresh sushi rolls',
    img:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 3,
    name: 'Veggie Burger',
    description: 'Grilled veggies with avocado',
    img:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=60',
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
      <div className="relative w-80 h-96">
        {recipes.map((recipe) => (
          <TinderCard
            className="absolute inset-0"
            key={recipe.id}
            onSwipe={(dir) => handleSwipe(dir, recipe)}
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
