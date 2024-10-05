import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import "./sass/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Admin from "./pages/Admin";
import Categories from "./pages/Admin/Categories";
import Educations from "./pages/Admin/Educations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Client />} />
        <Route path="/admin/" element={<Admin />}>
          <Route path="categories" element={<Categories />} />
          <Route path="educations" element={<Educations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
//teste
export default App;
