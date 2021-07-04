import "./App.css";
import { Route } from "react-router-dom";

import Header from "./component/Header";
//page
import Home from "./pages/Home";
import login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Postproduct from "./pages/Postproduct";
import Yourproduct from "./pages/Yourproduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Editproduct from "./pages/Editproduct";
import Topproduct from "./pages/Topproduct";
import Discountproduct from "./pages/Discountproduct";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={login} />
      <Route path="/register" component={Register} />
      <Route path="/product/:id" component={Product} />
      <Route path="/postproduct" component={Postproduct} />
      <Route path="/yourproduct" component={Yourproduct} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/editproduct/:id" component={Editproduct} />
      <Route path="/topproduct" component={Topproduct} />
      <Route path="/discountproduct" component={Discountproduct} />
    </div>
  );
}

export default App;
