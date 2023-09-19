import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./Products.json');

app.get('/products', async (req,res) => {
    const productLimit = [];
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    if(!limit){
        res.send(products);
    }
    else if(limit <= products.length){
        for (let i = 0; i < limit; i++) {
            const product = products[i];
            productLimit.push(product);
        }
    res.send(productLimit)
    }
    else{
        res.send("Ha superado el limite de productos");
    }
})

app.get('/products/:id', async (req,res) => {
    const pId = Number(req.params.id);
    const productById = await productManager.getProductById(pId);
    if(productById){
        res.send(productById);
    }else{
        res.send("No existe el producto para el id ingresado")
    }
    
})

app.listen(8080,()=>console.log("Listening on 8080"))