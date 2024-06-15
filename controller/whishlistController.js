import whishlist from "../Model/whishlistModel.js";

const addToWhishlist = async (req, res) => {
  const { id, title, price, description, category, image, rating } = req.body;
  const userId = req.payload;
  try {
    const existingProduct = await whishlist.findOne({ id, userId });
    if (existingProduct) {
      res.status(406).json("product already added....");
    } else {
      const newProduct = new whishlist({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        userId,
      });
      const result = await newProduct.save();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// get
const getWhislist = async (req, res) => {
  const  userId  = req.payload;
  try {
    const result = await whishlist.find({ userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// remove item

const removeItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await whishlist.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(406).json({ error: error.message });
  }
};
export { addToWhishlist, getWhislist, removeItem };
