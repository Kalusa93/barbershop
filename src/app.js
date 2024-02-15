//Sección de Requerimiento de Módulos
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userLogged = require("../src/middlewares/userLoggedMiddleware");
const mongoose = require('mongoose')
const Product = require('./models/productModel')

//Sección de Configuración de Carpeta de Archivos Estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

//Sección de Configuración de Motor de Plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Seccion de Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(
	session({
		secret: "aukany secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookieParser());

app.use(userLogged);

//Sección de Requerimiento de Rutas
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const usersRouter = require("./routes/users");

//Sección de Rutas
app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
	res.status(404).render("not-found");
});

//Sección de levantar el Server
//app.listen(3000, () => {
//	console.log("Servidor corriendo en http://localhost:3000/");
//});

mongoose.
connect(`mongodb+srv://lucaslegui21:37530791lukas@barbershop.9ixfa1q.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})
