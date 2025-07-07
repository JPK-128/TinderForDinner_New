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
    <div className="flex justify-center p-4">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen relative">
          {feedback && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 text-white font-bold text-xl drop-shadow">
              {feedback}
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
    </div>
  );
}
