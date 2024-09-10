import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
