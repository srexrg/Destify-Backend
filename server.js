import express from "express";
import fetchData from "./index.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import job from "./cron.js";

const app = express();
const port = process.env.PORT || 3001;
// job.start();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
});

app.use(cors());
app.use(bodyParser.json());

const Post = mongoose.model("Post", {
  type: String,
  preferences: String,
  budget: String,
  numTravelers: String,
  month: String,
  response: String,
});

app.post("/generate", async (req, res) => {
  const { preferences, budget, numTravelers, month } = req.body;

  try {
    const data = await fetchData(preferences, budget, numTravelers, month);

    if (data) {
      const newPost = new Post({
        type: "Destination",
        preferences,
        budget,
        numTravelers,
        month,
        response: data,
      });

      await newPost.save();
      res.send({ data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error getting",
    });
  }
});

app.get('/',(req,res)=>{
  res.send("Hello")
})

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
