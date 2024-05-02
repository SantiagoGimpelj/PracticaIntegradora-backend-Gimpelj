import { Router } from "express";
import CartsManager from "../dao/CartManagerMemory.js";
import { addProductInCart, createCart, getCartById } from "../dao/CartManagerMongo.js";


const router = Router();

// router.get("/:cid", (req, res) => {
//     const {cid} = req.params;
//     const c = new CartsManager();
//     const result = c.getCartById(Number(cid));
//     return res.json({result});
// })

router.get("/:cid", getCartById)

// router.post("/", (req, res) => {
//     const c = new CartsManager();
//     const result = c.createCart();
//     return res.json({result});
// })

router.post("/", createCart)

// router.post("/:cid/product/:pid", (req, res) => {
//     const {cid, pid} = req.params;
//     const c = new CartsManager();
//     const result = c.addProductInCart(Number(cid), Number(pid));
//     return res.json({result});
// })

router.post("/:cid/product/:pid", addProductInCart)

export default router;
