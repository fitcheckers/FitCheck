import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { BsHeartFill } from "react-icons/bs";
import { maxHeight, maxWidth } from "@mui/system";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import PostModal from "./posts/PostModal.js";
import axios from "axios";

//Get all post LIKED by userID

function LikePage() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemProfile, setSelectedItemProfile] = useState("");
  const [selectedIsLiked, setSelectedIsLiked] = useState(true);
  const { currentUser, setError } = useAuth();
  // eslint-disable-next-line
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function getUser(user_id) {
    try {
      const response = await axios.post("http://localhost:80/users/get", {
        id: user_id,
      });
      console.log("Calling axios from getUser MyPost");
      return response.data;
    } catch (e) {
      console.log(e);
      console.log("Error from calling axios from getUser MyPost");
    }
  }
  
  async function getUserPostData(post_ids) {
    const requests = post_ids.map((post_id) =>
      axios
        .post("http://localhost:80/post/get", { id: post_id })
        .catch((error) => {
          console.log(`Error from fetching post ${post_id}: ${error}`);
        })
    );
    const responses = await Promise.all(requests);
    console.log("Calling axios from Like Page");
    console.log(responses.map((response) => response.data));
    return responses.map((response) => response.data);
  }

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(currentUser.uid);
      setUser(userData);
      const postData = await getUserPostData(userData.likes);
      setData(postData);
      //console.log(postData);
    }
    fetchData();
  }, [currentUser.uid]);

  const handlePinClick = (item) => {
    if(currentUser)
    {
      setShowModal(true);
      setSelectedItem(item.content);
      setSelectedItemProfile(item.user);
      setSelectedIsLiked(true);
      console.log(selectedIsLiked);
    }
    else
    {
      setError("Must be logged in to access");
    }
  };

  const handleLikeClick = async (e) => {
    console.log(e);
    console.log(currentUser.uid);
    const userObject = {
      user_id: currentUser.uid,
      post_id: e,
    }
    try{
      const response = await axios.post("http://localhost:80/post/unlike", userObject);
      console.log(response);
    } catch (e){
        console.log(e);
    }
    navigate(0);
  }

  const handleLikeModalChange = (likeModalVal, id) => {
    console.log(likeModalVal, id);
    navigate(0);
  }
  //get all posts in collection
  // convert them into pins object and store them in pin array
  // render them into pin container

  return (
    <div>
      <PostModal post={selectedItem}
          user={selectedItemProfile}
          like={selectedIsLiked}
          isOpen={showModal}
          onLikeModal={handleLikeModalChange}
          toggleModal={() => setShowModal(false)} />
      <Box
        sx={{
          width: maxWidth,
          height: maxHeight,
          paddingLeft: 12,
          paddingRight: 4,
          paddingTop: 15,
        }}
      >
        <ImageList variant="masonry" cols={5} gap={25}>
          {data.map((item) => (
            <ImageListItem key={item.content.id}
            onMouseOver={() => setHoveredItem(item)}
            onMouseOut={() => setHoveredItem(null)}>
                <img
                  src={`${item.content.image_url}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.content.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.content.title}
                  loading="lazy"
                  style={{ borderRadius: 20 }}
                  onClick={() => handlePinClick(item)} 
                />
                {hoveredItem === item && ( <ImageListItemBar
                  className="rounded-b-2xl"
                  title={item.content.title}
                  subtitle={item.content.author}
                  actionIcon={
                    <>
                      <button
                        style={{
                          color: "red",
                        }}
                        className="pint_mock_icon_container mr-2"
                        onClick={() => handleLikeClick(item.content.id)}
                      >
                        <BsHeartFill />
                        {item.content.likes.length}
                      </button>
                    </>
                  }
                />)}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default LikePage;