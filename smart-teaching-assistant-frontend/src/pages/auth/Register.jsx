import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Registration successful! Please login.");
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white p-14 flex-col justify-center">
                <h1 className="text-5xl font-bold leading-tight mb-6">
                    Join Smart Teaching<br />Assistant
                </h1>
                <p className="text-lg text-gray-200 mb-10">
                    Create your account to access AI-powered teaching tools and resources.
                </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-100 p-5 rounded-full">
                            <FaGraduationCap className="text-4xl text-blue-700" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
                    <p className="text-center text-gray-500 mb-8">Sign up to get started</p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block mb-2 font-medium">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-4 text-gray-400" />
                                <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-4 text-gray-400" />
                                <input type={showPassword ? "text" : "password"} placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Confirm Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-4 text-gray-400" />
                                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition">
                            {loading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : "Register"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?
                        <Link to="/" className="text-blue-700 font-semibold ml-2 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
