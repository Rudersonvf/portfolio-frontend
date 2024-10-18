import { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";

import AdminAside from "../../components/AdminAside";
import AdminHeader from "../../components/AdminHeader";
import * as authService from "../../services/auth-service";
import * as messageService from "../../services/message-service";

const Admin = () => {
  const [isVisible, setIsVisble] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchUnreadMessages();
  }, [unreadCount]);

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  async function fetchUnreadMessages() {
    try {
      const messageData = await messageService.findAllRequest();
      setMessages(messageData.data);
      const unreadMessages = messageData.data.filter(
        (message) => !message.isRead
      ).length;
      setUnreadCount(unreadMessages);
    } catch (error) {
      console.error("Erro ao buscar dados de mensagens: ", error);
    }
  }

  function handleToggleAside() {
    setIsVisble(!isVisible);
  }

  return (
    <div className="d-flex">
      {isVisible && <AdminAside />}
      <div className="w-100">
        <AdminHeader
          onToggleAside={handleToggleAside}
          unreadCount={unreadCount}
        />
        <Outlet context={{ messages, setUnreadCount }} />
      </div>
    </div>
  );
};

export default Admin;
