const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://jorseverino01:3h3ufBUA8rSw6kea@proyectogastos.jb4dm.mongodb.net/?retryWrites=true&w=majority&appName=ProyectoGastos";

const username = "jorseverino01";

const password = "3h3ufBUA8rSw6kea";

const clusterUrl = "ProyectoGastos.mongodb.net"; // Copia esto desde MongoDB Atlas

const clientDb = new MongoClient(
  uri
    .replace("<username>", username)
    .replace("<password>", password)
    .replace("<cluster-url>", clusterUrl),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = clientDb;
