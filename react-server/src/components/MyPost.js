import React, { Component } from "react";
import { useState, useEffect } from "react";

import "../styles/my_post.css";
import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";
import background from "../img/backgrounds.jpeg";
import { useAuth } from "../contexts/AuthContext";

import axios from "axios";

//GET all post with userID
import { UserProfile } from "./UserProfile";
import PostModal from "./posts/PostModal";

async function getUser(user_id) {
  try {
    const response = await axios.post("http://localhost:80/users/get", {
      id: user_id,
    });
    //console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function getUserPostData(post_ids) {
  const requests = post_ids.map((post_id) =>
    axios.post("http://localhost:80/post/get", { id: post_id })
  );
  const responses = await Promise.all(requests);
  console.log(responses.map((response) => response.data.content.id));
  return responses.map((response) => response.data);
}

const FetchPost = (props) => {
  const [pin, addPin] = useState([]);

  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  async function fetchData() {
    const userData = await getUser(currentUser.uid);
    setUser(userData);
    const postData = await getUserPostData(userData.posts);
    setData(postData);
  }

  // <div key={e.content.id} className="flex flex-col">
  //         <img className="w-96 h-auto" src={e.content.image_url}></img>
  //         <div className="card-text">{e.content.title}</div>
  //         <div className="card-text">{e.content.description}</div>
  //       </div>

  return (
    <div className="pin_container">
      {data.map((e) => (
        <Pin
          key={e.content.id}
          title={e.content.title}
          image_url={e.content.image_url}
        />
      ))}

      <button className=" mt-36 w-96 h-auto" onClick={fetchData}>
        FETCH DATA CALL
      </button>
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

  //For clicking POST MODAL
  state = {
    //For the post modal
    postModalIsOpen: false,
  };

  togglePostModal = () => {
    //Function to set postModalIsOpen to true or false
    this.setState({ postModalIsOpen: !this.state.postModalIsOpen });
  };

  post = {
    title: "test1",
    url: "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
    description: "fit1",
    user_name: "testUser",
    user_pfp: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
  };

  render() {
    return (
      <div className="overflow-x-hidden">
        <UserProfile
          backImg={background}
          profImg={picture}
          username={"username"}
          post={"3"}
        />
        <FetchPost />

        <button
          onClick={this.togglePostModal}
          className="relative left-80 bg-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500"
        >
          Hide
        </button>
        <PostModal
          post={this.post}
          isOpen={this.state.postModalIsOpen}
          toggleModal={this.togglePostModal}
        />
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
