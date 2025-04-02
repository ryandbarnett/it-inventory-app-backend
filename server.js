const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const db = new Database('inventory.db');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve frontend if needed

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial TEXT,
    assetTag TEXT,
    device TEXT,
    make TEXT,
    campus TEXT,
    building TEXT,
    room TEXT,
    user TEXT,
    techName TEXT,
    deploymentDate TEXT,
    loanDate TEXT
  )
`).run();

app.post("/submit", (req, res) => {
  console.log("Received form data:", req.body);

  const item = req.body;
  const stmt = db.prepare(`
    INSERT INTO inventory (
      serial, assetTag, device, make, campus,
      building, room, user, techName, deploymentDate, loanDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    item.serial,
    item.assetTag,
    item.device,
    item.make,
    item.campus,
    item.building,
    item.room,
    item.user,
    item.techName,
    item.deploymentDate,
    item.loanDate
  );

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});