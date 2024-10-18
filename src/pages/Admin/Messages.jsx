import { useState } from "react";

import { FaEnvelope, FaEnvelopeOpen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import { useOutletContext } from "react-router-dom";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as messageService from "../../services/message-service";
import { formatDmy } from "../../utils/dateFormat";

import "../../sass/pages/messages.scss";

const Messages = () => {
  const { messages, setUnreadCount } = useOutletContext();
  const [openMessage, setOpenMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toasts, addToast } = useToast();

  async function readMessage(id) {
    try {
      const messageData = await messageService.findByIdRequest(id);
      setUnreadCount((prevCount) => prevCount - 1);
      setOpenMessage(messageData.data);

      if (!collapse) {
        setCollapse(true);
      }

      const messageDiv = document.getElementById("message");
      if (messageDiv) {
        messageDiv.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      addToast("Erro", "Erro ao buscar mensagem", "danger");
      console.error("Error: ", error);
    }
  }

  async function deleteMessage(id) {
    try {
      await messageService.deleteRequest(id);
      setUnreadCount((prevCount) => prevCount - 1);
      addToast("Sucesso", "Mensagem excluída com sucesso", "success");
      setIsModalOpen(false);
    } catch (error) {
      addToast("Erro", "Erro ao excluir mensagem", "danger");
      console.error("Error: ", error);
    }
  }

  function handleOpenClick(id) {
    readMessage(id);
  }

  function handleDeleteClick(id) {
    setIsModalOpen(true);
    setMessageToDelete(id);
  }

  function handleConfirmDelete() {
    deleteMessage(messageToDelete);
    setCollapse(false);
    setIsModalOpen(false);
  }

  return (
    <main>
      <section>
        <div className="container" id="message">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Mensagens</span>
          </div>
          <div className={`collapse mb-5 ${collapse ? "show" : ""}`}>
            {openMessage && (
              <div className="message-container">
                <div className="row g-3">
                  <div className="col-12">{formatDmy(openMessage.sendAt)}</div>
                  <div className="col-md-6">{openMessage.name}</div>
                  <div className="col-md-6">{openMessage.email}</div>
                  <div className="message-body">
                    <span>{openMessage.subject}</span>
                    <hr />
                    <p>{openMessage.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Data</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {!messages
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <Skeleton width={20} height={26} />
                        </th>
                        <td>
                          <Skeleton width={150} height={26} />
                        </td>
                        <td>
                          <Skeleton width={350} height={26} />
                        </td>
                        <td>
                          <Skeleton width={100} height={26} />
                        </td>
                        <td>
                          <Skeleton width={15} height={15} />
                        </td>
                        <td className="d-flex gap-3">
                          <Skeleton width={30} height={30} borderRadius={50} />
                          <Skeleton width={30} height={30} borderRadius={50} />
                        </td>
                      </tr>
                    ))
                  : messages.map((message, index) => (
                      <tr key={message.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{message.name}</td>
                        <td>{message.subject}</td>
                        <td>{formatDmy(message.sendAt)}</td>
                        <td className="d-flex gap-3">
                          <Button
                            value={
                              message.isRead ? (
                                <FaEnvelopeOpen size={14} />
                              ) : (
                                <FaEnvelope size={14} />
                              )
                            }
                            classBtn={message.isRead ? "success" : "warning"}
                            onClick={() => handleOpenClick(message.id)}
                            shape={"circle"}
                            style={{
                              width: "30px",
                              height: "30px",
                              padding: "8px",
                            }}
                          />
                          <Button
                            value={<FaRegTrashCan size={14} />}
                            classBtn="danger"
                            onClick={() => handleDeleteClick(message.id)}
                            shape={"circle"}
                            style={{
                              width: "30px",
                              height: "30px",
                              padding: "8px",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Modal
          title="Deletar Mensagem"
          message={
            <>
              Você tem certeza que deseja deletar a mensagem?
              <br />
              Esta ação será irreversível!
            </>
          }
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ToastContainer toasts={toasts} />
    </main>
  );
};

export default Messages;
