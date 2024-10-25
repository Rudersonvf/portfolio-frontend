import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as educationService from "../../services/education-service";

const Educations = () => {
  const [educations, setEducations] = useState([]);
  const [editingEducations, setEditingEducations] = useState(null);
  const [educToDelete, setEducToDelete] = useState(null);
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
    fetchEducations();
  }, []);

  async function fetchEducations() {
    setIsLoading(true);
    try {
      const educData = await educationService.findAllRequest();
      setEducations(educData.data);
    } catch (error) {
      addToast(
        "Erro",
        "Erro ao buscar dados. Tente novamente mais tarde.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function insertEducation(data) {
    setIsLoading(true);
    try {
      await educationService.insertRequest(data);
      addToast("Sucesso", "Curso adicionado.", "success");
      reset();
      fetchEducations();
    } catch (error) {
      addToast("Erro", "Erro ao salvar curso", "danger");
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateEducation(id, data) {
    setIsSending(true);
    try {
      await educationService.updateRequest(id, data);
      addToast("Sucesso", "Curso atualizado", "success");
      setEditingEducations(null);
      reset();
      fetchEducations();
    } catch (error) {
      addToast("Erro", "Erro ao atualizar curso", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function deleteEducation(id) {
    try {
      await educationService.deleteRequest(id);
      addToast("Sucesso", "Curso deletado", "success");
      fetchEducations();
    } catch (error) {
      addToast("Erro", error.response.data.error, "danger");
      console.error("Error: ", error);
    }
  }

  const onSubmit = (data) => {
    if (editingEducations) {
      updateEducation(editingEducations.id, data);
    } else {
      insertEducation(data);
    }
  };

  function handleEditClick(educ) {
    setEditingEducations(educ);
    setValue("courseName", educ.courseName);
    setValue("institution", educ.institution);
    setValue("description", educ.description);
    setValue("workload", educ.workload);
    setValue("certificateUrl", educ.certificateUrl);
    setValue("startDate", educ.startDate);
    setValue("endDate", educ.endDate);
    setCollapse(true);
  }

  function handleOpenModal(id) {
    setEducToDelete(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    deleteEducation(educToDelete);
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
            <span className="h2">Educação</span>
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
                setEditingEducations(null);
              }}
            >
              +
            </button>
          </div>
          <div className={`collapse mb-5 ${collapse ? "show" : ""}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="corseName">Nome do curso</label>
                  <input
                    id="courseName"
                    {...register("courseName", {
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
                  {errors.courseName && <p>{errors.courseName.message}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="institution">Instituição</label>
                  <input
                    id="institution"
                    {...register("institution", {
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
                  {errors.institution && <p>{errors.institution.message}</p>}
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label htmlFor="endDate">Data final</label>
                  <input id="endDate" {...register("endDate")} />
                </div>
                <div className="col-md-4">
                  <label htmlFor="workload">Carga horária</label>
                  <input
                    id="workload"
                    {...register("workload", {
                      minLength: {
                        value: 1,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                      maxLength: {
                        value: 80,
                        message: FIELD_ERROR_MAX_LENGTH,
                      },
                    })}
                  />
                  {errors.workload && <p>{errors.workload.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="certificateUrl">Url do certificado</label>
                  <input
                    id="certificateUrl"
                    {...register("certificateUrl", {
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
                  {errors.certificateUrl && (
                    <p>{errors.certificateUrl.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    {...register("description", {
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
                  <th scope="col">Nome</th>
                  <th scope="col">Instituição</th>
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
                          <Skeleton width={150} height={26} />
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
                  : educations.map((education, index) => (
                      <tr key={education.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{education.id}</td>
                        <td>{education.courseName}</td>
                        <td>{education.institution}</td>
                        <td className="d-flex gap-3">
                          <Button
                            value={<FaPen size={14} />}
                            classBtn="warning"
                            onClick={() => handleEditClick(education)}
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
                            onClick={() => handleOpenModal(education.id)}
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

export default Educations;
