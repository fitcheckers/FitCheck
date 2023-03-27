import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import side from "../../img/design.avif"


export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser, register, setError } = useAuth();

    useEffect(() => {
      if(currentUser){
        navigate("/");
      }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
      e.preventDefault();

      if(password !== confirmPassword){
        return setError("Password Do Not Match!");
      }

      if(password.length < 6){
        return setError("Password need to be at least 6 characters.")
      }

      try {
        setError("");
        setLoading(true);
        await register(email, password);
        navigate("/Preference");
      } catch (e) {
        if(e.message === "Firebase: Error (auth/email-already-in-use).")
        {
          setError("The email is associated with an account already!")
        }
        else
          setError("Failed to register");
      }

      setLoading(false);
    }

  return (
    <div className="flex justify-center items-center pt-36 ml-4">
      <img className="w-auto h-[478px] rounded-l-2xl" src={side} alt="side" />
      <div className="bg-neutral-300 rounded-r-2xl py-12 px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-24 text-3xl text-center tracking-tight font-light ">
              Register your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600"
              >
                Register
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
