import { Routes ,Route} from 'react-router-dom';
import './App.css';
import XrHitModelConatainer from './components/xr-hit-model/XrHitModelConatainer';
import Home from './components/homecontainer/Home';
import Login from './components/Userauthcontainer/Login';
import Signup from './components/Userauthcontainer/Signup';
import Checkout from './UserComponents/Checkout';
import MainProduct from './components/product/MainProduct';
import MyOrder from './UserComponents/MyOrder';

function App() {
  return (
<Routes>
<Route path="/" element={<Home />} />
<Route path="/Checkout" element={<Checkout />} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="products" element={<MainProduct/>} />
<Route path="/xr" element={<XrHitModelConatainer />}/>
<Route path="/myorder" element={<MyOrder/>} />
</Routes>
  )
}

export default App
