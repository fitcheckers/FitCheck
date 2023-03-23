import React, { Component } from "react";

import "../styles/my_post.css";
import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";
import background from "../img/backgrounds.jpeg";
import { useAuth } from "../contexts/AuthContext";
import PostModal from "./posts/PostModal";


const UserProfile = ({ backImg, post }) => {
  const { currentUser } = useAuth();

  return (
    <div>
      <img
        className="left-12 -z-10 top-[80px] w-screen h-52 relative object-cover bg-center"
        src={backImg}
        alt="background cover"
      ></img>
      <img
        className="w-48 h-48 rounded-full object-cover relative left-24"
        src={currentUser.photoURL || picture}
        alt="profile"
      ></img>
      <p className="relative left-80 text-lg font-bold -mt-28">
        @{currentUser.displayName}
      </p>
      <p className="relative left-80 text-lg">{post} Post</p>
      <a
        href="/Profile"
        className="relative left-80 bg-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500"
      >
        Edit Profile
      </a>
      <HiOutlineSquares2X2 size="32" className="relative left-24 top-16" />
      <p className="relative left-32 top-9 font-extrabold text-xl -mb-10">
        My Posts
      </p>
    </div>
  );
};
export { UserProfile };

class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pins: [],
      show_modal: false,
    };

  }

  add_pin = (pinDetails) => {
    this.setState((_state) => {
      const new_pins = [..._state.pins];

      new_pins.push(<Pin pinDetails={pinDetails} key={_state.pins.length} />);

      return {
        pins: new_pins,
        show_modal: false,
      };
    });
  };

  //For clicking POST MODAL
  state = { //For the post modal
    postModalIsOpen: false
  };

  togglePostModal = () => { //Function to set postModalIsOpen to true or false
    this.setState({ postModalIsOpen: !this.state.postModalIsOpen });
  }

  post = {
    title: "test1",
    url:"https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
    description:"fit1",
    user_name: "testUser",
    user_pfp: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
  }


  render() {
    return (
      <div className="overflow-x-hidden">
        <UserProfile
          backImg={background}
          profImg={picture}
          username={"username"}
          post={"3"}
        />
        <button
          onClick={this.togglePostModal}
          className="relative left-80 bg-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500"
          >
          Hide
        </button>
        <PostModal post={this.post} isOpen={this.state.postModalIsOpen} toggleModal={this.togglePostModal} />
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
