const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

dotenv.config();
app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Kết nối cơ sở dữ liệu 
mongoose.connect(process.env.MONGO_URL);

const adminRoute = require("./routes/admin.route");
const apiRoute = require("./routes/api.route");
const rootRoute = require("./routes/root.route");
const mapRoute = require("./routes/map.route");
const productRoute = require("./routes/product.route");
const typeRoute = require("./routes/type.route");


app.use("/admin", adminRoute);

app.use("/api", apiRoute);

app.use("/map", mapRoute);

app.use("/product", productRoute);

app.use("/type", typeRoute);

app.get("/", rootRoute);

app.get("*", (req, res) => {
	res.send("Not found");
});

app.listen(PORT, () => {
	console.log(`App is running at PORT ${PORT}`);
});
