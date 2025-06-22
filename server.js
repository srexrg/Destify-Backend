import express from "express";
import fetchData from "./index.js";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";


const app = express();
const port = process.env.PORT || 3001;


app.use(cors({
  origin:"https://destify.vercel.app",
  methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"]
}));

app.use(bodyParser.json());



app.post("/generate", async (req, res) => {
  const { preferences, budget, numTravelers, month } = req.body;
  console.log(req.body);

  try {
    const data = await fetchData(preferences, budget, numTravelers, month);

      res.send({ data });
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
