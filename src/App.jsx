import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { AppRoute } from "./utils/routes";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={AppRoute.LOGIN} element={<Login />} />
            <Route path={AppRoute.HOME} element={<Home />} />
            <Route path={AppRoute.EDITOR} element={<Editor />} />
            <Route path={AppRoute.NOTFOUND} element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
