
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../../components/Button";
import * as skillService from "../../../services/skillService";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkills, setEditingSkills] = useState(null);
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
        const categoryData = await skillService.findAllRequest();
        setSkills(categoryData.data);
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
    if (editingSkills) {
      console.log("Editando categoria: ", data);
      // Lógica para editar a categoria
    } else {
      console.log("Criando nova categoria: ", data);
      // Lógica para criar nova categoria
    }
    reset();
    setEditingSkills(null);
  };

  function handleEditClick(skill) {
    setEditingSkills(skill);
    setValue("name", skill.name);
    setValue("level", skill.level);
    setValue("icon", skill.icon);
    setValue("docUrl", skill.docUrl);
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
                  <label htmlFor="level">Level</label>
                  <input
                    id="level"
                    {...register("level", {
                      required: FIELD_ERROR,
                      minLength: {
                        value: 1,
                        message: "Deve conter ao menos 1 caracteres",
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
                  <label htmlFor="icon">Icone (url do devicon)</label>
                  <input
                    id="icon"
                    {...register("icon", {
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
                  {errors.icon && <p>{errors.icon.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="docUrl">Documentação (url)</label>
                  <input
                    id="docUrl"
                    {...register("docUrl", {
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
                  {errors.docUrl && <p>{errors.docUrl.message}</p>}
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
                              onClick={() => handleEditClick(skill)}
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

export default Skills;
