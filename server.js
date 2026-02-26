const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/libro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "listado.html"));
});

app.post("/api/reclamos", (req, res) => {
  const {
    tipo,
    consumidor_nombres,
    consumidor_dni,
    consumidor_email,
    consumidor_telefono,
    descripcion,
    pedido,
  } = req.body;

  if (!tipo || !consumidor_nombres || !descripcion || !pedido) {
    return res.status(400).json({ ok: false, message: "Faltan campos obligatorios." });
  }

  const fecha = new Date().toISOString().slice(0, 10);
  const codigo = "LR-" + Date.now();

  db.run(
    `INSERT INTO reclamos 
    (codigo, tipo, fecha, consumidor_nombres, consumidor_dni, consumidor_email, consumidor_telefono, descripcion, pedido)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      codigo,
      tipo,
      fecha,
      consumidor_nombres,
      consumidor_dni,
      consumidor_email,
      consumidor_telefono,
      descripcion,
      pedido,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ ok: false, message: "Error al guardar." });
      }

      res.json({
        ok: true,
        codigo,
        fecha,
      });
    }
  );
});

app.get("/api/reclamos", (req, res) => {
  db.all(`SELECT * FROM reclamos ORDER BY id DESC`, (err, rows) => {
    if (err) return res.status(500).json({ ok: false });
    res.json({ ok: true, rows });
  });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000/libro");
});