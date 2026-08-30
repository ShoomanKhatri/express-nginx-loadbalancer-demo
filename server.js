import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("Hostname:", process.env.HOSTNAME);
  res.send(
    `Backend is running on port ${port}, hostname: ${process.env.HOSTNAME}`,
  );
});

app.get("/health", (req, res) => {
  res.send("backend is healthy");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
