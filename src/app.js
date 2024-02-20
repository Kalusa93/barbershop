//Sección de Requerimiento de Módulos
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userLogged = require("../src/middlewares/userLoggedMiddleware");
const { connectToDb, getDb } = require('./db')

app.use(express.json())

//DB connection
let db

connectToDb((err) => {
	if(!err) {
		app.listen(3000, () => {
			console.log("Servidor corriendo en http://localhost:3000/")
		})
		db = getDb()
	}
})

app.get('/products', (req, res) => {
	let products = []

	db.collection('aukany2')
		.find()
		.sort({id: 1})
		.forEach(product => products.push(product))
		.then(() => {
			res.status(200).json(products)
		})
		.catch(() => {
			res.status(500).json({error: 'No se pudo obtener los documentos'})
		})
})

app.get('/products/:id', (req, res) => {

	if(ObjectId.isValid(req.params.id)) {
		db.collection('aukany2')
		.findOne({_id: new ObjectId(req.params.id)})
		.then(doc => {
			res.status(200).json(doc)
		})
		.catch(err => {
			res.status(500).json({error: 'No se pudo obtener el documento'})
		})
	} else {
		res.status(500).json({error: 'El id del documento es inválido'})
	}
})

app.post('/products', (req, res) => {
	let product = req.body

	db.collection('aukany2')
		.insertOne(product)
		.then((result) => {
			res.status(201).json(result)
		})
		.catch(err => {
			res.status(500).json({error: 'No se pudo crear el documento'})
		})
})

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
		secret: "Aukany secret",
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
const { ObjectId } = require("mongodb");

//Sección de Rutas
app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
	res.status(404).render("not-found");
});

//Sección de levantar el Server

