import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Link, useNavigate } from "react-router-dom";




function HomePage() {
  
  // const navigate = useNavigate();

  // const handleNavigateToPost = () => {
  //   navigate('/post');
  // };


  return (
    <div className="container-home">
      <h1 className="home-page-title-pl">PLATAFORMA INTERACTIVA DE VIAJE</h1>

      <img className="banner"
        src="https://www.buenas-vibras.com.ar/uploads/destacados/7/2021-banner-principal-sin-logo-web.jpg"  
        alt="Colagge de fotos de viajes" 
      />
       <h1 className="home-page-title">UN RINCON VIRTUAL DE EMOCIONES.</h1>

       <div className="container-parrafo">
          <p>En la era digital, la pasión por explorar el mundo se ha fusionado con la interconexión global, dando lugar a plataformas de viajes que trascienden la mera planificación de itinerarios. En este emocionante rincón virtual, viajar deja de ser simplemente la exploración de nuevos destinos; se convierte en un caleidoscopio de experiencias compartidas. Cada clic en esta plataforma es un paso hacia la construcción de recuerdos imborrables. Es un espacio donde los viajeros no solo comparten destinos, sino también emociones, descubrimientos y conexiones humanas. Viajar, en esta esfera digital, se redefine como una sinfonía de instantes únicos, donde la comunidad se entrelaza en un tejido de relatos y vivencias que transforman cada aventura en una epopeya colectiva. Así, la plataforma se erige como un santuario para aquellos que entienden que viajar es mucho más que llegar a un nuevo lugar; es sumergirse en un océano de experiencias que perduran en el tiempo.</p>

          <Link className="btn-home-post" to="/post">Ir a la sección de Post</Link>
       </div>

    
       
    </div>
  )
}

export default HomePage