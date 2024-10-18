import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as skillService from "../../services/skill-service";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkills, setEditingSkills] = useState(null);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { toasts, addToast } = useToast();

  const FIELD_ERROR = "Campo requerido";
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
    fetchSkills();
  }, []);

  async function fetchSkills() {
    setIsLoading(true);
    try {
      const skillData = await skillService.findAllRequest();
      setSkills(skillData.data);
    } catch (error) {
      addToast(
        "Erro",
        "Erro ao buscar habilidades. Tente novamente mais tarde.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function insertSkills(data) {
    setIsLoading(true);
    try {
      await skillService.insertRequest(data);
      addToast("Sucesso", "Habilidade adicionada.", "success");
      reset();
      fetchSkills();
    } catch (error) {
      addToast("Erro", "Erro ao salvar habilidade", "danger");
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateSkills(id, data) {
    setIsSending(true);
    try {
      await skillService.updateRequest(id, data);
      addToast("Sucesso", "Habilidade atualizada", "success");
      setEditingSkills(null);
      reset();
      fetchSkills();
    } catch (error) {
      addToast("Erro", "Erro ao atualizar habilidade", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function deleteSkills(id) {
    try {
      await skillService.deleteRequest(id);
      addToast("Sucesso", "Habilidade deletada", "success");
      fetchSkills();
    } catch (error) {
      addToast("Erro", error.response.data.error, "danger");
      console.error("Error: ", error);
    }
  }

  const onSubmit = (data) => {
    if (editingSkills) {
      updateSkills(editingSkills.id, data);
    } else {
      insertSkills(data);
    }
  };

  function handleEditClick(skill) {
    setEditingSkills(skill);
    setValue("name", skill.name);
    setValue("level", skill.level);
    setValue("iconUrl", skill.iconUrl);
    setValue("docUrl", skill.docUrl);
    setValue("showAsAbility", skill.showAsAbility);
    setCollapse(true);
  }

  function handleOpenModal(id) {
    setSkillToDelete(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    deleteSkills(skillToDelete);
    setIsModalOpen(false);
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Habilidades</span>
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
                setEditingSkills(null);
              }}
            >
              +
            </button>
          </div>
          <div className={`collapse mb-5 ${collapse ? "show" : ""}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name">Nome</label>
                  <input
                    id="name"
                    {...register("name", {
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
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="level">Nível</label>
                  <input
                    id="level"
                    {...register("level", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 1,
                        message: "Deve conter ao menos 1 caractere",
                      },
                      maxLength: {
                        value: 3,
                        message: "Deve conter no máximo 3 caracteres",
                      },
                    })}
                  />
                  {errors.level && <p>{errors.level.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="iconUrl">Ícone (URL do devicon)</label>
                  <input
                    id="iconUrl"
                    {...register("iconUrl", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 3,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                    })}
                  />
                  {errors.iconUrl && <p>{errors.iconUrl.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="docUrl">Documentação (URL)</label>
                  <input
                    id="docUrl"
                    {...register("docUrl", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 3,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                    })}
                  />
                  {errors.docUrl && <p>{errors.docUrl.message}</p>}
                </div>
                <div className="col-md-12 d-flex align-items-center">
                  <label htmlFor="showAsAbility">
                    Mostrar como habilidade? (Site)
                  </label>
                  <input
                    id="showAsAbility"
                    type="checkbox"
                    {...register("showAsAbility")}
                    style={{
                      height: "15px",
                      width: "15px",
                      marginBottom: "5px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
              </div>
              <div style={{ maxWidth: "200px" }} className="mt-1">
                <Button value={"Salvar"} type="submit" disabled={isSending} />
              </div>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
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
                        <td className="d-flex gap-3">
                          <Skeleton width={30} height={30} borderRadius={50} />
                          <Skeleton width={30} height={30} borderRadius={50} />
                        </td>
                      </tr>
                    ))
                  : skills.map((skill, index) => (
                      <tr key={skill.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{skill.id}</td>
                        <td>{skill.name}</td>
                        <td className="d-flex gap-3">
                          <Button
                            value={<FaPen size={14} />}
                            classBtn="warning"
                            onClick={() => handleEditClick(skill)}
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
                            onClick={() => handleOpenModal(skill.id)}
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

export default Skills;
