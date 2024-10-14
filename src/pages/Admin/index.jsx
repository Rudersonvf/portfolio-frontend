import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import * as messageService from "../../services/messageService";
import AdminHeader from "../../components/AdminHeader";
import AdminAside from "../../components/AdminAside";

const Admin = () => {
  const [isVisible, setIsVisble] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchUnreadMessages() {
      try {
        const messageData = await messageService.findAllRequest();
        setMessages(messageData.data); // Armazena as mensagens
        const unreadMessages = messageData.data.filter(
          (message) => !message.isRead
        ).length;
        setUnreadCount(unreadMessages); // Atualiza a contagem de não lidas
      } catch (error) {
        console.error("Erro ao buscar dados de mensagens: ", error);
      }
    }

    fetchUnreadMessages();
  }, []);

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
