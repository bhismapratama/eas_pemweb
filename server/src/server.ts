import express from "express";
import payload from "payload";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import multer from "multer";

require("dotenv").config();

const app = express();

// middleware kak
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.redirect("/admin");
});

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
let database;

try {
  MongoClient.connect(MONGODB_CONNECTION, (error, client) => {
    if (error) {
      console.error("salah hubung bang:", error);
      return;
    }
    database = client.db(MONGODB_DATABASE);
    console.log("connect lah masa ngga :D");
  });
} catch (error) {
  console.error("salah hubung bang:", error);
}

app.get("/api/GetStatus", async (request, response) => {
  try {
    const result = await database.collection("forms").find({}).toArray();
    console.log(result);
    
    response.json(result);
  } catch (error) {
    response.status(500).json({ message: "kebanyakan pikiran jadi error" });
  }
});

app.post("/api/AddForm", multer().none(), async (request, response) => {
  try {
    const nama = request.body.nama;
    const email = request.body.email;
    const alamat = request.body.alamat;
    const status = request.body.status;
    const currentTimestamp = new Date();
    const current_date = new Date();

    await database.collection("forms").insertOne({
      nama: nama,
      email: email,
      alamat: alamat,
      status: status,
      published_date: currentTimestamp,
      timestamp_date: current_date.toDateString(),
      timestamp_time: current_date.toLocaleTimeString(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    await database.collection("changelogs").insertOne({
      type: nama,
      title: nama,
      action: status,
    });

    response.json("pun saestu ditambah");
  } catch (error) {
    response.status(500).json({ message: "kebanyakan pikiran jadi error" });
  }
});

app.listen(PORT, () => {
  console.log(`Payload Admin Panel running on port ${PORT}`);
});
