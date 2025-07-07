import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { RecipeContext } from './RecipeContext';

export default function Swipe() {
  const navigate = useNavigate();
  const { recipes } = useContext(RecipeContext);
  const [sessionRecipes, setSessionRecipes] = useState(recipes);
  const [liked, setLiked] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setSessionRecipes(recipes);
    setLiked([]);
  }, [recipes]);

  const handleSwipe = (dir, recipe) => {
    const remaining = sessionRecipes.filter((r) => r.id !== recipe.id);
    setFeedback(dir === 'right' ? 'Liked!' : 'Disliked!');
    setTimeout(() => setFeedback(''), 800);
    if (dir === 'right') {
      const newLiked = [...liked, recipe];
      setLiked(newLiked);
      if (remaining.length === 0) {
        navigate('/rate', { state: { likedRecipes: newLiked } });
      }
    } else if (dir === 'left') {
      if (remaining.length === 0) {
        navigate('/rate', { state: { likedRecipes: liked } });
      }
    }
    setSessionRecipes(remaining);
  };

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="relative w-80 h-96">
        {feedback && (
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none ${
              feedback === 'Liked!' ? 'bg-green-600/70' : 'bg-red-600/70'
            }`}
          >
            <span className="text-white text-4xl font-bold drop-shadow-lg">
              {feedback}
            </span>
          </div>
        )}
        {sessionRecipes.map((recipe) => (
          <TinderCard
            className="absolute inset-0"
            key={recipe.id}
            onSwipe={(dir) => handleSwipe(dir, recipe)}
            preventSwipe={["up", "down"]}
            swipeRequirementType="velocity"
            swipeThreshold={0.3}
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
