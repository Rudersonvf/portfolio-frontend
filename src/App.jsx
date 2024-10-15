import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import "./sass/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Admin from "./pages/Admin";
import Categories from "./pages/Admin/Categories";
import Educations from "./pages/Admin/Educations";
import Skills from "./pages/Admin/Skills";
import Experiences from "./pages/Admin/Experiences";
import Projects from "./pages/Admin/Projects";
import Messages from "./pages/Admin/Messages";
import NotFound from "./pages/Error/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Client />} />
        <Route path="/admin/" element={<Admin />}>
          <Route path="projects" element={<Projects />} />
          <Route path="educations" element={<Educations />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="skills" element={<Skills />} />
          <Route path="categories" element={<Categories />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
//teste
export default App;
