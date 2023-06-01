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

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

let imageUrl = "";
let file;

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function upload_img(
  event,
  pinDetails,
  setPinDetails,
  setShowLabel,
  setShowModalPin,
  setContainOuterwearLabel,
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
  //console.log(file);
  const data = new FormData();
  data.append("file", file);

  axios
    .post("http://localhost:80/clarifai/upload", data)
    .then(response => {
      const predict = response.data.result;
      console.log(predict);
      predict.forEach((object) => {
        if (
          (object.name === "outerwear" ||
            object.name === "top" ||
            object.name === "fashion" ||
            object.name === "jacket" ||
            object.name === "casual" ||
            object.name === "shoe" ||
            object.name === "denim" ||
            object.name === "model" ||
            object.name === "dress" ||
            object.name === "fashionable" ||
            object.name === "wear" ||
            object.name === "sneakers" ||
            object.name === "shorts" ||
            object.name === "pants") &&
          object.value >= 0.5
        ) {
          setContainOuterwearLabel(true);
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });
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
    if (!containOuterwearLabel) {
      // if img is not clothes, it wont upload
      console.log(containOuterwearLabel);
      console.log("DOES NOT CONTAIN CLOTHES");
      setError("Please use an appropriate image for Fitcheck Please!");

      // window.location.reload(false);

      return;
    }
    console.log(" Contain CLOTHES");

    imageUrl = await image_upload(file);

    const post_data = {
      image_url: imageUrl,
      description: document.querySelector("#pin_description").value,
      title: document.querySelector("#pin_title").value,
      user_id: user,
      tags: chipData.map((chip) => chip.label),
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
  const [containOuterwearLabel, setContainOuterwearLabel] = useState(false);
  const { currentUser, setError } = useAuth();

  const [chipData, setChipData] = useState([]);
  const [tags, setTags] = useState("");

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tags.trim() === "") return;
      const label = tags.trim();
      if (chipData.some((chip) => chip.label === label)) {
        setError("The tag is already in the list.");
        return;
      }
      setChipData((chips) => [...chipData, { key: chips.length, label: tags }]);
      setTags("");
    }
  }

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
                  <div className=" decoration-solid">Click to Upload</div>
                  <div className="text-sm font-thin">
                    Recommendation: Use high-quality .jpg less than 20MB
                    <br />
                    Please Use Appropriate Images
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
                    setShowModalPin,
                    setContainOuterwearLabel,
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
            <div>
              <button
                id="reupload_image"
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reupload
              </button>
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
                onClick={() => {
                  if (
                    document.querySelector("#pin_description").value &&
                    document.querySelector("#pin_title").value &&
                    pinDetails.img_blob &&
                    chipData.length > 0
                  ) {
                    save_pin(pinDetails, currentUser.uid, props.add_pin);
                  } else if (
                    document.querySelector("#pin_description").value &&
                    document.querySelector("#pin_title").value &&
                    pinDetails.img_blob &&
                    chipData.length === 0
                  ) {
                    setError(
                      "Please press enter in the tags field to confirm!"
                    );
                  } else {
                    setError(
                      "Please fill out all the fields before making a post!"
                    );
                  }
                }}
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
            <TextField
              required
              margin="dense"
              className="new_pin_input"
              id="pin_tags"
              label="Tags"
              variant="standard"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyDown={handleKeyDown}
              inputProps={{
                list: "style",
              }}
            />
            <datalist id="style">
              <option value="Artsy" />
              <option value="Athleisure" />
              <option value="Business" />
              <option value="Biker" />
              <option value="Casual" />
              <option value="Classic" />
              <option value="Hipster" />
              <option value="Kawaii" />
              <option value="Korean" />
              <option value="Minimalist" />
              <option value="Sporty" />
              <option value="Street" />
            </datalist>
            {chipData.length > 0 ? (
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 1,
                  mt: 2,
                }}
                component="ul"
              >
                {chipData.map((data) => {
                  let icon;

                  return (
                    <ListItem key={data.key}>
                      <Chip
                        icon={icon}
                        label={data.label}
                        onDelete={handleDelete(data)}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
            ) : (
              <Paper
                sx={{
                  display: "none",
                }}
                component="ul"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
