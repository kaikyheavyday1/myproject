import './App.css';
import {Route} from "react-router-dom"

import Header from './component/Header';
//page
import Home from "./pages/Home"
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path ="/" component={Home}/>
      <Route path ="/register" component={Register}/>
    </div>
  );
}

export default App;
