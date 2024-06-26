import { request, response } from "express";
import { cartModelo } from "./models/cartsModelo.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const {cid} = req.params;
        const carrito = await cartModelo.findById(cid)
        if(carrito){
            return res.json({carrito})
        }
        return res.status(404).json({msg:`El carrito con id ${cid} no existe` });
    } catch (error) {
        console.log('getCartById -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}

export const createCart = async (req = request, res = response) => {
    try {
       const carrito = await cartModelo.create({})
       return res.json({msg:'Carrito creado', carrito})
    } catch (error) {
        console.log('createCart -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}

export const addProductInCart = async (req = request, res = response) => {
    try {
        const {cid, pid} = req.params;
        const carrito = await cartModelo.findById(cid);
        if(!carrito){
            return res.status(404).json({msg:`El carrito con id ${cid} no existe`})
        }
        const productoInCart = carrito.products.find(p=>p.id.toString() === pid);
        if(productoInCart){
            productoInCart.quantity ++;
        }else{
            carrito.products.push({id:pid, quantity: 1})
        }
        carrito.save();

        return res.json({msg:'Carrito actualizado!', carrito});
    } catch (error) {
        console.log('addProductInCart -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}