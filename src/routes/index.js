const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const clientDb = require("../mongodb");
const { debug } = require("console");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
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
    res.status(400).send("DATA_INCOMPLETE");
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
    msg = "SUCCESS";
  } catch (err) {
    console.error("Error al conectar con MongoDB Atlas:", err);
    msg = "ERROR";
  } finally {
    // Cerrar la conexión
    // await client.close();
  }
  res.send(msg);
});

router.post("/delete_id", async (req, res) => {
  const { id } = req.body;

  let msg = "";

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({ msg: "INVALID_ID" });
  }

  try {
    // Seleccionar base de datos y colección
    const db = clientDb.db("gastospersonales");
    const collection = db.collection("gasto");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      msg = "SUCCESS";
    } else {
      msg = "NOT_FOUND"; // No se encontró el documento a eliminar
    }
  } catch (err) {
    console.error("Error al conectar con MongoDB Atlas:", err);
    msg = "ERROR";
  } finally {
    // Cerrar la conexión
    // await client.close();
  }
  res.send(msg);
});

module.exports = router;
