const app = require("./app");
const clientDb = require("./mongodb");
const clienteDb = require("./mongodb");

// Conexion con la mongodb
// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://jorseverino01:3h3ufBUA8rSw6kea@proyectogastos.jb4dm.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoGastos";
// const username = "jorseverino01";
// const password = "3h3ufBUA8rSw6kea";
// const clusterUrl = "ProyectoGastos.mongodb.net"; // Copia esto desde MongoDB Atlas
// const client = new MongoClient(
//   uri
//     .replace("<username>", username)
//     .replace("<password>", password)
//     .replace("<cluster-url>", clusterUrl),
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

async function main() {
  app.listen(app.get("port"));
  console.log("server on port ", app.get("port"));

  try {
    // Conectar al cliente
    await clienteDb.connect();
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error al conectar con MongoDB Atlas:", err);
  } finally {
    // Cerrar la conexión
    // await clientDb.close();
  }
}

main();
