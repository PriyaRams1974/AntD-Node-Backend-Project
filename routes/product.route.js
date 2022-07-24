const router = require('express').Router();
const ProductSchema = require("../models/product.model");
// add Item api for admin
router.post('/addProduct',async(req,res)=>{
    try{
        let detail = req.body
        const data = new ProductSchema(detail);
        const result = await data.save();
        return res.status(200).json({'status': 'success', "message": "Item details added successfully", "result": result})
    }catch(error){
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})
    }
});

// get all Item api for user
router.get("/getAllProducts", async(req,res)=>{
    try{
        const ProductsDetails = await ProductSchema.find().exec();
        if(ProductsDetails.length > 0){
            return res.status(200).json({'status': 'success', message: "Product details fetched successfully", 'result': ProductsDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "No Item details available"})
        }
    }catch(error){
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})
    }
});

module.exports = router;