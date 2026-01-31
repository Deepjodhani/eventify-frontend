import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Eventify"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-slate-600 hover:text-indigo-600 transition"
          >
            Events
          </Link>

          {token && (
            <Link
              to="/create"
              className="rounded-full border border-indigo-600 px-4 py-1.5 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Create Event
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">
                 {userName}
              </span>

              <button
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
