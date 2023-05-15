import React from "react";
import { useState, useEffect } from "react";

import "../styles/my_post.css";

import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";
import background from "../img/backgrounds.jpeg";
import { useAuth } from "../contexts/AuthContext";
import Followers from "./accounts/Followers";
import Followings from "./accounts/Followings";
import axios from "axios";

async function getUser(user_id) {
  try {
    const response = await axios.post("http://localhost:80/users/get", {
      id: user_id,
    });
    console.log("Calling axios from getUser UserProfile");
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("Error from calling axios from getUser UserProfile");
  }
}

async function getUserPostData(post_ids) {
  const requests = post_ids.map((post_id) =>
    axios.post("http://localhost:80/post/get", { id: post_id })
  );
  const responses = await Promise.all(requests);
  console.log(responses.map((response) => response.data));
  console.log("Calling axios from getUserPostData UserProfile");
  return responses.map((response) => response.data);
}

const UserProfile = ({ backImg, post }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState("");
  const [postDetails, setPostDetails] = useState([]);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(currentUser.uid);
      setUser(userData);
      const postDetails = await getUserPostData(userData.posts);
      setPostDetails(postDetails);
    }
    fetchData();
  }, [currentUser]);

  if (!user) {
    return <div>Loading User Info...</div>;
  }

  return (
    <div>
      <img
        className="left-12 -z-10 top-[80px] w-screen h-52 relative object-cover bg-center"
        src={user.profile_banner_url || backImg}
        alt="background cover"
      ></img>
      <img
        className="w-48 h-48 rounded-full object-cover relative left-24"
        src={currentUser.photoURL || picture}
        alt="profile"
      ></img>
      <p className="relative left-80 text-lg font-bold -mt-28">
        @{currentUser.displayName}
      </p>
      <p className="relative inline left-80 text-lg">{user.posts.length || post} Post</p>
      <p className="relative inline ml-6 left-80 text-lg cursor-pointer" onClick={() => setShowFollowerModal(true)}>{user.followers.length} Followers</p>
      <p className="relative inline ml-6 left-80 text-lg cursor-pointer" onClick={() => setShowFollowingModal(true)}>{user.following.length} Followings</p>
      <br></br>
      <a
        href="/Profile"
        className="relative left-80 bg-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500"
      >
        Edit Profile
      </a>
      <p className="relative left-80 mt-5 text-base ">
        {user.bio}
      </p>
      <HiOutlineSquares2X2 size="32" className="relative left-24 top-16" />
      <p className="relative left-32 top-9 font-extrabold text-xl -mb-10">
        My Posts
      </p>
      <Followers isOpen={showFollowerModal} followerData={user.followers} toggleModal={() => setShowFollowerModal(false)}/>
      <Followings isOpen={showFollowingModal} followingsData={user.following} toggleModal={() => setShowFollowingModal(false)}/>
    </div>
  );
};
export { UserProfile };
