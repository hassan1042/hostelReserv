import React, { useState } from "react";
import { login, signup } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
 const navigate = useNavigate();
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6 && password.length <= 10;

    if (!hasUpperCase)
      return "Password must include at least one uppercase letter.";
    if (!hasSymbol) return "Password must include at least one symbol.";
    if (!isValidLength) return "Password must be between 6 and 10 characters.";
    return null; // Password is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    try {
      if (isSignup) {
        await signup(email, password);
        setLogin(false);
      } else {
        await login(email, password);
        setLogin(false);
      }
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="py-5 my-auto h-[95vh] flex items-center justify-center dark:bg-bgPrimaryDark">
      <div className="bg-white dark:bg-cardDark dark:text-text p-8 rounded shadow-md w-[90%] lg:w-[40%]">
        <h2 className="text-2xl font-bold mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-icons focus:outline-none dark:bg-bgInputsDark"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-icons focus:outline-none dark:bg-bgInputsDark"
              required
              maxLength={10} // Limit the input to 10 characters
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 dark:bg-blue-700 hover:bg-teal-800 transition-all duration-300 dark:text-text text-white rounded"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setError(""); // Clear any previous error messages
              setIsSignup(!isSignup);
            }}
            className="text-blue-500 dark:text-blue-600 hover:-translate-y-[5px] transition-all duration-300 underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
