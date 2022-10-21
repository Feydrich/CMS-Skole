import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function NavbarComponent() {
  const navbarPreflight = useRef(true);
  useEffect(() => {
    if (navbarPreflight.current) {
      navbarPreflight.current = false;
    }
  }, []);

  const location = useLocation();

  const paths: { path: string; description: string }[] = [
    { path: "/home", description: "Home" },
    { path: "/test", description: "Test" },
  ];

  return (
    <nav>
      This is a navigation placeholder
      {(() => {
        return paths.map((x) => (
          <li className={location.pathname === x.path ? "active" : ""}>
            <Link to={x.path}>{x.description}</Link>
          </li>
        ));
      })()}
    </nav>
  );
}

export default NavbarComponent;
