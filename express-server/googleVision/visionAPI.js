const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "APIkey.json",
});

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

