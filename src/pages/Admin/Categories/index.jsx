import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useState } from "react";

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
        </div>
      </section>
    </main>
  );
};

export default Categories;
