import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { MdTitle } from "react-icons/md";
import PostModal from "./posts/PostModal";
import axios from "axios";

import "../styles/pin_styles.css";
import "../styles/my_post.css";

function check_size(event) {
  const image = event.target;

  image.classList.add("pin_max_width");

  if (
    image.getBoundingClientRect().width <
      image.parentElement.getBoundingClientRect().width ||
    image.getBoundingClientRect().height <
      image.parentElement.getBoundingClientRect().height
  ) {
    image.classList.remove("pin_max_width");
    image.classList.add("pin_max_height");
  }

  image.style.opacity = 1;
}

function Pin(props) {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(props.likes.length);
  const [LikeClicked, setLikeClicked] = useState(props.likes.includes(props.cur_user_id));

  //console.log(props.user_id);
  //console.log(props.cur_user_id);

  const handleLikeClick = async (e) => {
    e.stopPropagation();

      if (LikeClicked === false) {
        setLikeClicked(true);
        setLikes(likes + 1);
        const userObject = {
          user_id: props.cur_user_id,
          post_id: props.post_id,
        }
        try{
          const response = await axios.post("http://localhost:80/post/like", userObject);
          return response.data;
        } catch (e){
            console.log(e);
        }
      }
      else {
        setLikeClicked(false);
        setLikes(likes - 1);
        const userObject = {
          user_id: props.cur_user_id,
          post_id: props.post_id,
        }
        try{
          const response = await axios.post("http://localhost:80/post/unlike", userObject);
          return response.data;
        } catch (e){
            console.log(e);
        }
      }
  };

  const handlePinClick = () => {
    setShowModal(true);
  };

  const handleLikeModalChange = (likeModalVal, id) => {
    console.log(likeModalVal, id);
    if(likeModalVal)
    {
      setLikeClicked(true);
      setLikes(likes + 1);
    }
    else
    {
      setLikeClicked(false);
      setLikes(likes - 1);
    }
  }

  return (
    <div className="card card_large bg-neutral-300">
      <div className="pin_modal " onClick={handlePinClick}>
        <div className="modal_foot">
          <div className="title">
            <div className="pint_mock_icon_container">
              <MdTitle />
            </div>
            <span>{props.title}</span>
          </div>

          <button
            style={{
              color: LikeClicked ? "red" : "",
            }}
            className="pint_mock_icon_container"
            onClick={handleLikeClick}
          >
            <BsHeartFill />
            {likes}
          </button>
        </div>
      </div>

      <div className="pin_image">
        <img onLoad={check_size} src={props.image_url} alt="pin_image" />
      </div>
      {showModal && (
        <PostModal
          post={props}
          user={props}
          like={LikeClicked}
          isOpen={showModal}
          onLikeModal={handleLikeModalChange}
          toggleModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Pin;