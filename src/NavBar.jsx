import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate(); // ✅ moved here

  return (
    <nav
      className="bg-gradient-to-r from-indigo-600 to-purple-600
      mx-auto mt-4 w-fit px-8 py-2 rounded-full shadow-lg"
    >
      <h1
        onClick={() => navigate('/')}
        className="text-white text-2xl font-medium text-center cursor-pointer"
      >
        Home
      </h1>
      
    </nav>
  );
}
