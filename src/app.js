import express from "express"
import ProductManager from "./components/ProductManager.js"
import {promises as fs} from "fs"

const app= express()
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager

const leerProductos = productos.readProducts()

app.get("/products", async (req, resp)=>{
    let limit = parseInt(req.query.limit)
    resp.send(await leerProductos)
}) 

const puerto= 2010
const server = app.listen(puerto, ()=>{
    console.log(`Express by local host ${server.address().port}`)
})

server.on("error",(error)=>{
    console.log((`Error del servidor ${error}`))
})