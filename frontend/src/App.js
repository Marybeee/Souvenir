import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";


function App() {
  return (
    <div className = "App">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" excat element = {<Home/>}/>
          <Route path = "/Menu" excat element = {<Gallery/>} />
          <Route path = "/contact" excat element = {<Contact/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
