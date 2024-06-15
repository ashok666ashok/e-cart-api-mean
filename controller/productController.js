import products from "../Model/productModel.js";


const getAllProducts=async(req,res)=>{
    try {
        const result=await products.find();
        res.status(200).json(result);
        
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

const getProduct=async(req,res)=>{
    const {id}=req.params
    try {
        const result=await products.findOne({id})
        res.status(200).json(result)
    } catch (error) {
        res.status(406).json({error:error.message})
    }
}
export {getAllProducts,getProduct}
