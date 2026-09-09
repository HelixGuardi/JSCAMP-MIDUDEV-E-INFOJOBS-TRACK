import { Link as NavLink } from "react-router";
import { useRouter } from "../hooks/useRouter";

export function Link({ href, children, ...restOfProps }) {
  const { currentPath } = useRouter();
  const isActive = (path) => currentPath === path;

  return (
    <NavLink
      to={href}
      {...restOfProps}
      /* className={isActive(href) ? "active-anchor" : "non-active-anchor"} */
    >
      {children}
    </NavLink>
  );
}
