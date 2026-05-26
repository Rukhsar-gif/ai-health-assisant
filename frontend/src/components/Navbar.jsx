import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, Activity } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ Dashboard path
  const dashboardPath =
    role === "admin" ? "/admin-dashboard" : "/dashboard";

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  // ✅ Active link style
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white/20 text-cyan-300"
      : "text-white hover:bg-white/10 hover:text-cyan-200";

  return (
    <nav
      className="
        sticky top-0 z-50
       bg-gradient-to-r from-[#021024] via-[#052659] to-[#021024]
        backdrop-blur-2xl
        border-b border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-20 w-40 h-40 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-0 right-20 w-40 h-40 bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative z-10">

        {/* ================= LOGO ================= */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Activity className="text-cyan-400" size={28} />

          <h1
            className="
              text-2xl font-extrabold
              bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
              bg-clip-text text-transparent
              tracking-wide
            "
          >
            Sanjeewani
          </h1>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-3">

          {token ? (
            <>
              {/* Dashboard */}
              <Link
                to={dashboardPath}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  dashboardPath
                )}`}
              >
                Dashboard
              </Link>

              {/* Vaccination */}
              <Link
                to="/vaccination"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  "/vaccination"
                )}`}
              >
                Vaccination
              </Link>

              {/* First Aid */}
              <Link
                to="/first-aid"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  "/first-aid"
                )}`}
              >
                First Aid
              </Link>

              {/* Diet */}
              <Link
                to="/diet"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  "/diet"
                )}`}
              >
                Diet
              </Link>

              {/* AI Chat */}
              <Link
                to="/vapiWidget"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  "/vapiWidget"
                )}`}
              >
                AI Chat
              </Link>

              {/* Location Health */}
              <Link
                to="/location-health"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                  "/location-health"
                )}`}
              >
                Location Health
              </Link>

              {/* 👑 ADMIN ONLY */}
              {role === "admin" && (
                <>
                  {/* <Link
                    to="/add-doctor"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                      "/add-doctor"
                    )}`}
                  >
                    Add Doctor
                  </Link>

                  <Link
                    to="/add-diet"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                      "/add-diet"
                    )}`}
                  >
                    Add Diet
                  </Link> */}

                  <Link
                    to="/analytics"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${isActive(
                      "/analytics"
                    )}`}
                  >
                    Analytics
                  </Link>
                </>
              )}

              {/* ================= PROFILE ================= */}
              <div className="relative">

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
                    flex items-center gap-2
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    px-4 py-2 rounded-2xl
                    hover:bg-white/20
                    transition-all duration-300
                  "
                >
                  <User size={18} />
                  Profile
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    className="
                      absolute right-0 mt-3 w-52
                      bg-slate-900/95
                      backdrop-blur-2xl
                      border border-white/10
                      rounded-2xl
                      shadow-2xl
                      overflow-hidden
                    "
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-gray-300">
                        Logged in as
                      </p>

                      <p className="font-semibold capitalize text-cyan-300">
                        {role}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="
                        w-full text-left px-4 py-3
                        hover:bg-red-500/20
                        text-red-400
                        transition
                      "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  px-5 py-2 rounded-xl
                  hover:scale-105
                  transition-all duration-300
                  shadow-lg
                "
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  px-5 py-2 rounded-xl
                  hover:scale-105
                  transition-all duration-300
                  shadow-lg
                "
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              bg-white/10 p-2 rounded-xl
              border border-white/10
            "
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div
          className="
            md:hidden
            bg-black/80
            backdrop-blur-2xl
            border-t border-white/10
            px-6 py-6 space-y-4
          "
        >
          {token ? (
            <>
              <Link
                to={dashboardPath}
                className="block hover:text-cyan-300"
              >
                Dashboard
              </Link>

              <Link
                to="/vaccination"
                className="block hover:text-cyan-300"
              >
                Vaccination
              </Link>

              <Link
                to="/first-aid"
                className="block hover:text-cyan-300"
              >
                First Aid
              </Link>

              <Link
                to="/diet"
                className="block hover:text-cyan-300"
              >
                Diet
              </Link>

              <Link
                to="/vapiWidget"
                className="block hover:text-cyan-300"
              >
                AI Chat
              </Link>

              <Link
                to="/location-health"
                className="block hover:text-cyan-300"
              >
                Location Health
              </Link>

              {/* ADMIN */}
              {role === "admin" && (
                <>
                  <Link
                    to="/add-doctor"
                    className="block hover:text-cyan-300"
                  >
                    Add Doctor
                  </Link>

                  <Link
                    to="/add-diet"
                    className="block hover:text-cyan-300"
                  >
                    Add Diet
                  </Link>

                  <Link
                    to="/analytics"
                    className="block hover:text-cyan-300"
                  >
                    Analytics
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block">
                Login
              </Link>

              <Link to="/register" className="block">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;