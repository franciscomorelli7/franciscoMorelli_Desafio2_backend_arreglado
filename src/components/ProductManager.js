import {promises as fs} from "fs"

export default class ProductManager{
    constructor(){
        this.path = "./products.json"
       
    }
    
    
//Agregar productos al array
    addProducts = async(title, description, price, thumbnail, code, stock) =>{
        let productosExistente = [];
        try {
            const data = await fs.readFile(this.path, "utf-8");
            productosExistente = JSON.parse(data);
        } catch (error) {
            console.log("error")
        }

        const productoExistente = productosExistente.find(prod => prod.code === code);
        const newId = productosExistente.length > 0 ? Math.max(...productosExistente.map(prod => prod.id)) + 1 : 1;
        let nuevoProducto ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: newId
        }

        if (productoExistente) {
            console.log("Ya existe un producto con el mismo código. No se puede agregar el producto duplicado.");
            return;
        } else{
            productosExistente.push(nuevoProducto)
            await fs.writeFile(this.path, JSON.stringify(productosExistente))
            console.log("Producto Agregado")
        }
    
        
    }

    readProducts = async() =>{
        let verProductos = await fs.readFile(this.path, "utf-8")
        return JSON.parse(verProductos)
    }
    //Ver productos
    getProducts = async() =>{
       let verProductos = await fs.readFile(this.path, "utf-8")
        console.log(JSON.parse(verProductos))

    }
    getElementById = async(id)=>{
        let verId = await fs.readFile(this.path, "utf-8")
        let pasarObjeto = JSON.parse(verId)
       let buscador = pasarObjeto.find(prod=> prod.id === id)
       if(buscador){
            console.log(buscador)
       }else{
        console.log("Not found")
       }
    }

    updateProducts = async({id,...producto}) =>{
        await this.deleteProduct(id)
        let productoViejo = await fs.readFile(this.path, "utf-8")
        let productoViejoObjeto = JSON.parse(productoViejo)
        let productoModificado = [{...producto,id},...productoViejoObjeto]
        await fs.writeFile(this.path, JSON.stringify(productoModificado))
    }

    deleteProduct = async(id)=>{
        let eliminarProducto = await fs.readFile(this.path, "utf-8")
        let pasarObjeto2 = JSON.parse(eliminarProducto)
        let filtrarProducto = pasarObjeto2.filter(prod=> prod.id !=id)
        await fs.writeFile(this.path, JSON.stringify(filtrarProducto))
        console.log("Producto Eliminado")
    }
}

// const productos = new ProductManager

//
//productos.addProducts("camiseta1", "descripcion", 10000, "imagen1", "sl1", 10)
//productos.addProducts("short", "descripcion2", 5000, "imagen2", "sl2", 5) 
//productos.addProducts("gorro", "descripcion3", 3000, "imagen3", "sl3", 3) 
//productos.addProducts("gorro2", "descripcion32", 30002, "imagen32", "sl4", 32)
//productos.addProducts("gorro22", "descripcion322", 300022, "imagen322", "sl5", 322)
//productos.addProducts("gorro23", "descripcion323", 300023, "imagen323", "sl6", 323)
//productos.addProducts("camiseta10", "descripcion10", 11000, "imagen10", "sl7", 16)
//productos.addProducts("camiseta11", "descripcion11", 12000, "imagen11", "sl8", 15)
//productos.addProducts("camiseta12", "descripcion12", 13000, "imagen12", "sl9", 13)
//productos.addProducts("camiseta13", "descripcion13", 14000, "imagen13", "sl10", 13)
//productos.addProducts("camiseta14", "descripcion14", 15000, "imagen14", "sl11", 12)
//productos.addProducts("camiseta15", "descripcion15", 16000, "imagen15", "sl12", 11)
// productos.getElementById(2)

