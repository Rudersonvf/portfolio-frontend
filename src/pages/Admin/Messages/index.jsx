import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../../../components/Button";
import { formatDmy } from "../../../utils/dateFormat";
import { FaRegTrashCan, FaEnvelope } from "react-icons/fa6";
import styles from "./styles.module.scss";
import { useOutletContext } from "react-router-dom";

const Messages = () => {
  const { messages, setUnreadCount } = useOutletContext();
  const [openMessage, setOpenMessage] = useState(false);
  const [collapse, setCollapse] = useState(false);

  function handleOpenClick(message) {
    setCollapse(!collapse);
    setOpenMessage(message);
  }

  function handleCollapseClick() {
    setCollapse(true);
  }

  function handleMessageStatusChange(id, isChecked) {
    console.log("entrou na func handleReadChange", id, " / ", isChecked);
    // Aqui chama o serviço para atualizar o status de leitura na API
    const updatedMessages = messages.map((msg) => {
      if (msg.id === id) {
        return { ...msg, isRead: isChecked };
      }
      return msg;
    });
    const unreadMessages = updatedMessages.filter(
      (message) => !message.isRead
    ).length;
    setUnreadCount(unreadMessages);
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Mensagens</span>
          </div>
          <div className="collapse mb-5" id="collapseCat">
            <div className={styles["message-container"]}>
              <div className="row g-3">
                <div className="col-12">{formatDmy(openMessage.sendAt)}</div>
                <div className="col-md-6">{openMessage.name}</div>
                <div className="col-md-6">{openMessage.email}</div>
                <div className={styles["message-body"]}>
                  <span>{openMessage.subject}</span>
                  <hr />
                  <p>{openMessage.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Data</th>
                  <th scope="col">Lido</th>
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
                        <td>
                          <input
                            type="checkbox"
                            checked={message.isRead}
                            onChange={(event) =>
                              handleMessageStatusChange(
                                message.id,
                                event.target.checked
                              )
                            }
                          />
                        </td>
                        <td className="d-flex gap-3">
                          <div
                            style={{ width: "30px", height: "30px" }}
                            className="btn btn-success"
                            data-bs-toggle="collapse"
                            data-bs-target={collapse ? "" : "#collapseCat"}
                            aria-expanded="false"
                            aria-controls="collapseCat"
                            onClick={handleCollapseClick}
                          >
                            <Button
                              value={<FaEnvelope size={14} />}
                              classBtn="success"
                              onClick={() => handleOpenClick(message)}
                              shape={"circle"}
                              style={{
                                width: "30px",
                                height: "30px",
                                padding: "8px",
                              }}
                            />
                          </div>
                          <Button
                            value={<FaRegTrashCan size={14} />}
                            classBtn="danger"
                            //onClick={handleDeleteClick}
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
    </main>
  );
};

export default Messages;
