import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaEye, FaEyeSlash,FaGraduationCap,FaEnvelope,FaLock,
  FaUserShield,} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("professor");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      console.log({ email, password, role, remember,
      });

      setTimeout(() => {
        localStorage.setItem("role", role);

        if (role === "superadmin") {
          navigate("/superadmin");
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/professor");
        }

        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white p-14 flex-col justify-center">

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Smart Teaching <br />Assistant
        </h1>

        <p className="text-lg text-gray-200 mb-10">
          AI-powered platform helping faculty generate notes,
          assessments, learning roadmaps and student insights.
        </p>

        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-2xl">
             AI Generated Notes & Summaries
          </div>

          <div className="bg-white/10 p-4 rounded-2xl">
             Important Topic Identification
          </div>

          <div className="bg-white/10 p-4 rounded-2xl">
             Automated Assessment Generation
          </div>

          <div className="bg-white/10 p-4 rounded-2xl">
             Career Mapping & Learning Roadmaps
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-5 rounded-full">
              <FaGraduationCap className="text-4xl text-blue-700" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Login As
              </label>

              <div className="relative">
                <FaUserShield className="absolute left-4 top-4 text-gray-400" />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border rounded-xl pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="superadmin">
                    Super Admin
                  </option>

                  <option value="admin">
                    College Admin
                  </option>

                  <option value="professor">
                    Professor
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"  />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"  >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() =>
                    setRemember(!remember)
                  }
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Login"
              )}
            </button>

          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-sm">
              OR
            </span>
            <div className="flex-1 border-t"></div>
          </div>
          <button className="w-full border py-3 rounded-xl hover:bg-gray-50 transition">
            Continue with Google
          </button>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-700 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}