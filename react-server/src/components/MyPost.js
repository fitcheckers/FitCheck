import React, { Component } from "react";

import "../styles/my_post.css";
import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import picture from "./accounts/profile.webp";

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
  
  
  render() {
    return (
      <div className="overflow-x-hidden">
        <div>
          <img className="w-48 relative top-32 left-24 rounded-full" src={picture} alt="profile"></img>
          <p className="relative left-80 text-lg font-bold">@username</p>
          <p className="relative left-80 text-lg">2 Post</p>
          <a href="/Profile" className="relative left-80 bg-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-full hover:bg-gray-500">Edit Profile</a>
          <HiOutlineSquares2X2 size="32" className="relative left-24 top-16" />
          <p className="relative left-32 top-9 font-extrabold text-xl">My Posts</p>
        </div>
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
