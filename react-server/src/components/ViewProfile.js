import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";
import Followers from "./accounts/Followers";
import Followings from "./accounts/Followings";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import Pin from "./Pin";

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
    const { currentUser } = useAuth();
  const [user, setUser] = useState("");
  const [postDetails, setPostDetails] = useState([]);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [follow, setFollow] = useState(false);
  
  useEffect(() => {
  async function fetchData() {
    const userData = await getUser(userId);
    setUser(userData);
    const postDetails = await getUserPostData(userData.posts);
    setPostDetails(postDetails);
    if (userData.followers && userData.followers.includes(currentUser.uid)) {
      setFollow(true);
    }
  }
    fetchData();
    // eslint-disable-next-line
}, [userId, follow]);

    async function followButton(){
      if(follow)
      {
        //unfollow
        try{
          const req = await axios.post("http://localhost:80/users/unfollow", {
            follower: currentUser.uid,
            followed: userId,
          });
          console.log("Success Unfollow");
          setFollow(false);
          return req.data;
        } catch (e) {
          console.log(e);
          console.log("Failed Unfollow");
        }
      }
      else
      {
        //follow
        try{
          const req = await axios.post("http://localhost:80/users/follow", {
            follower: currentUser.uid,
            followed: userId,
          });
          console.log("Success Follow");
          setFollow(true);
          return req.data;
        } catch (e) {
          console.log("Failed Follow");
        }
      }
    }

  if (!user) {
    return <div>Loading User Info...</div>;
  }
  if(!postDetails) {
    return <div>Loading Post Info...</div>;
  }

  console.log(currentUser.uid);
  console.log(userId);

  return (
    <div className="overflow-x-hidden">
      <img
        className="left-12 -z-10 top-[80px] w-screen h-52 relative object-cover bg-center"
        src={user.profile_banner_url}
        alt="background cover"
      ></img>
      <img
        className="w-48 h-48 rounded-full object-cover relative left-24"
        src={user.profile_pic_url || picture}
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
        <button className="relative left-80 bg-gray-300 w-26 text-base pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500" onClick={() => followButton()}>
            {
              follow ? 'Unfollow' : 'Follow'
            }
        </button>

      <Followers isOpen={showFollowerModal} followerData={user.followers} toggleModal={() => setShowFollowerModal(false)}/>
      <Followings isOpen={showFollowingModal} followingsData={user.following} toggleModal={() => setShowFollowingModal(false)}/>
      <div className="pin_container">
        {postDetails.map((e) => (
          <Pin
            key={e.content.id}
            title={e.content.title}
            image_url={e.content.image_url}
            user_pfp={user.profile_pic_url || picture}
            user_name={user.display_name}
            description={e.content.description}
            post_id={e.content.id}
            profile_pic_url={e.user.profile_pic_url}
            display_name={e.user.display_name}
            cur_user_id={currentUser.uid}
            user_id={e.content.user_id}
            likes={e.content.likes}
          />
        ))}
      </div>
    </div>
  );
};
export default ViewProfile;