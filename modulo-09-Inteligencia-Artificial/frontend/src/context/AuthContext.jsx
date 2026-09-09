import { createContext, use, useState } from "react";
/* puese ser "use" o "useContext". El "use" es más nuevo y limpio. Sirve para leer contexto y promesas. Puede ser interesante para utilizar las funciones más modernas que entrega React. */

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  /* const context = useContext(AuthContext); */
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/* Usar use en lugar de useContext */
/* 
  En las clases anteriores hemos trabajado con useContext para consumir contextos en React. Es la forma tradicional que llevamos usando años. Pero desde React 19 existe una nueva utilidad llamada use que simplifica aún más la sintaxis y añade capacidades adicionales.

  En esta clase verás cómo funciona use, por qué es útil y cuándo usarlo en lugar de useContext.

  use es una nueva utilidad de React que permite leer:
    - Contextos (como useContext, pero más simple)
    - Promesas (para trabajar con datos asíncronos)

  La ventaja principal es la simplicidad: menos código, misma funcionalidad.
  */

/* 
  ¿Desde cuándo está disponible?
    use está disponible desde React 19. Si usas una versión anterior, necesitas actualizar.

  ¿Debo migrar todo mi código?
    No es necesario. useContext sigue funcionando perfectamente y no está deprecado.

  ¿Cuándo usar use vs useContext?
    Usa use cuando:
    ✅ Estás en React 19+
    ✅ Quieres código más conciso
    ✅ Necesitas leer promesas además de contextos
    ✅ Estás empezando un proyecto nuevo

    Usa useContext cuando:
    ✅ Necesitas compatibilidad con React < 19
    ✅ Trabajas en una librería pública
    ✅ El equipo no está familiarizado con use
    ✅ Prefieres la sintaxis tradicional
    
  Ambas opciones son válidas. No hay una “correcta” o “incorrecta”.
  */
