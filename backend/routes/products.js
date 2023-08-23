import {
  getProductList,
  readProductByFirebaseID,
  createOneStudent,
  updateOneStudent,
  deleteStudent,
} from "../db/data-firebase.js";

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

app.get("/api/read/id", async (req, res) => {
  await handleResponse(readProductByFirebaseID(req.params.firebase_id), res);
});
// create student
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      //console.log(req.body);
      res.setHeader("Content-Type", "application/json");
      const DocId = await createOneStudent(req.body.student);
      return res.status(200).send(`Document written with ID:  ${DocId}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
// update
app.put("/api/update/:item_id", async (req, res) => {
  await handleResponse(updateOneStudent(req.params.item_id, req.body.student), res);
});
// delete
app.delete("/api/delete/:item_id", async(req, res) => {
  await handleResponse(deleteStudent(req.params.item_id), res);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;