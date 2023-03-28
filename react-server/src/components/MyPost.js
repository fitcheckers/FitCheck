import React, { Component } from "react";
import { useState, useEffect } from "react";

import "../styles/my_post.css";
import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import picture from "./accounts/profile.webp";
import background from "../img/backgrounds.jpeg";
import { useAuth } from "../contexts/AuthContext";

import axios from "axios";

//GET all post with userID
import { UserProfile } from "./UserProfile";

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
    axios.post("http://localhost:80/post/get", { id: post_id }).catch((error) => {
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
          title={e.content.title}
          image_url={e.content.image_url}
          user_pfp={currentUser.photoURL}
          user_name={currentUser.displayName}
          description={e.content.description}
        />
      ))}
    </div>
  );
};

export { FetchPost };

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
              onClick={() => this.setState({ show_modal: true })}
              color="primary"
              aria-label="add"
              size="large"
            >
              <AddIcon />
            </Fab>
          </div>

          <div className="pin_container">{this.state.pins}</div>

          <div
            onClick={(event) =>
              event.target.className === "add_pin_modal"
                ? this.setState({ show_modal: false })
                : null
            }
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
