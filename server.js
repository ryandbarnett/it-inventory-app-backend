const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/submit", (req, res) => {
  console.log(req.body); // Save to DB, etc.
  res.send("OK");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
