import React, { Component } from "react";
import { useState, useEffect } from "react";

import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import picture from "./accounts/profile.webp";
import background from "../img/backgrounds.jpeg";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { UserProfile } from "./UserProfile";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import "../styles/my_post.css";

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
  console.log(responses.map((response) => response.data.content.id));
  console.log("Calling axios from getUserPostData MyPost");
  return responses.map((response) => response.data);
}

const FetchPost = (props) => {
  const [pin, addPin] = useState([]);

  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(currentUser.uid);
      setUser(userData);
      const postData = await getUserPostData(userData.posts);
      setData(postData);
    }
    fetchData();
  }, [currentUser.uid]);

  return (
    <div className="pin_container">
      {data.map((e) => (
        <Pin
          key={e.content.id}
          post_id={e.content.id}
          title={e.content.title}
          image_url={e.content.image_url}
          profile_pic_url={e.user.profile_pic_url}
          display_name={e.user.display_name}
          cur_user_id={currentUser.uid}
          description={e.content.description}
          user_id={e.content.user_id}
          likes={e.content.likes}
          tags={e.content.tags}
        />
      ))}
    </div>
  );
};

export { FetchPost };

function scrollTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function disableScroll() {
  var xPos = 0;
  var yPos = 0;
  window.onscroll = function () {
    window.scrollTo(xPos, yPos);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_modal: false,
      pins: [],
    };
  }

  add_pin = () => {
    this.setState((_state) => {
      return {
        show_modal: false,
      };
    });
  };

  add_post = (postDetails) => {
    this.setState((_state) => {
      const new_pins = [..._state.pins];

      new_pins.push(
        <Pin pinDetails={this.postDetails} key={_state.pins.length} />
      );

      return {
        pins: new_pins,
      };
    });
  };

  render() {
    return (
      <div className="overflow-x-hidden">
        <UserProfile
          backImg={background}
          profImg={picture}
          username={"username"}
          post={"0"}
        />

        <FetchPost />

        <div>
          <div className="fixed bottom-0 right-0 z-1 ">
            <Fab
              onClick={() => {
                this.setState({ show_modal: true });
                scrollTop();
                disableScroll();
              }}
              color="primary"
              aria-label="add"
              size="large"
            >
              <AddIcon />
            </Fab>
          </div>

          <div className="pin_container">{this.state.pins}</div>

          <div
            onClick={(event) => {
              event.target.className === "add_pin_modal"
                ? this.setState({ show_modal: false })
                : enableScroll();
              enableScroll();
            }}
            className="add_pin_modal_container"
          >
            {this.state.show_modal ? <Modal add_pin={this.add_pin} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPost;
