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
import { useParams } from "react-router-dom";
import { maxHeight, maxWidth } from "@mui/system";

function Fit() {
  const { tags } = useParams();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemProfile, setSelectedItemProfile] = useState("");
  const [selectedIsLiked, setSelectedIsLiked] = useState(false);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState("");
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
 
  async function getPost(array, num) {
    try {
      console.log(array);
      const response = await axios.post("http://localhost:80/posts/query", { tags: array, page: num });
      console.log(response.data);
      const data = response.data.data.map((post) => {
        if(post.likes.includes(currentUser.uid))
        {
          return {...post, isLiked: true, numLikes: post.likes.length};
        } else {
          return {...post, isLiked: false, numLikes: post.likes.length};
        }
      })
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      console.log("Error from calling axios from Home");
    }
  }

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

  useEffect(() => {
    async function fetchData() {
      if(pages === 1)
      {
        console.log(pages)
          setArr(prevArr => [...prevArr, pages])
          if(tags === undefined)
          {
            const fetchedData = await getUser(currentUser.uid);
            setUserData(fetchedData);
            const data = await getPost(fetchedData.styles, pages);
            setPostData(data);
          }
          else
          {
            const query = [];
            query.push(tags);
            console.log(query);
            const data = await getPost(query, pages);
            setPostData(data);
          }
      }
      else
      {
        if(!arr.includes(pages))
        {
          console.log(pages)
          setArr(prevArr => [...prevArr, pages])
          if(tags === undefined)
          {
            const fetchedData = await getUser(currentUser.uid);
            setUserData(fetchedData);
            const data = await getPost(fetchedData.styles, pages);
            setPostData(prevData => [...prevData, ...data]);
          }
          else
          {
            const query = [];
            query.push(tags);
            console.log(query);
            const data = await getPost(query, pages);
            setPostData(prevData => [...prevData, ...data]);
          }
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

export default Fit;