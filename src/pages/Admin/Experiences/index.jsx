import * as experienceService from "../../../services/experienceService";

import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";

import Button from "../../../components/Button";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [editingExperiences, setEditingExperiences] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const experienceData = await experienceService.findAllRequest();
        setExperiences(experienceData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados ", error);
      }
    }

    fetchCategories();
  }, []);

  const FIELD_ERROR = "Campo requirido";
  const FIELD_ERROR_MIN_LENGTH = "Deve conter ao menos 3 caracteres";
  const FIELD_ERROR_MAX_LENGTH = "Deve conter no máximo 80 caracteres";

  const onSubmit = (data) => {
    if (editingExperiences) {
      console.log("Editando categoria: ", data);
      // Lógica para editar a categoria
    } else {
      console.log("Criando nova categoria: ", data);
      // Lógica para criar nova categoria
    }
    reset();
    setEditingExperiences(null);
  };

  function handleEditClick(experience) {
    setEditingExperiences(experience);
    setValue("position", experience.position);
    setValue("company", experience.company);
    setValue("startDate", experience.startDate);
    setValue("endDate", experience.endDate);
    setValue("description", experience.description);
  }

  function handleDeleteClick() {
    console.log("CLICOU PARA APAGAR");
  }

  function handleCollapseClick() {
    console.log("entrou na func", collapse);
    setCollapse(true);
  }

  function handleCollapseResetClick() {
    setCollapse(!collapse);
    reset();
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
              data-bs-toggle="collapse"
              data-bs-target="#collapseCat"
              aria-expanded="false"
              aria-controls="collapseCat"
              onClick={handleCollapseResetClick}
            >
              +
            </button>
          </div>
          <div className="collapse mb-5" id="collapseCat">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="position">Cargo</label>
                  <input
                    id="company"
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
                        value: 1,
                        message: FIELD_ERROR_MIN_LENGTH,
                      },
                      maxLength: {
                        value: 3,
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
                  <input
                    id="endDate"
                    {...register("endDate", {
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
                  {errors.endDate && <p>{errors.endDate.message}</p>}
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
                <Button value={"cadastrar"} type="submit" />
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
                  : experiences.map((experience, index) => (
                      <tr key={experience.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{experience.id}</td>
                        <td>{experience.company}</td>
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
                          </div>
                          <Button
                            value={<FaRegTrashCan size={14} />}
                            classBtn="danger"
                            onClick={handleDeleteClick}
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

export default Experiences;
