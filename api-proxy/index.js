import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/games", async (req, res) => {
  try {
    const platform = req.query.platform || "all";
    const url = `https://www.freetogame.com/api/games?platform=${platform}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.listen(3001, () => {
  console.log("Proxy running on http://localhost:3001");
});
