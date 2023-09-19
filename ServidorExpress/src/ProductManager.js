import {promises} from 'fs';


export default class ProductManager {

    constructor(path){
        this.path=path;
    }

    getProducts = async () =>{
        try{
                const data = await promises.readFile(this.path, 'utf-8')
                const products = JSON.parse(data);
                return products;
        }
        catch(error){
            console.log(error);
        }
    }

    addProducts = async (product) => {
        try{
            const products = await this.getProducts();

            if ( products.length === 0 ){
                product.id = 1;
            }else{
                product.id = products[products.length - 1].id + 1;
            }

            if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
                console.log("Some fields are missing");
            }else{
                const productCode = products.find ( products => products.code === product.code);
    
            if(!productCode){
                products.push(product);

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

                return product;
            }else{
                console.log(`The code ${product.code} already exists`)
            }
            }
        }

        catch(error){
            console.log(error);
        }
        
    }

    getProductById = async (idProduct) => {
        try{
            const products = await this.getProducts()
            
            const productIndex = products.find(product => product.id === idProduct);

            if(productIndex === -1){
                console.log("Not Found");
            }else{
                return productIndex;
            }
        }

        catch(error){
            console.log(error);
        }
        
    }

    deleteProduct = async (idProduct) => {
        try{
            let products = await this.getProducts();

            const productFilter = products.filter(product => product.id !== idProduct);

            products = productFilter;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return(products);
        }

        catch(error){
            console.log(error);
        }
    }

    updateProduct = async (idProduct,price) =>{
        try{
            let products = await this.getProducts();

            const productFind = products.find( (product) => product.id === idProduct);

            if(productFind){
                products[productFind].price += price;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return(products);
        }
        catch(error){
            console.log(error);
        }
    }
}
