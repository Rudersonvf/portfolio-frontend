import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as experienceService from "../../services/experience-service";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [editingExperiences, setEditingExperiences] = useState(null);
  const [expToDelete, setExpToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { toasts, addToast } = useToast();

  const FIELD_ERROR = "Campo requirido";
  const FIELD_ERROR_MIN_LENGTH = "Deve conter ao menos 3 caracteres";
  const FIELD_ERROR_MAX_LENGTH = "Deve conter no máximo 80 caracteres";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    setIsLoading(true);
    try {
      const expData = await experienceService.findAllRequest();
      setExperiences(expData.data);
    } catch (error) {
      addToast(
        "Erro",
        "Erro ao buscar experiências. Tente novamente mais tarde.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function insertExperience(data) {
    setIsLoading(true);
    try {
      await experienceService.insertRequest(data);
      addToast("Sucesso", "Experiência adicionada.", "success");
      reset();
      fetchExperiences();
    } catch (error) {
      addToast("Erro", "Erro ao salvar experiência", "danger");
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateExperience(id, data) {
    setIsSending(true);
    try {
      await experienceService.updateRequest(id, data);
      addToast("Sucesso", "Experiência atualizada", "success");
      setEditingExperiences(null);
      reset();
      fetchExperiences();
    } catch (error) {
      addToast("Erro", "Erro ao atualizar experiência", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function deleteExperience(id) {
    try {
      await experienceService.deleteRequest(id);
      addToast("Sucesso", "Experiência deletada", "success");
      fetchExperiences();
    } catch (error) {
      addToast("Erro", error.response.data.error, "danger");
      console.error("Error: ", error);
    }
  }

  const onSubmit = (data) => {
    if (editingExperiences) {
      updateExperience(editingExperiences.id, data);
    } else {
      insertExperience(data);
    }
  };

  function handleEditClick(exp) {
    setEditingExperiences(exp);
    setValue("company", exp.company);
    setValue("description", exp.description);
    setValue("endDate", exp.endDate);
    setValue("startDate", exp.startDate);
    setValue("position", exp.position);
    setCollapse(true);
  }

  function handleOpenModal(id) {
    setExpToDelete(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    deleteExperience(expToDelete);
    setIsModalOpen(false);
  }

  function handleInput(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Experiências</span>
            <button
              style={{
                borderRadius: "50%",
                width: "50px",
                fontSize: "30px",
                fontWeight: "700",
              }}
              className="btn btn-success"
              onClick={() => {
                setCollapse((prev) => !prev);
                reset();
                setEditingExperiences(null);
              }}
            >
              +
            </button>
          </div>
          <div className={`collapse mb-5 ${collapse ? "show" : ""}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="position">Cargo</label>
                  <input
                    id="position"
                    {...register("position", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 3,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                      maxLength: {
                        value: 80,
                        message: FIELD_ERROR_MAX_LENGTH,
                      },
                    })}
                  />
                  {errors.position && <p>{errors.position.message}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="company">Empresa</label>
                  <input
                    id="company"
                    {...register("company", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 3,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                      maxLength: {
                        value: 80,
                        message: FIELD_ERROR_MAX_LENGTH,
                      },
                    })}
                  />
                  {errors.company && <p>{errors.company.message}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="startDate">Data inicio</label>
                  <input
                    id="startDate"
                    {...register("startDate", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 3,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                      maxLength: {
                        value: 80,
                        message: FIELD_ERROR_MAX_LENGTH,
                      },
                    })}
                  />
                  {errors.startDate && <p>{errors.startDate.message}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate">Data final</label>
                  <input id="endDate" {...register("endDate")} />
                </div>
                <div>
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 15,
                        message: "Deve conter ao menos 15 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message: "Deve conter no máximo 500 caracteres",
                      },
                    })}
                    style={{ overflow: "hidden", resize: "none" }}
                    onInput={handleInput}
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
              </div>
              <div style={{ maxWidth: "200px" }} className="mt-1">
                <Button value={"salvar"} type="submit" disabled={isSending} />
              </div>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">id</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <Skeleton width={20} height={26} />
                        </th>
                        <td>
                          <Skeleton width={50} height={26} />
                        </td>
                        <td>
                          <Skeleton width={50} height={26} />
                        </td>
                        <td>
                          <Skeleton width={150} height={26} />
                        </td>
                        <td className="d-flex gap-3">
                          <Skeleton width={30} height={30} borderRadius={50} />
                          <Skeleton width={30} height={30} borderRadius={50} />
                        </td>
                      </tr>
                    ))
                  : experiences.map((experience, index) => (
                      <tr key={experience.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{experience.id}</td>
                        <td>{experience.company}</td>
                        <td>{experience.position}</td>
                        <td className="d-flex gap-3">
                          <Button
                            value={<FaPen size={14} />}
                            classBtn="warning"
                            onClick={() => handleEditClick(experience)}
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
                            onClick={() => handleOpenModal(experience.id)}
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
          title="Deletar Habilidade"
          message={
            <>
              Você tem certeza que deseja deletar a habilidade?
              <br />
              Esta ação será irreversível!
            </>
          }
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          loading={isLoading}
        />
      )}
      <ToastContainer toasts={toasts} />
    </main>
  );
};

export default Experiences;
