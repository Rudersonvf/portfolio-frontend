import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ToastContainer from "../../components/ToastContainer";
import { useToast } from "../../hooks/useToast";
import * as categoryService from "../../services/category-service";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { toasts, addToast } = useToast();
  const FIELD_ERROR = "Campo requirido";
  const FIELD_ERROR_MIN_LENGTH = "Deve conter ao menos 3 caracteres";
  const FIELD_ERROR_MAX_LENGTH = "Deve conter no máximo 80 caracteres";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setIsLoading(true);
    try {
      const categoryData = await categoryService.findAllRequest();
      setCategories(categoryData.data);
    } catch (error) {
      addToast(
        "Error",
        "Erro ao buscar categorias. Tente novamente mais tarde.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function insertCategory(data) {
    setIsSending(true);
    try {
      const response = await categoryService.insertRequest(data);
      addToast(
        "Sucesso!",
        `Categoria ${response.data.name} foi criada!`,
        "success"
      );
      reset();
      fetchCategories();
    } catch (error) {
      addToast("Erro", "Erro ao criar categoria. Tente novamente.", "danger");
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  async function deleteCategory(id) {
    setIsSending(true);
    try {
      await categoryService.deleteRequest(id);
      addToast("Sucesso!", "Categoria foi deletada com sucesso!", "success");
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      addToast(
        "Erro",
        error.response?.data?.error || "Erro ao deletar a categoria.",
        "danger"
      );
      console.error("Error: ", error);
    } finally {
      setIsSending(false);
    }
  }

  function onSubmit(data) {
    insertCategory(data);
  }

  function handleOpenModal(id) {
    setCategoryToDelete(id);
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    deleteCategory(categoryToDelete);
    setIsModalOpen(false);
  }

  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
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
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <main>
      <section>
        <div className="container">
          <div className="pt-4 mb-5 d-flex justify-content-between">
            <span className="h2">Categorias</span>
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
            >
              +
            </button>
          </div>
          <div className="collapse mb-5" id="collapseCat">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ maxWidth: "500px" }}>
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
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  categories.map((category, index) => (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td className="d-flex gap-3">
                        <Button
                          value={<FaRegTrashCan size={14} />}
                          classBtn="danger"
                          onClick={() => handleOpenModal(category.id)}
                          shape="circle"
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: "8px",
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer toasts={toasts} />
        {isModalOpen && (
          <Modal
            title="Deletar Categoria"
            message={
              <>
                Você tem certeza que deseja deletar esta categoria?
                <br />
                Essa ação será irreversível!
              </>
            }
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            loading={isSending}
          />
        )}
      </section>
    </main>
  );
};

export default Categories;
