import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Analyze from "./pages/Analyze";
import SOS from "./pages/SOS";
import SafetyWord from "./pages/SafetyWord";
import Contacts from "./pages/Contacts";
import Location from "./pages/Location";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            <Route path="/home" element={<Home />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/safety-word" element={<SafetyWord />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/location" element={<Location />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/security" element={<Security />} />

          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}