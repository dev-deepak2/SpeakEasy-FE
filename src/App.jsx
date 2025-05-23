import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Characters from './Characters';
import QuestionSetup from './QuestionSetup';
import CategoryPage from './CategoryPage';
import AnalysisPage from './AnalysisPage';
import CharacterPage from './CharacterPage';
import { useState } from 'react';

function App() {

  const [maxQuestions, setMaxQuestions] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<CategoryPage />} />
          <Route path='/QSetUp' element={<QuestionSetup setMaxQuestions={setMaxQuestions} />} />
          <Route path='/Home' element={<Home maxQuestions={maxQuestions} />} />
          <Route path='/analysis' element={<AnalysisPage />} />
          <Route path='/Characters' element={<Characters />} />
          <Route path="/characterPage/:id" element={<CharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
