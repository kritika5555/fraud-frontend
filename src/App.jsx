
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './alert'
import ReportForm from "./form";
import Home from "./home";
import NoFraudAlert from "./sucess";
import Login from "./login";
import Register from "./register";
import PaymentPage from "./payment";
import AdminLayout from "./admin";
import Users from './users';
import FraudReports from './admin_fraud_report';
import Dashboard from "./dashboard";
import ProtectedRoute from "./routes/protected";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        //if user is not logged in, they cannot access home pages, thats why wrapped inside protectedroute
        <Route element={<ProtectedRoute />} >
          <Route path="/home" element={<Home />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/success" element={<NoFraudAlert />} />

          <Route path="/form" element={<ReportForm />} />
        </Route>
        <Route path="/payment" element={<PaymentPage />} />

        // admin part is below
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/fraud-reports" element={<FraudReports />} />

      </Routes>
    </BrowserRouter >



  );
}

export default App
