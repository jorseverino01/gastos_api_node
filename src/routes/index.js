const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const clientDb = require("../mongodb");
const { debug } = require("console");

const filePath = path.join(
  "C:",
  "Users",
  "LENOVO",
  "OneDrive",
  "Escritorio",
  "Proyectos",
  "easysavingjson",
  "gastos.json"
);
const gastos = fs.readFileSync(filePath, "utf-8");
const gasto = JSON.parse(gastos);

router.get("/", async (req, res) => {
  let gastos = fs.readFileSync(filePath, "utf-8");
  let gasto = JSON.parse(gastos);

  try {
    // Seleccionar base de datos y colección
    const db = clientDb.db("gastospersonales");
    const collection = db.collection("gasto");

    const gastos_personales = await collection.find({}).toArray();
    res.send(gastos_personales);
  } catch (err) {
    res.send("Error al conectar con MongoDB Atlas:", err);
  }
});

router.post("/new_entry", async (req, res) => {
  const {
    monto,
    categoria,
    subcategoria,
    descripcion,
    id_gasto,
    datos_fecha,
    fecha_compra,
  } = req.body;

  let msg = "";

  if (
    !monto ||
    !categoria ||
    !subcategoria ||
    !descripcion ||
    !id_gasto ||
    !datos_fecha ||
    !fecha_compra
  ) {
    res.status(400).send("Datos incompletos.");
    return;
  }

  try {
    // Seleccionar base de datos y colección
    const db = clientDb.db("gastospersonales");
    const collection = db.collection("gasto");
    // Insertar un documento de ejemplo
    const result = await collection.insertOne({
      monto: monto,
      categoria: categoria,
      subcategoria: subcategoria,
      descripcion: descripcion,
      id_gasto: id_gasto,
      datos_fecha: datos_fecha,
      fecha_compra: fecha_compra,
    });
    msg = "Gasto guardado correctamente.";
  } catch (err) {
    console.error("Error al conectar con MongoDB Atlas:", err);
    msg = "Error al momento de guardar el gasto.";
  } finally {
    // Cerrar la conexión
    // await client.close();
  }
  res.send(msg);
});

module.exports = router;
