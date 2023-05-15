import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import picture from './profile.webp'
import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import background from "../../img/backgrounds.jpeg";
import {BsFillCameraFill} from "react-icons/bs";
import axios from "axios";

export default function Profile(){
    const navigate = useNavigate();

    //console.log(picture);

    const [ username, setUsername ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { currentUser, updateUserProfile, setError } = useAuth();
    const imageUploader = React.useRef(null);
    const imageUploader2 = React.useRef(null);
    const [displayPictureUrl, setDisplayPictureUrl] = useState(currentUser.photoURL);




    function fileName(folder){ //This function looks for the index of the image name so that it can be used as reference to be deleted.
      //console.log(currentUser.photoURL);
      var searchTerm;
      switch(folder){
        case 'profile':
          searchTerm = 'profileImages';
          break;
        case 'banner':
          searchTerm = 'bannerImages';
          break;
        default:
          searchTerm = 'profileImages';
      }

      var searchEnd = '?alt';
      var indexOfFirst = currentUser.photoURL.indexOf(searchTerm) + 16;
      var indexOfLast = currentUser.photoURL.indexOf(searchEnd) - 1;
      return {indexOfFirst, indexOfLast};
    }



    //Get user banner from firestore
    async function getUser(user_id){
      try{
        const response = await axios.post("http://localhost:80/users/get", {id: user_id});
        //console.log(response.data);
        return response.data;
      } catch(e){
        console.log(e);
      }
    }
    const [ user, setUser ] = useState("");
    useEffect(() => {
      async function fetchData(){
        const userData = await getUser(currentUser.uid);
        setUser(userData);
      }
      fetchData();
    }, [currentUser]);

    if(!user){
      return <div>Loading User Info...</div>;
    }

    const handleBannerUpload = async e => { //This function previews the banner image to the user;
      const [file] = e.target.files;
      const imageUrl = URL.createObjectURL(file);
      document.getElementById('banner_img').src = imageUrl; //Changes the image src so that img is previewed;
    };

    const bannerUpload = async(event) => {
      event.preventDefault();
      var file = document.querySelector("input[type='file'][id='bg_img']").files[0];
      //console.log(file.name);
      if(user.profile_banner_url !== "" && user.profile_banner_url !== "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/bannerImages%2FblueNwhite.avif?alt=media&token=5f9fff41-ef1c-449e-942b-596d81e3ac84")
      {
        var desertRef = ref(storage, user.profile_banner_url.slice(fileName('banner')));
        deleteObject(desertRef).then(() => {
          console.log("Delete success");
        })
        .catch((error) => {
          console.log("Delete fail");
        })
      }

      try{
        const storageRef = ref(storage, 'bannerImages/' + file.name); //Create a reference to our storage;
        const snapshot = await uploadBytes(storageRef, file); //Upload the image to our storage;
        const url = await getDownloadURL(snapshot.ref); //Gets the url for image in our storage;
        //console.log('Uploaded banner file:', file.name, 'with URL:', url);
        const users_data = {
          id: currentUser.uid,
          profile_banner_url: url
        }
        try{
          const response = await axios.post("http://localhost:80/users/update", users_data);
          //console.log(response.data);
          return response.data;
        } catch(e){
          console.log(e);
        }
      } catch (error) {
        console.error('Error uploading banner file:', error);
        return null;
      }
      navigate("/profile");
    };




    let storage = getStorage();
    const handleImageUpload = async e => { //This function previews the image to the user;

      const [file] = e.target.files;
      if (!file) {
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      document.getElementById('profileImg').src = imageUrl; //Changes the image src so that img is previewed;
    };

    function isValidFirebaseURL(url){ //Check to see if the current photoURL is a valid firebase in our storage.
      const storageURL = "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/profileImages%2F";
      return url.startsWith(storageURL);
    }

    const handleSave = async(event) => { //This function grabs the file and passes it to another function;
      event.preventDefault();
      var file = document.querySelector("input[type='file'][id='upload_img']").files[0];
      if(file) //If the input file is not empty calls uploadFile;
      {
        await uploadFile(file);
      }
      else //If the input file is empty, then handleSave is called to make the imageUrl as pfp;
      {
        if(currentUser.photoURL === null)
        {
        }
        else
        {
          if(isValidFirebaseURL(currentUser.photoURL)) //If current picture is an image in our storage we need to delete it;
          {
            var desertRef = ref(storage, currentUser.photoURL.slice(fileName('profile')));
            deleteObject(desertRef).then(() => {
              console.log("Delete success");
            })
            .catch((error) => {
              console.log("Delete fail");
            })
          }
        }
        const myInput = document.getElementById("userInput").value;
        if(myInput)
        {
          setDisplayPictureUrl(myInput);
          const user = currentUser;
          const profile = {
            photoURL: displayPictureUrl,
          };

          const users_data = {
            id: currentUser.uid,
            profile_pic_url: displayPictureUrl,
          }
          try{
            const response = await axios.post("http://localhost:80/users/update", users_data);
            console.log("Changed profile pic url");
            console.log(response.data);
          } catch(e){
            console.log(e);
          }

          await updateUserProfile(user, profile);
          navigate("/profile");
        }
      }
      file = document.querySelector("input[type='file'][id='upload_img']");
      file.value = "";
      var myInput = document.getElementById("userInput").value;
      if(myInput)
      {
        navigate("/profile");
      }
    }

    const uploadFile = async(file) => { //This function is responsible for deleteing the pfp and uploading the new one;
      if(currentUser.photoURL === null)
      {
      }
      else
      {
      if(isValidFirebaseURL(currentUser.photoURL)) //If current picture is an image in our storage we need to delete it;
        {
          var desertRef = ref(storage, currentUser.photoURL.slice(fileName('profile')));
          deleteObject(desertRef).then(() => {
            console.log("Delete success");
          })
          .catch((error) => {
            console.log("Delete fail");
          })
        }
      }

      try{
        const storageRef = ref(storage, 'profileImages/' + file.name); //Create a reference to our storage;
        const snapshot = await uploadBytes(storageRef, file); //Upload the image to our storage;
        const url = await getDownloadURL(snapshot.ref); //Gets the url for image in our storage;
        console.log('Uploaded file:', file.name, 'with URL:', url);
        const user = currentUser;
        const profile = {
          photoURL: url,
        };
        console.log('Updating user profile with:', profile);
        setDisplayPictureUrl(url);
        
        await updateUserProfile(user, profile);
        setDisplayPictureUrl(url);

        const users_data = {
          id: currentUser.uid,
          profile_pic_url: url,
        }
        try{
          const response = await axios.post("http://localhost:80/users/update", users_data);
          console.log("Changed profile pic url");
          console.log(response.data);
        } catch(e){
          console.log(e);
        }

        navigate("/profile");
      } catch (error) {
        console.error('Error uploading file:', error);
        return null;
      }
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

          const users_data = {
            id: currentUser.uid,
            display_name: username,
          }
          try{
            const response = await axios.post("http://localhost:80/users/update", users_data);
            console.log("Changed profile pic url");
            console.log(response.data);
          } catch(e){
            console.log(e);
          }

          navigate("/profile");
        } catch (e) {
          setError("Failed to update profile");
        }
    
        setLoading(false);
        document.getElementById("username").value = "";
    };

    const HandleBioSubmit = async () =>{
      const _bio = document.getElementById("bio").value;
      console.log(_bio);
      try {
        const users_data = {
          id: currentUser.uid,
          bio: _bio,
        }
        try{
          const response = await axios.post("http://localhost:80/users/update", users_data);
          console.log("Changed bio name url");
          console.log(response.data);
        } catch(e){
          console.log(e);
        }
        console.log(users_data)
      } catch (e) {
        setError("Failed to update bio");
      }
      setLoading(false);
    };
    return (
      <div className="w-full h-[1000px]">
        <img className="relative border-b-2 border-gray-200 object-cover object-center -z-20 w-screen h-[375px]" id="banner_img" src={user.profile_banner_url ||background} alt="background cover"></img>
        <form onSubmit={bannerUpload} className="w-0 h-0 ">
          <input className="relative left-24 top-[340px] z-40 w-8 opacity-0" ref={imageUploader2} id="bg_img" accept="image/*" type="file" onChange={handleBannerUpload}></input>
          <input className="relative left-[140px] top-[-66px] z-0 w-20 opacity-100 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-lg" type="submit"></input>
        </form>  
        <BsFillCameraFill size="32" onClick={() => imageUploader2.current.click()} className="relative left-24 top-[-42px] z-0 cursor-pointer bg-white rounded-lg"/>
          <div className="relative flex items-center justify-center w-[90%] left-[6%]">
            <div className="relative flex flex-col items-center w-96">
              <input className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                id="upload_img"
              />
              <div className="h-60 w-60 cursor-pointer top-[50%]"
                onClick={() => imageUploader.current.click()}
              >
                <img className="shadow-lg rounded-full max-w-full h-60 w-60 items-stretch border-none object-cover bg-center"
                  alt="profile"
                  id="profileImg"
                  src={displayPictureUrl || currentUser.photoURL || picture}
                />
              </div>
              Click to upload Image or enter an image Url below 
              <form className="space-y-6" onSubmit={handleSave}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <input 
                    type="text" 
                    placeholder="Enter Image Url"
                    id="userInput"
                    className="relative appearance-none rounded-none w-96 px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                    onChange={(e) => setDisplayPictureUrl(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Profile Picture
                  </button>
                </div>
              </form>
            </div>
            <div className="relative w-96 left-[1%]">
              <h1 className="text-3xl">Hello {currentUser.displayName}</h1>
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
                    Update Username
                  </button>
                </div>
              </form>
            </div>
            <div className="relative w-96 h-16 left-[2%]">
              <form className="space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                  Click to update Bio
                  <textarea
                    id="bio"
                    name="bio"
                    maxLength="200"
                    className="appearance-none rounded-none relative block w-full h-32 px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your bio"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={loading}
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={HandleBioSubmit}
                  >
                    Update Bio
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    );
}
