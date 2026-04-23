import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isShown, setIsShown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const HIDE_DELAY = 2500; // 2.5s
  const ANIMATION_DURATION = 1000; // 1s
  const UNMOUNT_DELAY = HIDE_DELAY + ANIMATION_DURATION; // 2.5s + 1s = 8s

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    setIsShown(true);
    setIsMounted(true);

    const hideToastTimer = setTimeout(() => {
      setIsShown(false);
    }, HIDE_DELAY);

    const stopRenderTimer = setTimeout(() => {
      setIsMounted(false);
    }, UNMOUNT_DELAY);

    return () => {
      clearTimeout(hideToastTimer);
      clearTimeout(stopRenderTimer);
    };
  }, [isOnline]);

  return {
    isOnline,
    isShown,
    isMounted,
  };
}

/* BRAINSTORMING */

//Edge case
/* 
      si el usuario hace offline -> online -> offline rápido
      puede acabar teniendo timers solapados y un comportamiento raro
    */
//? ¿Posible Solución?
/* 
    Cancelar timers anteriores antes de crear nuevos
    (o usar una ref para controlarlos)
   */

//---

//Se dispara al montar (detalle UX)
/* 
      Ahora mismo: useEffect(() => { ... }, [isOnline]); también se ejecuta al inicio
    */
//? ¿Quiero eso?
/* 
    Si --> perfecto
    No --> necesitamos evitar el primer render

    para solucionarlo, se puede hacer uso de un "useRef" para detectar primer render
   */
