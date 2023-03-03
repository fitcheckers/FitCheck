import React, { Component } from "react";

import "../styles/my_post.css";
import Pin from "./Pin.js";
import Modal from "./Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
    );
  }
}

export default MyPost;
