import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import picture from './profile.webp'
import React from "react";
export default function Profile(){
    const navigate = useNavigate();

    console.log(picture);

    const [ username, setUsername ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { currentUser, updateUserProfile, setError } = useAuth();
    const imageUploader = React.useRef(null);
    const [displayPictureUrl, setDisplayPictureUrl] = useState(currentUser.photoURL);

    const handleImageUpload = async e => {
      const [file] = e.target.files;
      if (!file) {
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setDisplayPictureUrl(imageUrl);
      if (file) {
        const reader = new FileReader();
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const handleSaveImage = async (e) =>{
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        const user = currentUser;
        const profile = {
          photoURL: displayPictureUrl,
        };
        await updateUserProfile(user, profile);
        navigate("/profile");
      } catch (e) {
        setError("Failed to update picture");
      }
      setLoading(false);
      document.getElementById("username").value = "";     
    };
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
        document.getElementById("username").value = "";
    };
    return (
      <div>
        <div className="min-h-full flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col items-center justify-center">
              <input className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
              />
              <div class="h-60 w-60 cursor-pointer"
                onClick={() => imageUploader.current.click()}
              >
                <img className="shadow-lg rounded-full max-w-full h-full items-stretch border-none"
                  alt="profile picture"
                  src={displayPictureUrl || currentUser.photoURL || picture}
                />
              </div>
              Click to upload Image or enter an image Url below 
              <form className="space-y-6" onSubmit={handleSaveImage}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <input 
                    type="text" 
                    placeholder="enter image url"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                    onChange={(e) => setDisplayPictureUrl(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Profile Picture
                  </button>
                </div>
              </form>
            </div>
            <h1 class="text-3xl">Hello {currentUser.displayName}</h1>
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
                  //defaultValue={currentUser.displayName && currentUser.displayName}
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
        </div>
      </div>
    );
}