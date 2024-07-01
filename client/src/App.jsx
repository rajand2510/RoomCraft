import { Routes ,Route} from 'react-router-dom';
import './App.css';
import CubeConatainer from "./components/Cube/CubeConatainer";
import XrCubeConatainer from './components/xr-cube/xrCubeConatainer';
import XrHitModelConatainer from './components/xr-hit-model/XrHitModelConatainer';
//import ProductList from './components/xr-hit-model/ProductList';

import Home from './components/homecontainer/Home';
import Login from './components/Userauthcontainer/Login';
import Signup from './components/Userauthcontainer/Signup';
//import MainProduct from './components/product/MainProduct';
import Checkout from './components/Userauthcontainer/Checkout';
function App() {
  return (
<Routes>
<Route path="/" element={<Home />} />
<Route path="/products" element={<Checkout />} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="/cube" element={<CubeConatainer />}/>
<Route path="/xr-cube" element={<XrCubeConatainer />}/>
<Route path="/xr-hit-cube" element={<XrCubeConatainer />}/>
<Route path="/xr" element={<XrHitModelConatainer />}/>
</Routes>

  )
}

export default App
