import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Trainers from "./Trainers";
import ListaEntrenadores from "./ListaEntrenadores";
 
 
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
 
 
  return (
    <>
      <Hero />
 
      {user?.role === "USER_ROLE" ? (
        <>
          <ListaEntrenadores />
          
        </>
      ) : (
        <>
          {/* Secciones visibles si NO estás logueado como cliente */}
          
          <About />
          <Features />
          <Trainers />
        </>
      )}
    </>
  );
}
 
export default Home;