import "../sass/pages/page-login.scss";

import * as authService from "../services/auth-service";

import { FaEye, FaEyeSlash } from "react-icons/fa6";

import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const FIELD_ERROR = "Campo requirido";

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const response = await authService.loginRequest(data);
      authService.saveAccessToken(response.data.access_token);
      navigate("/admin/projects");
    } finally {
      setIsLoading(false);
    }
  }

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main>
      <section className="page-login">
        <div className="container">
          <div className="form-container row">
            <h1 className="mb-5">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="col mb-2">
                <label htmlFor="username">Email</label>
                <input
                  id="username"
                  type="email"
                  placeholder="example@email.com"
                  {...register("username", { required: FIELD_ERROR })}
                  className="mb-1"
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>
              <div className="col mb-4">
                <label htmlFor="password">Senha</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password", { required: FIELD_ERROR })}
                    className="mb-1"
                  />
                  <div className="password-icon-container">
                    {showPassword ? (
                      <FaEyeSlash onClick={handleTogglePassword} />
                    ) : (
                      <FaEye onClick={handleTogglePassword} />
                    )}
                  </div>
                </div>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <Button
                classBtn="primary"
                value="entrar"
                type="submit"
                disabled={isLoading}
              />
              <span className="forgotten-password mt-4">Esqueceu a senha?</span>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
