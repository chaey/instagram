import "./Main_components/Nav/NavBar.css";
import "./Main_components/Side/SideBar.css";
import "./Main_components/Acti/Activity.css";
import "./Main_components/post/Post.css";
import "./Login_components/Login.css";
import "./Sign_components/Sign.css";


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login_components/Login";
import Real from "./Main_components/Real";
import Sign from "./Sign_components/Sign";
// import Img from "./image_Post/img";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/img" element={<Img />}></Route> */}
          <Route path="/main" element={<Real />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

