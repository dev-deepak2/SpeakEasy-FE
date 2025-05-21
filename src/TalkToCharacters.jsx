// TalkSection.jsx
import { useNavigate } from 'react-router-dom';

export default function TalkToCharacters() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Talk to Characters</h2>
      <div
        className="cursor-pointer mx-auto w-64 h-40 bg-indigo-100 hover:bg-indigo-200 transition rounded-lg flex items-center justify-center shadow-lg"
        onClick={() => navigate('/characters')}
      >
        <img
          src="/assets/characters-preview.png"
          alt="Talk to Characters"
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>
    </div>
  );
}
