import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Trainers from "./Trainers";
import ListaEntrenadores from "./ListaEntrenadores";


function Home() {
  const user = JSON.parse(localStorage.getItem("user")); // se puede cambiar por context más adelante


  return (
    <>
      <Hero />

      {user?.role === "USER_ROLE" ? (
        <>
          {/* Acá se mostrarán todos los entrenadores */}
          <ListaEntrenadores />
        </>
      ) : (
        <>
          {/* Secciones visibles si NO estás logueado como cliente */}
          <ListaEntrenadores />
          <About />
          <Features />
          <Trainers />
        </>
      )}
    </>
  );
}

export default Home;
