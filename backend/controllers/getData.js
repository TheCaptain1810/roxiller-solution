const axios = require("axios");
const mongoose = require("mongoose");
const ProductTransaction = require("../models/productTransaction");

async function fetchAndSaveData() {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;

    // Clear existing data (optional)
    await ProductTransaction.deleteMany({});

    // Insert new data
    await ProductTransaction.insertMany(data);

    console.log("Data successfully saved to MongoDB");
  } catch (error) {
    console.error("Error fetching or saving data:", error);
  }
}

module.exports = fetchAndSaveData;
