import { useRouter } from "../hooks/useRouter.jsx";

export function Link({ href, children, ...restOfProps }) {
  const { navigateTo, currentPath } = useRouter();
  const isActive = (path) => currentPath === path;

  const handleClick = (event) => {
    event.preventDefault();

    /* window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate")); */
    navigateTo(href);
  };

  return (
    <a
      href={href}
      {...restOfProps}
      onClick={handleClick}
      className={isActive(href) ? "active-anchor" : "non-active-anchor"}
    >
      {children}
    </a>
  );
}

//TODO | agregar una sección comentada para poder apuntar todo lo necesario sobre el porque estamos haciendo este componente que parece tan sencillo.

/* CREANDO UNA SINGLE PAGE APPLICATION (SPA) DESDE CERO CON REACT */
/* 
  Una Single page application es una aplicación web que no recarga la página al navegar 
  entre diferentes rutas. En lugar de solicitar nuevas páginas al servidor, la SPA carga
  tod0 el código al inicio y luego renderiza contenido dinámicamente según la URL.

*/

/* VENTAJAS: */
/* 
  - Navegación instantánea: no se recargan recursos
  - Mantiene el estado: las variables y datos persisten
  - Mejor UX: transiciones suaves, sin parpadeos
  - Menos datos: solo se descarga contenido nuevo
*/

/* El problema  X  La solución */
/* 
  Por defecto, cuando haces clic en un `<a>`, cada clic recarga toda la página.
  La solución es crear un componente Link personalizado. Para ello, creamos nuestro propio
  componente `<Link>` que intercepta los clics y evita la recarga (como hemos hecho en
  este documento)

  El preventDefault() evita que el navegador haga el comportamiento por defecto, que es
  navegal al enlace. Sin esto, el navegador seguiría el enlace de forma tradicional.

  El pushState() cambia la URL del navegador sin recargar la página. El primer parametro es
  el objeto de estado (lo dejamos vacío). El segundo parámetro es el título (obsoleto, lo
  dejamos vacío). Por fin, el tercer parámetro es la nueva URL. Después de esto, la barra
  de direcciones muestra la nueva URL, pero la página no se recarga.

  Luego emitimos el evento popstate. Para que React se entere del cambio de URL, emitimos
  manualmente un evento popstate. Este evento se dispara automáticamente cuando el usuario
  usa los botones de atrás/adelante del navegador, pero como nostros estamos cambiando la
  URL manualmente con pushState(), debemos emitirlo nosotros.

  Con todo eso, sustituimos todos los `<a>` por nuestro componente `<Link>`

  El problema ahora es que React no reacciona al cambio de URL porque React no sabe que la
  URL ha cambiado. Por ello necesitamos escuchar los cambios en la URL, Actualizar un estado
  de React con la nueva ruta y luego renderizar el contenido correspondiente según esa ruta
*/

/* -- FLUJO COMPLETO -- */
/* 
  Cuando el usuario hace clic en un <Link>:
    1. Link captura el clic → event.preventDefault()
    2. Cambia la URL → window.history.pushState({}, '', href)
    3. Emite el evento → window.dispatchEvent(new PopStateEvent('popstate'))
    4. useEffect detecta el evento → handleLocationChange()
    5. Actualiza el estado → setCurrentPath(window.location.pathname)
    6. React re-renderiza → muestra el componente correspondiente
*/
