const express = require("express");
const itemRoute = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemFn");
const verifyToken = require('../middlewares/verfyToken')
itemRoute.get("/item",/*verifyToken,*/ getAllItems);
itemRoute.get("/item/:id", getItem);
itemRoute.post("/item" ,createItem);
itemRoute.delete("/item/:id",/* verifyToken,*/deleteItem);
itemRoute.put("/item/:id", /*verifyToken,*/updateItem);

module.exports = itemRoute;
