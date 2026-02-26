const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "reclamaciones.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reclamos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL UNIQUE,
      tipo TEXT NOT NULL,
      fecha TEXT NOT NULL,
      consumidor_nombres TEXT NOT NULL,
      consumidor_dni TEXT,
      consumidor_email TEXT,
      consumidor_telefono TEXT,
      descripcion TEXT NOT NULL,
      pedido TEXT NOT NULL
    )
  `);
});

module.exports = db;