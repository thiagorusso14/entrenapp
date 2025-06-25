import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios/axios";
 
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
 
    try {
      await api.post("/users/forgot-password", { mail: email });
      setMensaje("Revisa tu correo para restablecer la contraseña");
    } catch (err) {
      setMensaje("No se pudo enviar el enlace. Verificá tu correo");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1eeee] px-4">
      <div className="flex w-full max-w-5xl rounded-lg bg-white p-10 shadow-lg">
        <div className="w-full md:w-1/2 pr-6 md:pr-12">
          <h2 className="text-3xl font-bold text-[#12015f] mb-8">Recuperar Contraseña</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-sm text-[#12015f]">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-[#12015f] px-4 py-2 mt-1 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#12015f] px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Recuperar contraseña
            </button>
            {mensaje && (
              <p className="text-center text-sm text-[#12015f]">{mensaje}</p>
            )}
            <p className="text-sm text-center mt-2 text-[#12015f]">
              ¿Recordaste tu contraseña?{" "}
              <Link to="/login" className="text-indigo-800 hover:underline">
                Ingresar
              </Link>
            </p>
          </form>
        </div>
 
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <h1 className="text-5xl font-light text-[#12015f]">
            Entren<span className="font-bold">APP</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
 
export default ForgotPassword;