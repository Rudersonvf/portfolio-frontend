import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as categoryService from "../../../services/categoryService";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Button from "../../../components/Button";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
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
        const categoryData = await categoryService.findAllRequest();
        setCategories(categoryData.data);
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
    if (editingCategory) {
      console.log("Editando categoria: ", data);
      // Lógica para editar a categoria
    } else {
      console.log("Criando nova categoria: ", data);
      // Lógica para criar nova categoria
    }
    reset();
    setEditingCategory(null);
  };

  function handleEditClick(category) {
    setEditingCategory(category);
    setValue("name", category.name);
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
              onClick={handleCollapseResetClick}
            >
              +
            </button>
          </div>
          <div className="collapse mb-5" id="collapseCat">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ maxWidth: "500px" }}>
                <label htmlFor="name">Nome da categoria</label>
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
                        <SkeletonTheme highlightColor="#c1c1c1">
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
                            <Skeleton
                              width={30}
                              height={30}
                              borderRadius={50}
                            />
                            <Skeleton
                              width={30}
                              height={30}
                              borderRadius={50}
                            />
                          </td>
                        </SkeletonTheme>
                      </tr>
                    ))
                  : categories.map((category, index) => (
                      <tr key={category.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
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
                              onClick={() => handleEditClick(category)}
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

export default Categories;
