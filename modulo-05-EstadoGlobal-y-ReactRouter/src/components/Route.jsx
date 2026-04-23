import { useRouter } from "../hooks/useRouter.jsx";

export function Route({ path, component: Component }) {
  const { currentPath } = useRouter();

  if (currentPath !== path) return null;

  return <Component />;
}

/* CREANDO UN COMPONENTE <Route> DECLARATIVO */
/* 
  Con esto transformamos un router con lógica imperativa (basado en 'if' y 'switch') en un sistema
  declarativo usando un componente '<Route>'. Este cambio mejorará drásticamente la legibilidad,
  escalabilidad y mantenibilidad de la aplicación
*/

/* 
  En la lógica imperativa:
    - se describe cómo funciona el routing, no qué debe hacer
    - no escala bien. Añadir rutas significa modificar la lógica del componente
    - difícil de leer. No es evidente qué rutas existen de un vistazo
    - declarativo. No expressa la intención claramente
    - lógica acoplada. El componente principal conoce los detalles del routing

  Por ello, en lugar de condicionales, se crea un componente <route> que encapsule la
  lógica de matching.
*/

/* VENTAJAS DEL ENFOQUE DECLARATIVO */
/* 
    - Expresa intención: cada ruta es clara y autoexplicativa
    - Fácil de leer: Ves todas las rutas de un vistazo
    - Escalable: Añadir rutas es solo añadir más <route>
    - Separación de responsabilidades: cada <route> gestiona su propia lógica
    - Sin condicionales: el componente principal queda limpio
*/
