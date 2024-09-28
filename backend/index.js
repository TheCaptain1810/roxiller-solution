const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const fetchAndSaveData = require("./controllers/getData");
const ProductTransaction = require("./models/productTransaction");
const app = express();
const port = 3000;
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

let mongourl = process.env.Mongo_URI;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
    // Fetch and save data after successful connection
    fetchAndSaveData();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API Endpoints
app.get("/api/statistics", async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2022-${month}-01T00:00:00.000Z`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const totalSaleAmount = await ProductTransaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: true,
    });

    const totalNotSoldItems = await ProductTransaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics" });
  }
});

app.get("/api/bar-chart", async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2022-${month}-01T00:00:00.000Z`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await ProductTransaction.countDocuments({
          dateOfSale: { $gte: startDate, $lte: endDate },
          price: { $gte: range.min, $lt: range.max },
        });
        return {
          range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
          count,
        };
      })
    );

    res.json(barChartData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bar chart data" });
  }
});

app.get("/api/pie-chart", async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2022-${month}-01T00:00:00.000Z`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const pieChartData = await ProductTransaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
    ]);

    res.json(pieChartData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching pie chart data" });
  }
});

app.get("/api/combined-data", async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2022-${month}-01T00:00:00.000Z`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    }).sort({ dateOfSale: 1 });

    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching combined data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
