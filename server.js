import express from "express";
import fetchData from "./index.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL);

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model("User", {
  user_id: String,
});
const Post = mongoose.model("Post", {
  type: String,
  preferences: String,
  budget: String,
  numTravelers: String,
  month: String,
  response: String,
  user_id: String,
});

app.post("/generate", async (req, res) => {
  const { preferences, budget, numTravelers, month, user_id } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      user = new User({
        user_id,
      });

      await user.save();

      const data = await fetchData(preferences, budget, numTravelers, month);

      if (data) {
        const newPost = new Post({
          type: "Destination",
          preferences,
          budget,
          numTravelers,
          month,
          response: data,
          user_id,
        });

        await user.save();
        await newPost.save();
        res.send({ data });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error getting",
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
