"use strict";

const app = require("../../server");
const vision = require("@google-cloud/vision");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const client = new vision.ImageAnnotatorClient({
  keyFilename: "APIkey.json",
});


app.post("/vision/label", upload.single("file"), function (req, res, next) {
  client
    .labelDetection(req.file.path)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


app.post("/vision/object", upload.single("file"), function (req, res, next) {
  client
    .objectLocalization(req.file.path)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
const detectLabelClothes = async (file_path) => {
  const [result] = await client.labelDetection(file_path);
  const labels = result.labelAnnotations;

  labels.forEach((object) => {
    if (object.description === "Outerwear" && object.score > 0.8) {
      return true;
    }
  });

  return false;
};

const detectObjectClothes = async (file_path) => {
  const [result] = await client.objectLocalization(file_path);

  const labels = result.localizedObjectAnnotations;

  labels.forEach((object) => {
    if (object.name === "Outerwear" && object.score > 0.85) {
      return true;
    }
  });
  return false;
};

const detectExplicitContent = async (file_path) => {
  const [result] = await client.safeSearchDetection(file_path);
  const detections = result.safeSearchAnnotation;
  console.log("Safe search:");
  console.log(`Adult: ${detections.adult}`);
  console.log(`Medical: ${detections.medical}`);
  console.log(`Spoof: ${detections.spoof}`);
  console.log(`Violence: ${detections.violence}`);
  console.log(`Racy: ${detections.racy}`);
};


*/
