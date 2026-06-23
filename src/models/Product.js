import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      lowercase: true,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock count"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      default: "no-image.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;