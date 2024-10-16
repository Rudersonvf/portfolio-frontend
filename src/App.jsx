import "./sass/app.scss";
import "react-loading-skeleton/dist/skeleton.css";

import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import Admin from "./pages/Admin";
import { AuthProvider } from "./context/auth-provider";
import Categories from "./pages/Admin/Categories";
import Client from "./pages/Client";
import Educations from "./pages/Admin/Educations";
import Experiences from "./pages/Admin/Experiences";
import Forbidden from "./pages/Errors/Forbidden";
import Login from "./pages/Login";
import Messages from "./pages/Admin/Messages";
import NotFound from "./pages/Errors/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Admin/Projects";
import Skills from "./pages/Admin/Skills";
import { history } from "./lib/history";

function App() {
  return (
    <AuthProvider>
      <HistoryRouter history={history}>
        <Routes>
          <Route index path="/" element={<Client />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route path="projects" element={<Projects />} />
            <Route path="educations" element={<Educations />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="skills" element={<Skills />} />
            <Route path="categories" element={<Categories />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </HistoryRouter>
    </AuthProvider>
  );
}

export default App;
