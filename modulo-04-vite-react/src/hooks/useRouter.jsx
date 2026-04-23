import { useEffect, useState } from "react";

// Custom Hook:
export function useRouter() {
  /* const currentPath = window.location.pathname; */
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return { currentPath, navigateTo };
}

/* CUSTOM HOOKS: REUTILIZAR LÓGICA EN REACT */
/* 
  Los custom hooks son una de las características más poderosas de React. Te permiten extraer lógica de
  componentes y reutilizarla en múltiples lugares de tu aplicación, mejorando la organización, mantenibilidad
  y composición del código.

  Un custom hook es una función de JavaScript que:
    - Su nombre empieza con 'use' (convención obligatoria)
    - Puede usar otros hooks de React dentro
    - Encapsula lógica que quieres utilizar
    - Retorna valores que otros componentes pueden usar
*/

/* VENTAJAS */
/* 
  - Reutilización: la lógica está en un solo lugar
  - Separación de responsabilidades: Componentes se enfocan en UI
  - Mantenibilidad: Cambios en un solo lugar
  - Testing: Puedes testear el hook de forma aislada
  - Composición: Un hook puede usar otros hooks
*/

/* ANATOMÍA DE UN CUSTOM HOOK */
/* 
  Un custom hook típico tiene esta estructura:
    import { useState, useEffect } from 'react'

    export function useMyCustomHook(parameters) {
      // 1. Estado interno del hook
      const [state, setState] = useState(initialValue)

      // 2. Efectos secundarios
      useEffect(() => {
        // Lógica del efecto
        return () => {
          // Cleanup
        }
      }, [dependencies])

      // 3. Funciones auxiliares
      const helperFunction = () => {
        // Lógica
      }

      // 4. Retornar la API del hook
      return {
        state,
        helperFunction,
      }
    }
*/

/* ¿Cuándo crear un custom hook? */
/* 
  Crea un custom hook cuando tienes lógica duplicada ne múltiples componentes,
  Cuando la lógica usa hooks de React,
  Cuando quieres separar lógica de UI para mejorar organización,
  Cuando necesitas testear la lógica de forma aislada,
  Cuando quieres compartir lógica entre componentes
*/

/* NO crees un custom hook si: */
/* 
  - Solo usas la lógica en un componente o la lógica es muy simple (una línea)
  - No usa ningún hook de React o es solo una función helper normal
*/

/* ESTRUCTURA DE CARPETAS RECOMENDADA */
/* 
    src/
  ├── components/
  │   ├── Header.jsx
  │   ├── Sidebar.jsx
  │   └── Navigation.jsx
  ├── hooks/
  │   ├── useRouter.js
  │   ├── useLocalStorage.js
  │   ├── useFetch.js
  │   ├── useDebounce.js
  │   └── useToggle.js
  ├── pages/
  │   ├── Home.jsx
  │   ├── About.jsx
  │   └── Contact.jsx
  └── App.jsx
*/

/* IMPORTANTE */
// --> LOS CUSTOM HOOKS SOLO SE PUEDEN LLAMAR EN EL NIVEL SUPERIOR DE NUESTRO COMPONENTE
// --> LOS CUSTOM HOOKS NO SE PUEDEN LLAMAR DENTRO DE UN EFECTO

// Los hooks de React tienen que ser llamados dentro del componente de la función
// o dentro de otro custom hook, en un nivel superior
// siempre tienen que empezar con el prefijo "use"
// además que solo puedes llamar en funciones de React
