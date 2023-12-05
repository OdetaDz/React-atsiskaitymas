import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/UI/footer/Footer';
import Header from './components/UI/header/Header';
import Main from './components/pages/main/Main';
import AllQuestions from './components/pages/allQuestions/AllQuestions';
import OneQuestion from './components/pages/oneQuestion/OneQuestion';

function App() {
  return (
   <>
   <Header />
   <Routes>
      <Route index element={<Main />}/>
      <Route path="questions">
          <Route path="allQuestions" element={<AllQuestions />} />
          <Route path=":id" element={<OneQuestion />} />
      </Route>
   </Routes>
   <Footer />
   </>
  );
}

export default App;
