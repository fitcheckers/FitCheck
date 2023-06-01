"use strict";

require('dotenv').config();
const app = require("../../server");
const multer = require('multer');
const path = require('path');

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: multer.memoryStorage({}),
    limits: { fileSize: 2000000 },
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
});

function predictImage(imageURL) {
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "aaa03c23b3724a16a56b629203edc62c",
                inputs: imageURL
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }
                
                let results = [];
                for (const c of response.outputs[0].data.concepts) {
                    results.push({
                        name: c.name,
                        value: c.value
                    })
                }
                resolve(results);
            }
        );
    })
}

app.post("/clarifai/predict", async (req, res) =>{
    try{
        const { imageURL } = req.body;
        const imageObject = [{
            data: {
                image: {
                    url: imageURL
                }
            }
        }];
        const results = await predictImage(imageObject)
        return res.send({results})
    } catch(err) {
        return res.status(400).send({
            error: err
        })
    }
})

app.post("/clarifai/upload", upload.single('file'), 
async (req, res) => {
    try{
        const input = [
            {
                data: {
                    image: {
                        base64: req.file.buffer
                    }
                }
            }
        ]
        const result = await predictImage(input);
        return res.send({
            result
        })
    } catch (err) {
        res.status(400).send({
            error: err
        })

    }
})