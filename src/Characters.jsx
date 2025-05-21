import { useNavigate } from 'react-router-dom';

import image1 from './assets/curiousGirl.jpg';
import image2 from './assets/image.jpg';
import image3 from './assets/Rin.jpg';
import image4 from './assets/Brave.jpg';

const characters = [
  { name: "Anya", img: image1, id: "anya", voiceId: "oHwIxN4uGlD1D3IKyWJZ"},
  { name: "Dark Lord", img: image2, id: "Dark", voiceId: "2gPFXx8pN3Avh27Dw5Ma" },
  { name: "Rin", img: image3, id: "rin", voiceId: "oHwIxN4uGlD1D3IKyWJZ" },
  { name: "Guts", img: image4, id: "guts", voiceId: "2qkvhTnYa7pn9h0BQAUq" },
];

export default function Characters() {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 text-center">
     <h2 className="text-2xl font-bold text-white mb-8 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-500 to-teal-400 shadow-md inline-block">
  Choose a Character
</h2>

      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {characters.map((char) => (
          <div key={char.id} className="flex flex-col items-center">
            <div
              onClick={() =>
                navigate(`/characterPage/${char.id}`, {
                  state: { voiceId: char.voiceId, name: char.name, img: char.img },
                })
              }
              className="aspect-square max-w-[230px] mx-auto bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transition overflow-hidden"
            >
              <img
                src={char.img}
                alt={char.name}
                className="w-full h-full object-cover shadow-md"
              />
            </div>
            <h3 className="text-center text-base font-bold text-white mt-3 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 px-3 py-1 rounded-lg shadow-md">
              {char.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
