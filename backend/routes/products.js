import {
  getProductList,
  readProductByFirebaseID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db/data-firebase.js";

import { uploadFile } from "../db/img-firebase.js";

//const express = require('express')
import express from "express";
import cors from "cors";
//const router = express.Router();
const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Students!");
});

const handleResponse = async (promise, res) => {
  try {
    const result = await promise;
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
// read all student
app.get("/api/read", async (req, res) => {
  await handleResponse(getProductList(), res);
});
// read one student

app.get("/api/read/:id", async (req, res) => {
  await handleResponse(readProductByFirebaseID(req.params.id), res);
});
// create student
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      //console.log(req.body);
      res.setHeader("Content-Type", "application/json");
      const DocId = await createProduct(req.body);
      return res.status(200).send(`Document written with ID:  ${DocId}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
// update
app.put("/api/update/:item_id", async (req, res) => {
  //console.log(req.body);
  await handleResponse(
    updateProduct(req.params.item_id, req.body),
    res
  );
});
// delete
app.delete("/api/delete/:item_id", async (req, res) => {
  await handleResponse(deleteProduct(req.params.item_id), res);
});

import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Define an API route for photo upload
app.post("/api/upload", upload.single("photo"), async (req, res) => {
  (async () => {
    try {
      //console.log(req.file);
      if (!req.file) {
        return res.status(400).json({ error: "No file provided." });
      }
      const url = await uploadFile(req.file.buffer);
      return res.status(200).send(url);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
