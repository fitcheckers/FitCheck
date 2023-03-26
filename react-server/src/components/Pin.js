import React, { useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import PostModal from "./posts/PostModal";

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

  function handlePinClick() {
    setShowModal(true);
  }

  return (
    <div className="card card_large bg-neutral-300">
      <div className="pin_modal" onClick={handlePinClick}> 
        <div className="modal_foot">
          <div className="title">
            <div className="pint_mock_icon_container">
              <MdTitle />
            </div>
            <span>{props.title}</span>
          </div>

          <div className="pint_mock_icon_container">
            <AiFillLike />
          </div>

          <div className="pint_mock_icon_container">
            <AiFillDislike />
          </div>
        </div>
      </div>

      <div className="pin_image">
        <img onLoad={check_size} src={props.image_url} alt="pin_image" />
      </div>
      {showModal && <PostModal post={props} isOpen={showModal} toggleModal={() => setShowModal(false)}
      user_pfp = {props.user_pfp}
      user_name = {props.user_name}
      post_description = {props.description} /> }
    </div>
  );
}

export default Pin;