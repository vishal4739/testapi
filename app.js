const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connection of mongoDb//
mongoose
  .connect("mongodb://localhost:27017/Sample")
  .then(() => {
    console.log("connected to mongoDB sever");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware//
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
//middleware//

//schema for mongoDb//
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

//schema for mongoDb//

//model for mongoDb//
const productModel = new mongoose.model("Product", productSchema);

// Api to create product//
app.post("/api/v1/product/new", async (req, res) => {
  const product = await productModel.create(req.body);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//model for mongoDb//
//API to get all products//  // Read Product//




//API to get all products//  // Read Product//
app.get("/api/v1/product", async (req, res) => {
  const product = await productModel.find();
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product
  });
});



//search by id //
app.get("/api/v1/product/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});


//search by name//
app.get("/api/v1/product/:name", async (req, res) => {
  const productName = req.params.name;
  const product = await productModel.findOne({ name: productName });

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//API to get all products//  // Read Product//


//API to update user products //
app.put("/api/v1/product/:id", async (req, res) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
      product
    });
  }
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({ success: true, product });
});
//API to update user products //


//API to delete a product//

app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.deleteOne();
  res.status(200).json({ uccess: true, message: "Product is no longer available", product });
});

//API to delete a product//



//server start//
app.listen(8005, () => {
  console.log("server started");
});
//server start//
