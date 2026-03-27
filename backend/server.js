require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("myDatabase");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

app.get("/items", async (req, res) => {
  try {
    const items = await db
      .collection("items")
      .find({})
      .toArray();

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const result = await db
      .collection("items")
      .insertOne(req.body);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});