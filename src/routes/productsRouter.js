import { Router } from "express";
import ProductManager from "../dao/ProductManagerMemory.js";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../dao/ProductManagerMongo.js";




const router = Router();

router.get("/",getProducts)

// router.get("/", (req, res) => {
//   const { limit } = req.query;
//   const p = new ProductManager();
//   return res.json({ Productos: p.getProducts(limit) });
// });

// router.get("/:pid", (req, res) => {
//   const { pid } = req.params;
//   const p = new ProductManager();
//   return res.json({ Producto: p.getProductById(Number(pid)) });
// });

router.get("/:pid",getProductById)

// router.post("/", (req, res) => {
//     // const {title, description, price, thumbnails, code, stock, category, status} = req.body;
//     const p = new ProductManager();
//     const result = p.addProduct({...req.body});
//     // const result = p.addProduct(title, description, price, thumbnails, code, stock, category, status);
//     return res.json({result});
// })

router.post("/", addProduct)

// router.put("/:pid", (req, res) => {
//     const {pid} = req.params;
//     const p = new ProductManager();
//     const result = p.updateProduct(Number(pid), req.body);
//     return res.json({result});
// })
router.put("/:pid", updateProduct)

// router.delete("/:pid", (req, res) => {
//     const {pid} = req.params;
//     const p = new ProductManager();
//     const result = p.deleteProduct(Number(pid));
//     return res.json({result});
// })

router.delete("/:pid", deleteProduct)

export default router;
