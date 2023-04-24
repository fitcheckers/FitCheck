import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";
import Followers from "./accounts/Followers";
import Followings from "./accounts/Followings";
import { useParams } from "react-router-dom";


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

function ViewProfile()
{
    const { userId } = useParams();
  const [user, setUser] = useState("");
  const [postDetails, setPostDetails] = useState([]);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  
  useEffect(() => {
  async function fetchData() {
    const userData = await getUser(userId);
    setUser(userData);
    const postDetails = await getUserPostData(userData.posts);
    setPostDetails(postDetails);
  }
    fetchData();
}, [userId]);

  if (!user) {
    return <div>Loading User Info...</div>;
  }
  if(!postDetails) {
    return <div>Loading Post Info...</div>;
  }

  return (
    <div>
      <img
        className="left-12 -z-10 top-[80px] w-screen h-52 relative object-cover bg-center"
        src={user.profile_banner_url}
        alt="background cover"
      ></img>
      <img
        className="w-48 h-48 rounded-full object-cover relative left-24"
        src={user.photoURL || picture}
        alt="profile"
      ></img>
      <p className="relative left-80 text-lg font-bold -mt-28">
        @{user.display_name}
      </p>
      <p className="relative inline left-80 text-lg">{user.posts.length} Post</p>
      <p className="relative inline ml-6 left-80 text-lg cursor-pointer" onClick={() => setShowFollowerModal(true)}>{user.followers.length} Followers</p>
      <p className="relative inline ml-6 left-80 text-lg cursor-pointer" onClick={() => setShowFollowingModal(true)}>{user.following.length} Followings</p>
      <br></br>
      <HiOutlineSquares2X2 size="32" className="relative left-24 top-16" />
      <p className="relative left-32 top-9 font-extrabold text-xl -mb-10">
        My Posts
      </p>
      <Followers isOpen={showFollowerModal} followerData={user.followers} toggleModal={() => setShowFollowerModal(false)}/>
      <Followings isOpen={showFollowingModal} followingsData={user.following} toggleModal={() => setShowFollowingModal(false)}/>
    </div>
  );
};
export default ViewProfile;