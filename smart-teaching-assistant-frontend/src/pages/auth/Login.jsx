import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../service/authService';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await loginUser(email, password);
      login(user);

      const userRole = user.role?.toUpperCase();

      if (userRole === "SUPER_ADMIN") {
        console.log("Navigating to:", "/superadmin/dashboard");
        navigate("/superadmin/dashboard");
      }
      else if (userRole === "COLLEGE_ADMIN" || userRole === "ADMIN") {
        navigate("/collegeadmin");
      }
      else if (userRole === "PROFESSOR" || userRole === "STAFF") {
        navigate("/professor/dashboard");
      } else {
        // Fallback if role somehow doesn't match
        navigate("/");
      }
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-[12px] text-sm text-center font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700">Email address</label>
              <div className="mt-2">
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-[12px] shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="mt-2">
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-[12px] shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button disabled={isSubmitting} type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-[12px] shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-60">
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500 font-medium">Have a professor invite? </span>
            <Link to="/register" className="font-bold text-purple-600 hover:text-purple-500 transition-colors">
              Activate it here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
