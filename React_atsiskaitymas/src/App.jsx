import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/UI/footer/Footer';
import Header from './components/UI/header/Header';
import Main from './components/pages/main/Main';

function App() {
  return (
   <>
   <Header />
   <Routes>
      <Route index element={<Main />}/>
   </Routes>
   <Footer />
   </>
  );
}

export default App;
