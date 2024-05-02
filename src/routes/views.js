import { Router } from "express";
import ProductManager from "../dao/ProductManagerMemory.js";
import { productoModelo } from "../dao/models/productsModelo.js";

const router = Router();

// router.get('/', (req, res) => {
//     const p = new ProductManager()
//     const productos = p.getProducts()
//     return res.render('home', {productos})
// })

router.get("/", async(req, res) => {
    const productos = await productoModelo.find().lean();
    return res.render('home', {productos})
})

router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts')
})

router.get("/chat", (req, res) => {
    return res.render('chat')
})

export default router;