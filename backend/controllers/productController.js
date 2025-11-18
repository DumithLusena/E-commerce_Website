import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller, bestseller } = req.body;

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const images = [image1, image2, image3, image4].filter(Boolean);

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        const imageUrls = await Promise.all(
            images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        let parsedSizes = [];
        if (Array.isArray(sizes)) {
            parsedSizes = sizes;
        } else if (typeof sizes === 'string' && sizes.trim()) {
            try { parsedSizes = JSON.parse(sizes); } catch { parsedSizes = []; }
        }
        const bestSellerFlag = (bestSeller === 'true' || bestSeller === true) || (bestseller === 'true' || bestseller === true);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestSeller: bestSellerFlag,
            image: imageUrls,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added", product: productData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // if GET, use req.query.productId
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };




