import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
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
  const [selectedItemProfile, setSelectedItemProfile] = useState("");
  const [selectedIsLiked, setSelectedIsLiked] = useState(false);
  const [postData, setPostData] = useState([]);
  const { currentUser, setError } = useAuth();
  const [pages, setPages] = useState(1);
  const [arr, setArr] = useState([]);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);


  const pageSize = 1550;

  function getScrollPosition() {
    const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return scrollTop;
  }

  function getCurrentPage(position) {
    return Math.floor(position / pageSize);
  }

  window.addEventListener('scroll', function() {
    var scrollPosition = getScrollPosition();
    var curPage = getCurrentPage(scrollPosition) + 1;
    if(curPage > pages && scrollPosition > lastScrollPosition)
    {
      //console.log('Current page', curPage);
      setPages(curPage);
      setLastScrollPosition(scrollPosition);
    }
  });
 
  async function getPost(num) {
    try {
      const response = await axios.post("http://localhost:80/posts/query", {page: num});
      console.log(response);
      const data = response.data.data.map((post) => {
        if(currentUser && currentUser.uid)
        {
          if(post.likes.includes(currentUser.uid))
          {
            return {...post, isLiked: true, numLikes: post.likes.length};
          } else {
            return {...post, isLiked: false, numLikes: post.likes.length};
          }
        }
        else
        {
          return post;
        }
      })
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      console.log("Error from calling axios from Home");
    }
  }

  useEffect(() => {
    async function fetchData() {
      if(pages === 1)
      {
        setArr(prevArr => [...prevArr, 1])
        const data = await getPost(1);
        setPostData(data);
        console.log(postData);
      }
      else{
        if(!arr.includes(pages))
        {
          setArr(prevArr => [...prevArr, pages])
          //console.log(pages);
          const data = await getPost(pages);
          setPostData(prevData => [...prevData, ...data]);
          console.log(postData);
        }
      }
    }
    fetchData();
  }, [pages]);

  const handlePinClick = (item) => {
    if(currentUser)
    {
      setShowModal(true);
      setSelectedItem(item);
      setSelectedItemProfile(item.user);
      setSelectedIsLiked(item.isLiked);
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
    let value;
    setPostData((data) =>
      data.map((post) => {
        if (post.id === e) {
          value = post.isLiked;
          return {...post, isLiked: !post.isLiked};
        }
        return post;
    }));
    if(value)
    {
      console.log(value);
      try{
        const response = await axios.post("http://localhost:80/post/unlike", userObject);
        console.log(response);
        setPostData((data) =>
          data.map((post) => {
            if (post.id === e) {
              return {...post, numLikes: post.numLikes-1};
            }
            return post;
        }));
      } catch (e){
          console.log(e);
      }
    }
    else
    {
      console.log(value);
      try{
        const response = await axios.post("http://localhost:80/post/like", userObject);
        console.log(response);
        setPostData((data) =>
          data.map((post) => {
            if (post.id === e) {
              return {...post, numLikes: post.numLikes+1};
            }
            return post;
        }));
      } catch (e){
          console.log(e);
      }
    }
  }

  const handleLikeModalChange = (likeModalVal, id) => {
    setSelectedIsLiked(!selectedIsLiked)
    setPostData((data) =>
      data.map((post) => {
        if (post.id === id) {
          return {...post, isLiked: likeModalVal};
        }
        return post;
    }));
    if(likeModalVal)
    {
      setPostData((data) =>
          data.map((post) => {
            if (post.id === id) {
              return {...post, numLikes: post.numLikes+1};
            }
            return post;
        }));
    }
    else
    {
      setPostData((data) =>
          data.map((post) => {
            if (post.id === id) {
              return {...post, numLikes: post.numLikes-1};
            }
            return post;
        }));
    }
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
        <ImageList variant="woven" cols={5} gap={25}>
          {postData && postData.map((item) => (
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
                      <button
                        style={{
                          color: "red",
                        }}
                        className="pint_mock_icon_container mr-2"
                        onClick={() => handleLikeClick(item.id)}
                      >
                        <BsHeartFill className="text-white" sx={{'&:hover': {cursor: 'pointer'}}} color={item.isLiked ? 'red' : 'grey'}/>
                        {item.numLikes}
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

export default HomePage;