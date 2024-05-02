import { request, response } from "express";
import { productoModelo } from "./models/productsModelo.js";

export const getProducts= async (req = request, res = response) => {    
        try {
            const { limit } = req.query;
            const productos = await productoModelo.find().limit(Number(limit))
            const total = await productoModelo.countDocuments();
            return  res.json({ total, productos })
        } catch (error) {
            console.log('getProducts -> ', error);
            return res.status(500).json({msg:'Hablar con un administrador'})
        }
}


export const getProductById = async (req = request, res = response) => {
        try {
            const {pid} = req.params;
            const producto = await productoModelo.findById(pid);
            if(!producto){
                return  res.status(404).json({ msg:`Producto con id ${pid} no existe`})
            }
            return  res.json({ producto })
        } catch (error) {
            console.log('getProductById -> ', error);
            return res.status(500).json({msg:'Hablar con un administrador'})
        }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const {title, description, price, thumbnails, code, stock, category, status} = req.body;
        
        if(!title, !description, !code, !price, !stock, !category){
            return res.status(404).json({msg:'Los campos [title, description, ccode, price, stock, category] son obligatorios'})
        }
        const producto = await productoModelo.create({title, description, price, thumbnails, code, stock, category, status});
        
        return res.json({producto});
    } catch (error) {
        console.log('addProduct -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const producto = await productoModelo.findByIdAndDelete(pid);
        if(producto){
            return res.json({msg:'Producto eliminado', producto})
        }
        return res.status(404).json({msg: `No se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const { id, ...rest} = req.body;
        const producto = await productoModelo.findByIdAndUpdate(pid, {...rest}, {new:true});
        if(producto){
            return res.json({msg:'Producto Actualizado', producto})
        }
        return res.status(404).json({msg: `No se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        console.log('updateProduct -> ', error);
        return res.status(500).json({msg:'Hablar con un administrador'})
    }
}