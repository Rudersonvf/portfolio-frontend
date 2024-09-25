import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import "./sass/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}
//teste
export default App;
