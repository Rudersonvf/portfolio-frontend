import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useState } from "react";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FIELD_ERROR = "Campo requirido";
  const FIELD_ERROR_MIN_LENGTH = "Deve conter ao menos 3 caracteres";
  const FIELD_ERROR_MAX_LENGTH = "Deve conter no máximo 80 caracteres";

  const onSubmit = (data) => console.log(data);

  function handleEditClick() {
    console.log("CLICOU PARA EDITAR");
  }

  function handleDeleteClick() {
    console.log("CLICOU PARA APAGAR");
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
                <tr>
                  <th scope="row">2</th>
                  <td>4322</td>
                  <td>Frontend</td>
                  <td className="d-flex gap-2">
                    <Button
                      value={<FaPen />}
                      classBtn="warning"
                      onClick={handleEditClick}
                      shape={"circle"}
                      style={{
                        width: "30px",
                        height: "30px",
                        padding: "8px",
                      }}
                    />
                    <Button
                      value={<FaRegTrashCan />}
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
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Categories;
