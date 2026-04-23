import { lazy, Suspense } from "react";
import { useNetworkStatus } from "./hooks/useNetworkStatus.jsx";
import { Routes, Route } from "react-router";

import { LoadingSpinner } from "./components/LoadingSpinner.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { NetworkToastCard } from "./components/NetworkToastCard.jsx";

const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));

function App() {
  const { isOnline, isShown, isMounted } = useNetworkStatus();

  return (
    <>
      {isMounted && <NetworkToastCard isOnline={isOnline} isShown={isShown} />}

      <Header />

      <Suspense
        fallback={
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;

/* Prop Drilling vs Context API */
/* 
  En React existen varias formas de compartir datos entre componentes. Dos de las más comunes son prop drilling y Context API. El problema es que muchas veces se usan mal, o se eligen por costumbre en lugar de por necesidad.
  
  ¿Qué es Prop Drilling?
    Prop drilling consiste simplemente en pasar datos de un componente padre a sus hijos mediante props, incluso aunque algunos componentes intermedios no necesiten esos datos directamente.

    No tiene nada de malo. De hecho, es la forma más básica y natural de compartir datos en React.
  
  ¿Cuándo usar Prop Drilling?
    Prop drilling funciona muy bien cuando:
      - El dato solo baja 1, 2 o como mucho 3 niveles.
      - La aplicación es pequeña o simple.
      - El dato pertenece claramente a un flujo padre → hijo.
      - El estado es específico de una parte del árbol.
  
  El problema del Prop Drilling aparece cuando:
      - El dato tiene que viajar 10, 15 o más niveles.
      - Componentes intermedios reciben props que no usan.
      - El árbol empieza a volverse difícil de mantener.
  
  Aquí entra Context API:
    Context API permite definir un estado en un punto del árbol y consumirlo desde cualquier componente descendiente, sin necesidad de pasar props manualmente. Esto elimina el prop drilling y simplifica el árbol de componentes.

  ¿Cuándo usar Context API?
    Context API tiene sentido cuando:
      - Los componentes están en niveles muy distintos del árbol.
      - El dato representa algo global.
      - El estado cambia poco.
      - No quieres usar librerías externas.

    Casos típicos de Context
      - Autenticación (login / logout)
      - Tema (dark / light)
      - Idioma
      - Preferencias globales

    Estos estados no cambian constantemente, y cuando lo hacen, es algo puntual.


    Context API no es para todo
      Un error muy común es usar Context para cualquier estado global sin pensar en el impacto.
      Context está pensado para estados poco frecuentes, no para estados que cambian todo el tiempo.

      Si un estado cambia constantemente y está en Context:
        - Provoca re-renderizados innecesarios.
        - Puede afectar al rendimiento.
        - Hace más difícil escalar la aplicación.
  
  ¿Y si la app crece?
    Cuando la aplicación empieza a crecer y:
      - El estado global es más complejo.
      - Hay muchos cambios de estado.
      - Empiezan los problemas de rendimiento.
    Ahí es cuando Context se queda corto.

    En esos casos, existen bibliotecas como Zustand que simplifican muchísimo la gestión de estado global y evitan los problemas típicos de Context.
  */
