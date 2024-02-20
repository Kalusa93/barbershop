const fs = require("fs");
const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

const productsController = {

    products: async (req, res) => {
        try {
            const db = getDb();
            const products = await db.collection('aukany2').find().sort({ id: 1 }).toArray();
            res.render('products/products', { products, title: 'Productos' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    detail: async (req, res) => {

        try {
            const db = getDb();
            const product = await db.collection('aukany2').findOne({_id: new ObjectId(req.params.id)});
            /* if (!product) {
                return res.status(404).send('Producto no encontrado');
            } */
            res.render('products/productDetail', { product });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    add: (req, res) => {
        res.render('products/addProduct');
    },
    
    create: (req, res) => {
        let images = [];
        
        // Verificar si se enviaron archivos
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                images.push(file.filename);
            });
        } else {
            images.push("default-image.png");
        }
        
        const newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            type: req.body.type,
            barber: req.body.barber,
            description: req.body.description,
            date: req.body.date,
            images,
        };

        products.push(newProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        res.redirect("/products");
    },
    
    edit: (req, res) => {
        let id = req.params.id;

        let productToEdit = products.find(p => p.id == id);

        res.render('products/editProduct', {productToEdit});
    },
    
    update: (req, res) => {
        let indice = products.findIndex(p => p.id == req.params.id);
        
        products[indice].name = req.body.name
        products[indice].type = req.body.type
        products[indice].barber = req.body.barber
        products[indice].description = req.body.description
        products[indice].date = req.body.date

        if (req.files && req.files.length > 0) {
            let newImages = [];
            req.files.forEach(file => {
                newImages.push(file.filename);
            });
            products[indice].images = newImages; // Reemplazar las imágenes antiguas con las nuevas
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        res.redirect("/products");
    },

    delete: (req, res) => {
        let indice = products.findIndex(p => p.id == req.params.id);

        products.splice(indice, 1);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        res.redirect("/products");
    }
};

module.exports = productsController;