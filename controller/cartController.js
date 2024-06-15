import cartItems from "../Model/cartModel.js";

const addToCartController=async (req,res)=>{
    const {id,title,price,image,quantity}=req.body
    const userId=req.payload;
    try {
        const existingProduct=await cartItems.findOne({id,userId});
        if(existingProduct){
            existingProduct.quantity+=1;
            existingProduct.totalPrice=existingProduct.price*existingProduct.quantity;
            await existingProduct.save();
            res.status(200).json("items added successfully")
        }else{
            const newProduct=new cartItems({
                id,title,price,image,quantity,totalPrice:price,userId
            })
            await newProduct.save();
            res.status(200).json("item added successfully")
        }
    } catch (error) {
        res.status(401).json(error)

    }

}

const getCartController=async (req,res)=>{
    const userId=req.payload;
    try{
        const allProduct=await cartItems.find({userId})
        res.status(200).json(allProduct)
    }catch(err){
        res.status(406).json(allProduct)
    }
}

const removeCartController=async(req,res)=>{
    const {id}=req.params;
    try {
        await cartItems.findByIdAndDelete({_id:id})
        res.status(200).json('product removed from cart')
        
    } catch (error) {
        res.status(406).json(error)
    }
}

const incrementProductController=async(req,res)=>{
    const {id}=req.params;
    try {
        const selectedProduct=await cartItems.findOne({_id:id})
        selectedProduct.quantity+=1;
        selectedProduct.totalPrice=selectedProduct.price*selectedProduct.quantity;
        await selectedProduct.save()
    res.status(200).json(selectedProduct)
        
    } catch (error) {
        res.status(406).json(error)
    }
}

const decrementProductController=async(req,res)=>{
    const {id}=req.params;
    try {
        const selectedProduct=await cartItems.findOne({_id:id})
        if(selectedProduct.quantity===1){
            res.status(400).json('you cant decrement quantity anymore')
        }else{
                  selectedProduct.quantity-=1;
        selectedProduct.totalPrice=selectedProduct.price*selectedProduct.quantity;
        await selectedProduct.save()
    res.status(200).json(selectedProduct)
        }
  
        
    } catch (error) {
        res.status(406).json(error)
    }
}

const cartTotalPriceController=async(req,res)=>{
    const userId=req.payload;
    // let total=0;
    try {
        const result=await cartItems.find({userId})
        // total+=result.totalPrice
        res.status(200).json(result)
        
    } catch (error) {
        res.status(404).json(error)
    }
}



export {addToCartController,getCartController ,removeCartController,incrementProductController,decrementProductController,cartTotalPriceController}