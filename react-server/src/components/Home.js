import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import PostModal from "./posts/PostModal.js";
import axios from "axios";
import { BsHeartFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext.js";
import { useState, useEffect } from "react";
import { maxHeight, maxWidth } from "@mui/system";


function HomePage(){
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [postData, setPostData] = useState([]);
  const { currentUser, setError } = useAuth();


  async function getPost() {
    try {
      const response = await axios.post("http://localhost:80/posts/query");
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      console.log("Error from calling axios from Home");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getPost();
      setPostData(data);
    }
    fetchData();
  }, []);

  const handlePinClick = (item) => {
    if(currentUser)
    {
      setShowModal(true);
      setSelectedItem(item)
    }
    else
    {
      setError("Must be logged in to access");
    }
  };

  function likeButton(){
    console.log('like');
  }


  //get all posts in collection
  // convert them into pins object and store them in pin array
  // render them into pin container

  return (
    <div>
      <PostModal post={selectedItem}
          user={selectedItem}
          isOpen={showModal}
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
          {postData.map((item) => (
            <ImageListItem key={item.id}
            onMouseOver={() => setHoveredItem(item)}
            onMouseOut={() => setHoveredItem(null)}>
                <img
                  src={`${item.image_url}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{ borderRadius: 20 }}
                  onClick={() => handlePinClick(item)} 
                />
                {hoveredItem === item && ( <ImageListItemBar
                  className="rounded-b-2xl"
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <>
                      <IconButton onClick={likeButton}>
                        <BsHeartFill className="text-white" sx={{'&:hover': {cursor: 'pointer'}}}/>
                      </IconButton>
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

export default HomePage;