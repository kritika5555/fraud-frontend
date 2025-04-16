
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './alert'
import ReportForm from "./form";
import Home from "./home";
import NoFraudAlert from "./sucess";
import Login from "./login";
import Register from "./register";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/success" element={<NoFraudAlert />} />
        <Route path="/form" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>



  )
}

export default App
