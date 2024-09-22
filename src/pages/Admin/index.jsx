import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminAside from "../../components/AdminAside";
import { useState } from "react";

const Admin = () => {
  const [isVisible, setIsVisble] = useState(true);

  function handleToggleAside() {
    console.log("handle toogle aside executado");
    setIsVisble(!isVisible);
  }

  return (
    <div className="d-flex">
      {isVisible && <AdminAside />}
      <div className="w-100">
        <AdminHeader onToggleAside={handleToggleAside} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
