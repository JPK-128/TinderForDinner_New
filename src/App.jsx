import { Routes, Route, Link } from 'react-router-dom';
import Swipe from './Swipe';
import Match from './Match';
import AddRecipe from './AddRecipe';
import { RecipeProvider } from './RecipeContext';

export default function App() {
  return (
    <RecipeProvider>
      <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-pink-500 text-white text-center">
        <h1 className="text-2xl font-bold">Tinder for Dinner</h1>
        <nav className="mt-2">
          <Link className="underline mr-4" to="/">Home</Link>
          <Link className="underline mr-4" to="/swipe">Swipe</Link>
          <Link className="underline" to="/add">Add Recipe</Link>
        </nav>
      </header>
      <main className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/match" element={<Match />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </main>
    </div>
    </RecipeProvider>
  );
}

function Home() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">Start swiping with your partner</h2>
      <Link to="/swipe" className="bg-pink-500 text-white px-4 py-2 rounded">
        Start
      </Link>
    </div>
  );
}
