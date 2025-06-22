import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios/axios";

function Registro() {


   const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPassword: "",
    birth: "",
    role: "",
    terms:false
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    const roleMapped =
      form.role === "cliente" ? "USER_ROLE" : form.role === "entrenador" ? "TRAINER_ROLE" : "";

    try {
      console.log(form);
      const { data } = await api.post("/users/register", {
        name: form.name,
        lastName: form.lastName,
        mail: form.mail,
        password: form.password,
        birth: form.birth,
        role: roleMapped,
      });
      
      console.log("Usuario registrado:", data);
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2f2] px-4">
      <div className="flex w-full max-w-6xl rounded-lg bg-white p-10 shadow-lg">
        {/* Formulario */}
        <div className="w-full md:w-1/2 pr-6 md:pr-12">
          <h2 className="text-2xl font-bold text-[#1b1464] mb-6">
            Registro de usuarios
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Nombre</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"               
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Apellido</label>
              <input
                onChange={handleChange}
                type="text"
                name="lastName"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Correo</label>
              <input
                onChange={handleChange}
                type="email"
                name="mail"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Crear contraseña</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Reingresar contraseña</label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Fecha de nacimiento</label>
              <input
                onChange={handleChange}
                type="date"
                name="birth"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center text-sm text-[#1b1464]">
                <input
                onChange={handleChange}
                checked={form.role === "entrenador"}
                type="radio" name="role" value="entrenador" className="mr-2" />
                Soy entrenador
              </label>
              <label className="flex items-center text-sm text-[#1b1464]">
                <input
                onChange={handleChange}
                checked={form.role === "cliente"}
                type="radio" name="role" value="cliente" className="mr-2" />
                Soy cliente
              </label>
            </div>

            <div className="mt-2">
              <label className="flex items-center text-sm text-[#1b1464]">
                <input
                name="terms"
                type="checkbox" className="mr-2" />
                Acepto términos y condiciones
              </label>
            </div>

            <button className="w-full rounded-full bg-[#1b1464] text-white font-bold py-2 mt-4">
              Registrarse
            </button>

             {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <p className="text-center text-sm mt-2 text-[#1b1464]">
              Ya tienes cuenta? <Link to="/login" className="underline">Ingresar</Link>
            </p>
          </form>
        </div>

        {/* Logo */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <h1 className="text-4xl font-light text-[#1b1464]">
            Entren<span className="font-bold">APP</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Registro;
