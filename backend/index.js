const express = require('express');
const app = express();
const portno = "4000";
const connectDB = require("./db/connectdb");
const costumerauth = require("./routes/costumer/authroute");
const adminauthroute = require("./routes/admin/adminauth");
const categoryroutes = require("./routes/admin/categories");
const productsroute = require("./routes/admin/productsroute");
const costumerproduct = require("./routes/costumer/costumerproductroute");
const cartroute = require("./routes/costumer/cartroute")

const cors = require('cors');



app.use(express.json());
app.use(cors())

connectDB();

// admin routes
app.use(adminauthroute);
app.use(categoryroutes);
app.use(productsroute);

//coustemrroutes
app.use(costumerauth);
app.use(costumerproduct);
app.use(cartroute);

app.listen(portno, () => {
    console.log("App is runing on port " + portno);
})

