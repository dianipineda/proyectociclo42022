const express = require("express"); // permite traer los modulos de node
const morgan = require("morgan"); // muestra el detalle de como van las peticiones
const path = require("path"); // obtiene la ruta absoluta desde la raiz del dsco duro hasta la carpeta del proyecto. Esta sirve para encontrar los archivos  publicos o estaticos de la aplicación
const { mongoose } = require("./database");
const app = express();

//Ajustes:
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.json()); // establece que todas las peticiones y respuestas seran tipo json

//Rutas
app.use("/api", require("./rutas/rutas"));

//Archivos estáticos:
app.use(express.static(path.join(__dirname, "public")));
app.listen(app.get("port"), () =>
  console.log("Server inicialized in port " + app.get("port"))
);
