import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as projectService from "../../../services/projectService";
import * as categoryService from "../../../services/categoryService";
import * as skillService from "../../../services/skillService";
import Button from "../../../components/Button";
import Skeleton from "react-loading-skeleton";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import styles from "./styles.module.scss";
import ImageField from "../../../components/ImageField";
import ImageCard from "../../../components/ImageCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
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
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const projectData = await projectService.findAllSummaryRequest();
        setProjects(projectData.data);
        const categoryData = await categoryService.findAllRequest();
        setAllCategories(categoryData.data);
        const technologyData = await skillService.findAllRequest();
        setAllTechnologies(technologyData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados ", error);
      }
    }

    fetchProjects();
  }, []);

  const FIELD_ERROR = "Campo requirido";
  const FIELD_ERROR_MIN_LENGTH = "Deve conter ao menos 3 caracteres";
  const FIELD_ERROR_MAX_LENGTH = "Deve conter no máximo 80 caracteres";

  const onSubmit = (data) => {
    if (editingProject) {
      console.log("Editando categoria: ", data);
      // Lógica para editar a categoria
    } else {
      console.log("Criando nova categoria: ", data);
      // Lógica para criar nova categoria
    }
    reset();
    setEditingProject(null);
  };

  function handleEditClick(project) {
    setEditingProject(project);
    setValue("projectName", project.projectName);
    setValue("description", project.description);
    setValue("gitUrl", project.gitUrl);
    setValue("liveUrl", project.liveUrl);
    setSelectedCategories(project.categories);
    setSelectedTechnologies(project.technologies);
    setAllImages(project.images);
  }

  function handleDeleteClick() {
    console.log("CLICOU PARA APAGAR");
  }

  function handleCollapseClick() {
    setCollapse(true);
  }

  function handleCollapseResetClick() {
    setCollapse(!collapse);
    reset();
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setAllImages([]);
  }

  function handleInput(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleCategoryChange(event) {
    if (event.target.value === "") {
      return;
    }

    const categoryId = event.target.value;
    const category = selectedCategories.some(
      (cat) => cat.id === parseInt(categoryId)
    );
    if (!category) {
      const category = allCategories.find(
        (cat) => cat.id === parseInt(categoryId)
      );
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function handleCategoryDeleteClick(id) {
    setSelectedCategories(selectedCategories.filter((cat) => cat.id !== id));
  }

  function handleTechnologyChange(event) {
    if (event.target.value === "") {
      return;
    }

    const technologyId = event.target.value;
    const technology = selectedTechnologies.some(
      (tec) => tec.id === parseInt(technologyId)
    );
    if (!technology) {
      const technology = allTechnologies.find(
        (tec) => tec.id === parseInt(technologyId)
      );
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
  }

  function handleTechnologyDeleteClick(id) {
    setSelectedTechnologies(
      selectedTechnologies.filter((tec) => tec.id !== id)
    );
  }

  function handleImageUpload(image) {
    setAllImages((prevImages) => [...prevImages, image]);
  }

  function handleImageDelete(imageLink) {
    setAllImages((prevImages) =>
      prevImages.filter((image) => image !== imageLink)
    );
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Projetos</span>
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
                <div className="col-md-12">
                  <label htmlFor="projectName">Nome do projeto</label>
                  <input
                    id="projectName"
                    {...register("projectName", {
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
                  {errors.projectName && <p>{errors.projectName.message}</p>}
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
                <div className="col-md-12">
                  <label htmlFor="gitUrl">Link do repositório</label>
                  <input
                    id="gitUrl"
                    {...register("gitUrl", {
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
                  {errors.gitUrl && <p>{errors.gitUrl.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="liveUrl">Link online </label>
                  <input
                    id="liveUrl"
                    {...register("liveUrl", {
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
                  {errors.liveUrl && <p>{errors.liveUrl.message}</p>}
                </div>
                <div className="col-md-12">
                  <ImageField onUploadImage={handleImageUpload} />
                  <div className="d-flex gap-4 mt-3 mb-3">
                    {allImages.map((image, index) => (
                      <ImageCard
                        key={index}
                        imageLink={image}
                        onImageDelete={handleImageDelete}
                      />
                    ))}
                  </div>
                </div>

                {/* Category select */}
                <div className="col-md-6">
                  <label htmlFor="categories">Categorias</label>
                  <select
                    onClick={handleCategoryChange}
                    id="categories"
                    {...register("categories")}
                  >
                    <option value="">Selecione uma categoria</option>
                    {allCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categories && <p>{errors.categories.message}</p>}
                </div>
                <div className="col-md-6 d-flex flex-wrap align-items-end gap-3">
                  {selectedCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`${styles["category-card"]}`}
                    >
                      <span>{category.name}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-bg btn-card"
                        onClick={() => handleCategoryDeleteClick(category.id)}
                      >
                        <span>x</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Technology select */}
                <div className="col-md-6">
                  <label htmlFor="technologies">Tecnologias</label>
                  <select
                    onClick={handleTechnologyChange}
                    id="technologies"
                    {...register("technologies")}
                  >
                    <option value="">Selecione uma tecnologia</option>
                    {allTechnologies.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.technologies && <p>{errors.technologies.message}</p>}
                </div>
                <div className="col-md-6 d-flex flex-wrap align-items-end gap-3">
                  {selectedTechnologies.map((category) => (
                    <div
                      key={category.id}
                      className={`${styles["category-card"]}`}
                    >
                      <span>{category.name}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-bg btn-card"
                        onClick={() => handleTechnologyDeleteClick(category.id)}
                      >
                        <span>x</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ maxWidth: "200px" }} className="mt-1">
                <Button value={"salvar"} type="submit" />
              </div>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">id</th>
                  <th scope="col">Nome do projeto</th>
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
                  : projects.map((project, index) => (
                      <tr key={project.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{project.id}</td>
                        <td>{project.projectName}</td>
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
                              onClick={() => handleEditClick(project)}
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

export default Projects;
