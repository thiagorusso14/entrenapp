import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1eeee] px-4">
      <div className="flex w-full max-w-5xl rounded-lg bg-white p-10 shadow-lg">
        {/* Formulario */}
        <div className="w-full md:w-1/2 pr-6 md:pr-12">
          <h2 className="text-3xl font-bold text-[#12015f] mb-8">Ingresar</h2>
          <form className="space-y-5">
            <div>
              <label className="block font-semibold text-sm text-[#12015f]">Correo</label>
              <input
                type="email"
                className="w-full rounded border border-[#12015f] px-4 py-2 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm text-[#12015f]">Contraseña*</label>
              <input
                type="password"
                className="w-full rounded border border-[#12015f] px-4 py-2 mt-1 outline-none"
              />
            </div>
            <div className="text-sm text-[#12015f] flex flex-col md:flex-row md:justify-between">
              <Link to="/registro" className="hover:underline mb-1 md:mb-0">No tienes cuenta? Registrate</Link>
              <Link to="/recuperar" className="hover:underline">Olvidé mi contraseña</Link>
            </div>
            <button className="w-full rounded-full bg-[#12015f] px-6 py-3 text-white font-semibold hover:opacity-90 transition">
              Ingresar
            </button>
          </form>
        </div>

        {/* Logo */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <h1 className="text-5xl font-light text-[#12015f]">
            Entren<span className="font-bold">APP</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
