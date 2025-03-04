
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './alert'
import ReportForm from "./form";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Alert />} />
        <Route path="/form" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>

    

  )
}

export default App
