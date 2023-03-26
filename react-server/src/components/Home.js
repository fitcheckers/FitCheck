import React, { Component } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { maxHeight, maxWidth } from "@mui/system";
import Pin from "./Pin.js";
import axios from "axios";
import { FetchPost } from "./MyPost.js";
class HomePage extends Component {
  //get all posts in collection
  // convert them into pins object and store them in pin array
  // render them into pin container

  render() {
    return (
      <div>
      </div>
    );
  }
}

//fetch post title, desp img frm firstore post

const itemData = [
  {
    title: "test1",

    description: "fit1",
  },
  {
    img: "./fitpics/2.jfif",
    title: "fit2",
  },

  {
    img: "./fitpics/4.jfif",
    title: "fit4",
  },
  {
    img: "./fitpics/5.jfif",
    title: "fit5",
  },
  {
    img: "./fitpics/6.jfif",
    title: "fit6",
  },
  {
    img: "./fitpics/7.jfif",
    title: "fit7",
  },
  {
    img: "./fitpics/8.jfif",
    title: "fit8",
  },
  {
    img: "./fitpics/9.jfif",
    title: "fit9",
  },
  {
    img: "./fitpics/10.jfif",
    title: "fit10",
  },
  {
    img: "./fitpics/11.jfif",
    title: "fit11",
  },
  {
    img: "./fitpics/12.jfif",
    title: "fit12",
  },
  {
    img: "./fitpics/1.jfif",
    title: "fit1",
  },
  {
    img: "./fitpics/2.jfif",
    title: "fit2",
  },

  {
    img: "./fitpics/4.jfif",
    title: "fit4",
  },
  {
    img: "./fitpics/5.jfif",
    title: "fit5",
  },
  {
    img: "./fitpics/6.jfif",
    title: "fit6",
  },
  {
    img: "./fitpics/7.jfif",
    title: "fit7",
  },
  {
    img: "./fitpics/8.jfif",
    title: "fit8",
  },
  {
    img: "./fitpics/9.jfif",
    title: "fit9",
  },
  {
    img: "./fitpics/10.jfif",
    title: "fit10",
  },
  {
    img: "./fitpics/11.jfif",
    title: "fit11",
  },
  {
    img: "./fitpics/12.jfif",
    title: "fit12",
  },
];

export default HomePage;
