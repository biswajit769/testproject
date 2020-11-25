import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from '../models/userModel.js';
import { isAdmin, isAuth } from "../utils.js";
import atob from "atob";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    //const products = await Product.find({});
    //res.send(products);
    //const category = req.query.category ? { pcategoryids: [req.query.category] } : {};
    let selfhost = {}
    if(req.query.user){
      const user = await User.findOne({ _id: req.query.user });
      selfhost = (user && user.isAdmin)?{}:(user && user.isHost)?{ hostuserid: req.query.user }:{};
    }
    //const eventuser = { hostuserid : req.user._id };
    const parentcategory = req.query.parentcategory
      ? { pcategoryids: { $in: [req.query.parentcategory] } }
      : {};
    let dateRange = {}
    if(req.query.searchDate){
      if(req.query.searchDate==='today'){
        dateRange = {hdate: {$eq: new Date().toISOString()}}
      }
    }
    //const price = req.query.searchPrice?{}
    let priceQuery = {};
    if(req.query.searchPrice){
      if(req.query.searchPrice=='free'){
        priceQuery = {price:{$in:["",'0']}}
      }else{
        priceQuery = {price:{$nin:["",'0']}}
      }
    }
    const category = req.query.category
    ? { ecategoryids: { $in: [atob(req.query.category)] } }
    : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === "lowest"
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };

    /*const products = await Product.find({
      ...category,
      ...parentcategory,
      ...searchKeyword,
      ...selfhost
    }).sort(sortOrder);*/
    const products = await Product.find({
      ...category,
      ...parentcategory,
      ...searchKeyword,
      ...selfhost,
      ...dateRange,
      ...priceQuery
    });
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample event name " + Date.now(),
      image: "/images/p1.jpg",
      price: 1,
      category: "sample category",
      brand: "sample brand",
      countInStock: 10,
      avalabilityCounter : 10,
      rating: 0,
      numReviews: 0,
      description: "sample description",
      shortdescription: "sample short description",
      hdate: new Date(),
      pcategory: [
        { id: 1, value: "upcoming", isChecked: false },
        { id: 2, value: "new", isChecked: true },
        { id: 3, value: "top user picks", isChecked: false },
      ],
      ecategory: [
        { id: 1, value: "Education & Family", isChecked: false },
        { id: 2, value: "Entertainment & Visual Arts", isChecked: false },
        { id: 3, value: "Food & Drink", isChecked: false },
        { id: 4, value: "Fitness & Health", isChecked: false },
        { id: 5, value: "Home & Lifestyle", isChecked: false },
        { id: 6, value: "Community & Spirituality", isChecked: false },
        { id: 7, value: "Other", isChecked: false },
      ],
      ecategoryids: [],
      pcategoryids: [],
      hostname: req.user.name,
      hostuserid: req.user._id,
      pageaction: "add",
      ticketCancellationPolicy: "Refunds up to 1 hour before the event starts",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.avalabilityCounter = req.body.avalabilityCounter;
      product.description = req.body.description;
      product.shortdescription = req.body.shortdescription;
      product.hdate = req.body.hdate;
      product.pcategory = req.body.pcategory;
      product.ecategory = req.body.ecategory;
      product.ecategoryids = req.body.ecategoryids;
      product.pcategoryids = req.body.pcategoryids;
      product.hostname = req.body.hostname;
      product.hostuserid = req.body.hostuserid;
      product.pageaction = req.body.pageaction;
      product.ticketCancellationPolicy = req.body.ticketCancellationPolicy;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Event Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);


productRouter.post(
  '/updateunit',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.product);
    if (product) {
      const quantity = req.body.qty;
      product.avalabilityCounter = (product.avalabilityCounter-quantity);
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    }else{
      res.status(404).send({ message: "Event Not Found" });
    }
  })
);

export default productRouter;
