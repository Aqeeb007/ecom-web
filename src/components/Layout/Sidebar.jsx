import { NavLink } from "react-router-dom";

const nav_routes = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/products",
    title: "Products",
  },
  {
    to: "/events",
    title: "Events",
  },
  {
    to: "/faqs",
    title: "FAQs",
  },
  {
    to: "/user-profile",
    title: "Profile",
  },
];

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ onClose }) => {
  return (
    <div className="flex flex-col pl-4 w-full ">
      <div className="flex flex-col w-full">
        {nav_routes.map((route, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "!text-green-600 bg-gray-300 p-2 min-w-full block my-3 text-2xl font-semibold rounded-xl"
                  : "text-gray-500 hover:text-gray-700 my-3 text-2xl p-2 font-semibold"
              }
              to={route.to}
              onClick={onClose}
            >
              {route.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
