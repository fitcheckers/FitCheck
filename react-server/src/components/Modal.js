import React, { useState, useContext } from "react";

import "../styles/modal_styles.css";

import { AiOutlineUpload } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TopFitSelect from "./ModalComponents/TopFitSelect";

let imageUrl = "";
let file;

function upload_img(
  event,
  pinDetails,
  setPinDetails,
  setShowLabel,
  setShowModalPin
) {
  if (event.target.files && event.target.files[0]) {
    if (/image\/*/.test(event.target.files[0].type)) {
      const reader = new FileReader();

      reader.onload = function () {
        setPinDetails({
          ...pinDetails,
          img_blob: reader.result,
        });
        setShowLabel(false);
        setShowModalPin(true);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  file = document.getElementById("upload_img").files[0];
}

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

async function image_upload(file) {
  var storage = getStorage();
  const storageRef = ref(storage, "postImages/" + file.name); //Create a reference to our storage;
  const snapshot = await uploadBytes(storageRef, file); //Upload the image to our storage;
  const url = await getDownloadURL(snapshot.ref); //Gets the url for image in our storage;
  return url;
}

function Modal(props) {
  const navigate = useNavigate();

  async function save_pin(pinDetails, user, add_pin) {
    imageUrl = await image_upload(file);

    const post_data = {
      image_url: imageUrl,
      description: document.querySelector("#pin_description").value,
      title: document.querySelector("#pin_title").value,
      user_id: user,
    };

    await axios
      .post("http://localhost:80/post/new", post_data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
    add_pin();
  }

  const [pinDetails, setPinDetails] = useState({
    author: "",
    board: "",
    title: "",
    description: "",

    img_blob: "",
    pin_size: "",
  });
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="add_pin_modal">
      <div className="add_pin_container">
        <div className="side" id="left_side">
          <div className="section1">
            <div className="pint_mock_icon_container">
              <RxHamburgerMenu />
            </div>
          </div>

          <div className="section2">
            <label
              htmlFor="upload_img"
              id="upload_img_label"
              style={{
                display: showLabel ? "block" : "none",
              }}
            >
              <div className="upload_img_container">
                <div id="dotted_border">
                  <div className="pint_mock_icon_container">
                    <AiOutlineUpload />
                  </div>
                  <div>Click to upload</div>
                  <div>
                    Recommendation: Use high-quality .jpg less than 20MB
                  </div>
                </div>
              </div>

              <input
                type="file"
                name="upload_img"
                id="upload_img"
                onChange={(event) =>
                  upload_img(
                    event,
                    pinDetails,
                    setPinDetails,
                    setShowLabel,
                    setShowModalPin
                  )
                }
                value=""
              />
            </label>

            <div
              className="modals_pin"
              style={{
                display: showModalPin ? "block" : "none",
              }}
            >
              <div className="pin_image">
                <img
                  onLoad={check_size}
                  src={pinDetails.img_blob}
                  alt="pin_image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="side" id="right_side">
          <div className="section1">
            <div className="select_size">
              <select defaultValue="small" name="pin_size" id="pin_size">
                <option value="small">small</option>
                <option value="large">large</option>
              </select>
              <div
                onClick={() =>
                  save_pin(pinDetails, currentUser.uid, props.add_pin)
                }
                className="save_pin"
              >
                Save
              </div>
            </div>
          </div>

          <div className="section2">
            <TextField
              margin="dense"
              required
              className="new_pin_input"
              id="pin_title"
              label="Title"
              variant="standard"
              size="small"
            />
            <TextField
              required
              margin="dense"
              className="new_pin_input"
              id="pin_description"
              label="Description"
              variant="standard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
