import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import side from "../../img/design.avif"
import Reset from "./Reset";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, login, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(currentUser){
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(e){
    e.preventDefault();

    try {
      setError("")
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (e) {
      if(e.message === "Firebase: Error (auth/user-not-found).")
      {
        setError("Inputted email is not associated with any account!");
      }
      else if(e.message === "Firebase: Error (auth/wrong-password).")
      {
        setError("Password is incorrect!");
      }
      else if(e.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")
      {
        setError("Access to the account has been disabled due to many login attempts")
      }
      else{
        setError("Failed to Login")
      }
    }

    setLoading(false);
  }

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex justify-center items-center pt-40 ml-4">
      <img className="w-auto h-[461px] rounded-l-2xl" src={side} alt="side" />
      <div className="h-[461px] py-12 px-4 sm:px-6 lg:px-8 bg-neutral-300 rounded-r-2xl flex-shrink-0">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-24 text-3xl text-center tracking-tight font-light">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Don't have an account? Register
                </Link>
                <br></br>
                <div
                  className="text-blue-600 hover:underline dark:text-blue-500 hover:cursor-pointer"
                  onClick={() => handleClick()}
                >
                  Forgot your password?
                </div>
              </div>
            </div>
          </form>
          <Reset isOpen={showModal} toggleModal={() => setShowModal(false)}/>
        </div>
      </div>
    </div>
  );
}
