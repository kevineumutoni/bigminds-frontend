import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import PasswordReset from './PasswordReset';
import ResetEmail from './ResetEmail';
import SignIn from './SignIn';
import TopBar from "./shared-components/TopBar";
import SideBar from "./shared-components/SideBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Orders from './Orders';
import TeamTable from './Team/index';
import ProductsPage from "./Products/index.js";
import Contacts from './Contacts/index';
import Payment from './Payment';
import Dashboard from './Dashboard/index.jsx'; 


function App() {
  const [theme, colorMode] = useMode();
  const [isSideBar, setIsSideBar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    navigate('/home'); 
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <SideBar isSideBar={isSideBar} />}
          <main className="content">
            {isAuthenticated && <TopBar setIsSideBar={setIsSideBar} />}
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated
                    ? <Navigate to="/home" />
                    : <SignIn onSignInSuccess={handleSignInSuccess} />
                }
              />
              <Route
                path="/home"
                element={
                  isAuthenticated
                    ? <Dashboard key={location.pathname} />
                    : <Navigate to="/" />
                }
              />
              <Route
                path="/products"
                element={
                  isAuthenticated
                    ? <ProductsPage />
                    : <Navigate to="/" />
                }
              />
              <Route
                path="/contacts"
                element={
                  isAuthenticated
                    ? <Contacts />
                    : <Navigate to="/" />
                }
              />
              <Route
                path="/team"
                element={
                  isAuthenticated
                    ? <TeamTable />
                    : <Navigate to="/" />
                }
              />
              <Route
                path="/payment"
                element={
                  isAuthenticated
                    ? <Payment />
                    : <Navigate to="/" />
                }
              />
              <Route path="/resetemail" element={<ResetEmail />} />
              <Route path="/passwordreset" element={<PasswordReset />} />
              <Route
                path="/orders"
                element={
                  isAuthenticated
                    ? <Orders />
                    : <Navigate to="/" />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;



