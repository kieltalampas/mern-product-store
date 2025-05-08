import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch (error) {
        return res.status(500).json({message: 'Error fetching products'});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({message: 'Please fill all the fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, product: newProduct});
    }
    catch (error) {
        return res.status(500).json({message: 'Error creating product'});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false, message: 'Invalid product ID'});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, product: updatedProduct});
    }
    catch (error) {
        return res.status(500).json({message: 'Error updating product'});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});

    }
    catch (error) {
        return res.status(500).json({message: 'Error deleting product'});
    }

}