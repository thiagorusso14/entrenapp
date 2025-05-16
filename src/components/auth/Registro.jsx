import React from "react";
import { Link } from "react-router-dom";

function Registro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2f2] px-4">
      <div className="flex w-full max-w-6xl rounded-lg bg-white p-10 shadow-lg">
        {/* Formulario */}
        <div className="w-full md:w-1/2 pr-6 md:pr-12">
          <h2 className="text-2xl font-bold text-[#1b1464] mb-6">
            Registro de usuarios
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Nombre</label>
              <input
                type="text"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Apellido</label>
              <input
                type="text"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Correo</label>
              <input
                type="email"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Crear contraseña</label>
              <input
                type="password"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Reingresar contraseña</label>
              <input
                type="password"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-[#1b1464]">Fecha de nacimiento</label>
              <input
                type="date"
                className="w-full rounded border border-[#1b1464] px-4 py-2"
              />
            </div>

            {/* Radios para elegir uno solo */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center text-sm text-[#1b1464]">
                <input type="radio" name="rol" value="entrenador" className="mr-2" />
                Soy entrenador
              </label>
              <label className="flex items-center text-sm text-[#1b1464]">
                <input type="radio" name="rol" value="cliente" className="mr-2" />
                Soy cliente
              </label>
            </div>

            <div className="mt-2">
              <label className="flex items-center text-sm text-[#1b1464]">
                <input type="checkbox" className="mr-2" />
                Acepto términos y condiciones
              </label>
            </div>

            <button className="w-full rounded-full bg-[#1b1464] text-white font-bold py-2 mt-4">
              Registrarse
            </button>

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
