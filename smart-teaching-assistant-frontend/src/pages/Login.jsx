import { useState } from "react";
import {FaEye,FaEyeSlash,FaGraduationCap,FaEnvelope,FaLock,} from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      
      console.log({email,password,remember,});

      setTimeout(() => {
        setLoading(false);
        alert("Login Successful"); }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white p-14 flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Smart Teaching<br /> Assistant
        </h1>

        <p className="text-lg text-gray-200 mb-10">
          AI-powered platform helping faculty create smarter lesson plans,
          assessments, learning roadmaps, and personalized student guidance.
        </p>

        <div className="space-y-4">

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
             AI Generated Notes & Summaries
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
             Important Topic Identification
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
             Automated Assessment Generation
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              Career Mapping & Learning Roadmaps
          </div>

        </div>
      </div>


      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">

          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-5 rounded-full">
              <FaGraduationCap className="text-4xl text-blue-700" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to continue your learning journey
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
            </div>
            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}  />
                Remember Me
              </label>

              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 hover:underline"  >
                Forgot Password?
              </a>

            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t"></div>
          </div>
          <button className="w-full border py-3 rounded-xl hover:bg-gray-50 transition">
            Continue with Google
          </button>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
            <span className="text-blue-700 font-semibold cursor-pointer ml-2 hover:underline">
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}