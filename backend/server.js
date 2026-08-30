require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const quoteRoutes = require("./routes/quote.routes");

//middleware
var corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
const { sequelize } = require("./models");
if (process.env.NODE_ENV !== "production") {
  sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("failed to connect db:", err));
}

//route
app.use("/quotes", quoteRoutes);

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Berjalan Di Port ${PORT}`);
});
