import { useState, useContext } from 'react';
import { RecipeContext } from './RecipeContext';

export default function AddRecipe() {
  const { addRecipe } = useContext(RecipeContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !img) return;
    addRecipe({ name, description, img });
    setName('');
    setDescription('');
    setImg('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            className="border w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <input
            className="border w-full p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            className="border w-full p-2"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
