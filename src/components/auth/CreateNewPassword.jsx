import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../axios/axios";

const CreateNewPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post(`/users/reset-password/${token}`, {
                newPassword,
            });

            setSuccess(data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cambiar contraseña");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f1eeee] px-4">
            <div className="flex w-full max-w-5xl rounded-lg bg-white p-10 shadow-lg">
                <div className="w-full md:w-1/2 pr-6 md:pr-12">
                    <h2 className="text-3xl font-bold text-[#12015f] mb-8">Contraseña Nueva</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block font-semibold text-sm text-[#12015f]">
                                Debe tener mínimo 8 caracteres, 1 mayúscula y un carácter especial
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded border border-[#12015f] px-4 py-2 mt-1 outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-full bg-[#12015f] px-6 py-3 text-white font-semibold hover:opacity-90 transition"
                        >
                            Crear contraseña
                        </button>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}

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

export default CreateNewPassword;