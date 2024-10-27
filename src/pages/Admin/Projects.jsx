import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";
import ImageCard from "../../components/ImageCard";
import ImageField from "../../components/ImageField";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as categoryService from "../../services/category-service";
import * as projectService from "../../services/project-service";
import * as skillService from "../../services/skill-service";

import "../../sass/pages/projects.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingById, setIsLoadingById] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    fetchAllProjects();
    fetchAllCategories();
    fetchAllTechnologies();
  }, []);

  async function fetchAllProjects() {
    setIsLoading(true);
    try {
      const projectData = await projectService.findAllSummaryRequest();
      setProjects(projectData.data);
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

  async function fetchAllCategories() {
    setIsLoading(true);
    try {
      const categoryData = await categoryService.findAllRequest();
      setAllCategories(categoryData.data);
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

  async function fetchAllTechnologies() {
    setIsLoading(true);
    try {
      const technologyData = await skillService.findAllRequest();
      setAllTechnologies(technologyData.data);
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

  async function findProjectById(id) {
    setIsLoadingById(true);
    try {
      return await projectService.findByIdRequest(id);
    } catch (error) {
      addToast(
        "Erro",
        "Erro ao buscar dados. Tente novamente mais tarde.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsLoadingById(false);
    }
  }

  async function insertProject(data) {
    setIsSending(true);
    try {
      await projectService.insertRequest(data);
      addToast("Sucesso", "Projeto adicionado.", "success");
      handleDataReset();
      setCollapse(false);
      fetchAllProjects();
    } catch (error) {
      addToast("Erro", "Erro ao salvar projeto", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function updateProject(id, data) {
    setIsSending(true);
    try {
      await projectService.updateRequest(id, data);
      addToast("Sucesso", "Projeto atualizado", "success");
      setEditingProject(null);
      handleDataReset();
      setCollapse(false);
      fetchAllProjects();
    } catch (error) {
      addToast("Erro", "Erro ao atualizar projeto", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function deleteProject(id) {
    setIsSending(true);
    try {
      await projectService.deleteRequest(id);
      addToast("Sucesso", "Projeto deletado", "success");
      setProjectToDelete(null);
      handleDataReset();
      setCollapse(false);
      fetchAllProjects();
    } catch (error) {
      addToast("Erro", "Erro ao deletar projeto", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  const onSubmit = (data) => {
    data.categories = selectedCategories.map((category) => ({
      id: category.id,
    }));
    data.skills = selectedTechnologies.map((technology) => ({
      id: technology.id,
    }));
    data.images = allImages;

    console.log("saudgayusdgyasgdyagsdy", allImages);

    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      console.log("Criando nova categoria: ", data);
      insertProject(data);
    }
  };

  async function handleEditClick(id) {
    const response = await findProjectById(id);
    const projectData = response.data;

    if (projectData) {
      setValue("title", projectData.title);
      setValue("description", projectData.description);
      setValue("repositoryUrl", projectData.repositoryUrl);
      setValue("liveUrl", projectData.liveUrl);
      setSelectedCategories(projectData.categories);
      setSelectedTechnologies(projectData.skills);
      setAllImages(projectData.images);
      setCollapse(true);
      setEditingProject(projectData);
      console.log("CLICOU PARA EDITAR", allImages);
    }
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
    console.log("Image uploaded:", image);
    setAllImages((prevImages) => [...prevImages, { url: image }]);
  }

  function handleImageDelete(imageLink) {
    console.log("Image deleted:", imageLink);
    setAllImages((prevImages) =>
      prevImages.filter((image) => image.url !== imageLink)
    );
  }

  function handleOpenModal(id) {
    setProjectToDelete(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    deleteProject(projectToDelete);
    setIsModalOpen(false);
  }

  function handleDataReset() {
    reset();
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setAllImages([]);
    setEditingProject(null);
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
          {isLoadingById && (
            <div
              className="spinner-border d-flex mb-5"
              style={{
                margin: "0 auto",
              }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className={`collapse mb-5 ${collapse ? "show" : ""}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="title">Nome do projeto</label>
                  <input
                    id="title"
                    {...register("title", {
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
                  {errors.title && <p>{errors.title.message}</p>}
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
                        value: 700,
                        message: "Deve conter no máximo 700 caracteres",
                      },
                    })}
                    style={{ overflow: "hidden", resize: "none" }}
                    onInput={handleInput}
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div className="col-md-12">
                  <label htmlFor="repositoryUrl">Link do repositório</label>
                  <input
                    id="repositoryUrl"
                    {...register("repositoryUrl", {
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
                  {errors.repositoryUrl && (
                    <p>{errors.repositoryUrl.message}</p>
                  )}
                </div>
                <div className="col-md-12">
                  <label htmlFor="liveUrl">Link online </label>
                  <input
                    id="liveUrl"
                    {...register("liveUrl", {
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
                        imageLink={image.url}
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
                    <div key={category.id} className="category-card">
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
                  <label htmlFor="skills">Tecnologias</label>
                  <select
                    onClick={handleTechnologyChange}
                    id="skills"
                    {...register("skills")}
                  >
                    <option value="">Selecione uma tecnologia</option>
                    {allTechnologies.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.skills && <p>{errors.skills.message}</p>}
                </div>
                <div className="col-md-6 d-flex flex-wrap align-items-end gap-3">
                  {selectedTechnologies.map((category) => (
                    <div key={category.id} className="category-card">
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
                        <td>{project.title}</td>
                        <td className="d-flex gap-3">
                          <Button
                            value={<FaPen size={14} />}
                            classBtn="warning"
                            onClick={() => handleEditClick(project.id)}
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
                            onClick={() => handleOpenModal(project.id)}
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

export default Projects;
