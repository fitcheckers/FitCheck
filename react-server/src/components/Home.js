import React, { Component } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { maxHeight, maxWidth } from "@mui/system";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import Pin from "./Pin.js";
import axios from "axios";
import { FetchPost } from "./MyPost.js";


function printName(title){
  console.log(title);
}

function HomePage(){
  const [show, setShow] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  //get all posts in collection
  // convert them into pins object and store them in pin array
  // render them into pin container

  return (
    <Box
      sx={{
        width: maxWidth,
        height: maxHeight,
        paddingLeft: 12,
        paddingRight: 4,
        paddingTop: 15,
      }}
    >
      <ImageList variant="masonry" cols={5} gap={25}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}
          onMouseOver={() => setHoveredItem(item)}
          onMouseOut={() => setHoveredItem(null)}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: 20 }}
                onClick={() => printName(item.title)} 
              />
              {hoveredItem === item && ( <ImageListItemBar
                className="rounded-b-2xl"
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />)}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

//fetch post title, desp img frm firstore post

const itemData = [
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