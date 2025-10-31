import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { AppRoute } from "./utils/routes";

import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import { ThemeProvider } from "./context/ThemeContext";
import DocsEditor from "./pages/docs/DocsEditor";
import SpreadsheetsHome from "./pages/spreadsheets/SpreadsheetsHome";
import SpreadsheetsEditor from "./pages/spreadsheets/SpreadsheetsEditor";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={AppRoute.LOGIN} element={<Login />} />

            <Route path={AppRoute.HOME} element={<Home />} />
            <Route path={AppRoute.DOCS_EDITOR} element={<DocsEditor />} />

            <Route path={AppRoute.SPREADSHEETS} element={<SpreadsheetsHome />} />
            <Route path={AppRoute.SPREADSHEETS_EDITOR} element={<SpreadsheetsEditor />} />

            <Route path={AppRoute.NOTFOUND} element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
