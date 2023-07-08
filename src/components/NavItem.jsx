import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ route, name, event }) => {
  return (
    <NavLink
      onClick={event ? event : ""}
      to={route}
      className={({ isActive }) =>
        isActive
          ? "text-white font-bold px-3 py-2 rounded-md text-sm"
          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      }
    >
      {name}
    </NavLink>
  );
};

export default NavItem;
