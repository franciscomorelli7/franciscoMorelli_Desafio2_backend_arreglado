import express from "express"
import ProductManager from "./components/ProductManager.js"
import {promises as fs} from "fs"

const app= express()
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager

const leerProductos = productos.readProducts()

app.get("/products", async (req, resp)=>{
    let limit = parseInt(req.query.limit)
    if (!limit){
        return resp.send(await leerProductos)
    }else{
        let todosLosProductos = await leerProductos
    let productLimit = todosLosProductos.slice(0, limit)
    resp.send(productLimit)
    }
    
}) 
app.get("/products/:id", async (req, resp)=>{
    let id = parseInt(req.params.id)
    let todosLosProductos = await leerProductos
    let getProductById = todosLosProductos.find(prod => prod.id === id)
    resp.send(getProductById)
})

const puerto= 2010
const server = app.listen(puerto, ()=>{
    console.log(`Express by local host ${server.address().port}`)
})

server.on("error",(error)=>{
    console.log((`Error del servidor ${error}`))
})