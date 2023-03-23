import React, { useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdTitle } from "react-icons/md";

import "../styles/pin_styles.css";

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
 


  return (
    <div className={`card card_${props.pinDetails.pin_size}`}>
      <div className="pin_modal">
        <div className="modal_foot">
          <div className="title">
            <div className="pint_mock_icon_container">
              <MdTitle />
            </div>
            <span>{props.pinDetails.title}</span>
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
        <img
          onLoad={check_size}
          src={props.pinDetails.img_blob}
          alt="pin_image"
        />
      </div>
    </div>
  );
}

export default Pin;
