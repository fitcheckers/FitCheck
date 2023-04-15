import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { maxHeight, maxWidth } from "@mui/system";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PostModal from "./posts/PostModal.js";
import { useAuth } from "../contexts/AuthContext.js";

function HomePage(){
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { currentUser, setError } = useAuth();

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

  function dislikeButton()
  {
    console.log('dislike');
  }

  //get all posts in collection
  // convert them into pins object and store them in pin array
  // render them into pin container

  return (
    <div>
      <PostModal post={selectedItem}
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
          {itemData.map((item) => (
            <ImageListItem key={item.title}
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
                        <ThumbUpIcon className="text-white" sx={{'&:hover': {cursor: 'pointer'}}}/>
                      </IconButton>
                      <IconButton onClick={dislikeButton}>
                        <ThumbDownIcon className="text-white" sx={{'&:hover': {cursor: 'pointer'}}}/>
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

//fetch post title, desp img frm firstore post

const itemData = [
  {
    image_url: "./fitpics/2.jfif",
    title: "fit1",
  },

  {
    image_url: "./fitpics/4.jfif",
    title: "fit2",
  },
  {
    image_url: "./fitpics/5.jfif",
    title: "fit3",
  },
  {
    image_url: "./fitpics/6.jfif",
    title: "fit4",
  },
  {
    image_url: "./fitpics/7.jfif",
    title: "fit5",
  },
  {
    image_url: "./fitpics/8.jfif",
    title: "fit6",
  },
  {
    image_url: "./fitpics/9.jfif",
    title: "fit7",
  },
  {
    image_url: "./fitpics/10.jfif",
    title: "fit8",
  },
  {
    image_url: "./fitpics/11.jfif",
    title: "fit9",
  },
  {
    image_url: "./fitpics/12.jfif",
    title: "fit10",
  },
  {
    image_url: "./fitpics/1.jfif",
    title: "fit11",
  },
  {
    image_url: "./fitpics/2.jfif",
    title: "fit12",
  },

  {
    image_url: "./fitpics/4.jfif",
    title: "fit13",
  },
  {
    image_url: "./fitpics/5.jfif",
    title: "fit14",
  },
  {
    image_url: "./fitpics/6.jfif",
    title: "fit15",
  },
  {
    image_url: "./fitpics/7.jfif",
    title: "fit16",
  },
  {
    image_url: "./fitpics/8.jfif",
    title: "fit17",
  },
  {
    image_url: "./fitpics/9.jfif",
    title: "fit18",
  },
  {
    image_url: "./fitpics/10.jfif",
    title: "fit19",
  },
  {
    image_url: "./fitpics/11.jfif",
    title: "fit20",
  },
  {
    image_url: "./fitpics/12.jfif",
    title: "fit21",
  },
];

export default HomePage;