import mongoose, { mongo, Schema } from "mongoose";

const ProductsSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  stock: Number,
});
const Product = mongoose.model("Product", ProductsSchema);
export default Product;
