import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ff/id/emotes", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      status: false,
      message: "UID required"
    });
  }

  try {
    const response = await axios.post(
      "https://<PRIVATE_FF_ID_ENDPOINT>", // 🔴 Indonesia endpoint
      {
        uid: uid,
        region: "ID"
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Content-Type": "application/json"
        }
      }
    );

    const emotes = response.data?.profile?.emotes || [];

    res.json({
      status: true,
      server: "Indonesia",
      uid: uid,
      emotes: emotes
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch live emotes"
    });
  }
});

app.get("/", (req, res) => {
  res.send("FF INDONESIA LIVE API RUNNING");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
