import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { maxHeight, maxWidth } from "@mui/system";
import Pin from "./Pin.js";
import axios from "axios";

// step 1: get all post from firebase with axios saved in  PinDatas (on mount will keep pulling from firestore)
// step 2: take the data and fill create Pin ojects
// step 3: render out the Pins in HomePage

const Home = () => {
  const [data, setData] = useState([]);

  const listItems = data.map((e) => (
    <div className="cards">
      <img src={e.img_blob}></img>
      <div className="card-text-title">{e.title}</div>
      <div className="card-text-description">{e.description}</div>
    </div>
  ));

  async function getData() {
    //axios data call
    //const res = await axios.get("/route")
    //const dummyData = res.data -> will look like that:
    const dummyData: Pin[] = [
      {
        title: "test1",
        description: "fit1",
        img_blob:
          "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
      },
      {
        title: "test2",
        description: "fit2",
        img_blob:
          "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
      },
      {
        title: "test3",
        description: "fit3",
        img_blob:
          "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
      },
      {
        title: "test4",
        description: "fit4",
        img_blob:
          "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/postImages%2F10.jfif?alt=media&token=4237b889-0abe-4bc7-9341-896c7d8d9e14",
      },
    ];
    setData(dummyData);
  }

  return (
    <div className="Blank snap">
      {listItems}

      <button onClick={getData}>API CALL</button>
    </div>
  );
};
export default Home;