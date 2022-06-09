
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Product from './components/Product';
import Exam from './components/Exam';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Exam />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  )
}

export default App;
