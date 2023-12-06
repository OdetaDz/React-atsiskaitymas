import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/UI/footer/Footer';
import Header from './components/UI/header/Header';
import Main from './components/pages/main/Main';
import AllQuestions from './components/pages/allQuestions/AllQuestions';
import OneQuestion from './components/pages/oneQuestion/OneQuestion';
import Register from './components/pages/register/Register';
import LogIn from './components/pages/logIn/LogIn';
import AddQuestion from './components/pages/addQuestion/AddQuestion';

function App() {
  return (
   <>
   <Header />
   <Routes>
      <Route index element={<Main />}/>
      <Route path="questions">
          <Route path="allQuestions" element={<AllQuestions />} />
          <Route path=":id" element={<OneQuestion />} />
          <Route path="addNew" element={<AddQuestion />}/>
      </Route>
      <Route path="/user">
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Register />} />

      </Route>
   </Routes>
   <Footer />
   </>
  );
}

export default App;
