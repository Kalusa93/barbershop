const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {

    products: (req, res) => {
        res.render('products/products', {products, title: 'Todos los productos'});
    },

    national: (req, res) => {
        let national = products.filter( product => product.category == 'national')

        res.render('products/products', {products: national, title: 'National'});
    },

    imported: (req, res) => {
        let imported = products.filter( product => product.category == 'international')

        res.render('products/products', {products: imported, title: 'Imported'});
    },

    detail: (req, res) => {
        const id = req.params.id;

        const product = products.find((product) => product.id == id);

        res.render('products/productDetail', {product});
    },

    add: (req, res) => {
        res.render('products/addProduct');
    },
    
    create: (req, res) => {
        const image = req.file ? req.file.filename : "default-image.png";
        
        const newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            type: req.body.type,
            barber: req.body.barber,
            description: req.body.description,
            image,
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

        if(req.file)  products[indice].image = req.file.filename;

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