import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile(){
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const { currentUser, updateUserProfile, setError } = useAuth();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
          setError("");
          setLoading(true);
          const user = currentUser;
          const profile = {
            displayName: username,
          };
          await updateUserProfile(user, profile);
          navigate("/profile");
        } catch (e) {
          setError("Failed to update profile");
        }
    
        setLoading(false);
    };

    return(
      <div>
        <h1>
          Hello {currentUser.displayName}
        </h1>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              defaultValue={currentUser.displayName && currentUser.displayName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    )
}