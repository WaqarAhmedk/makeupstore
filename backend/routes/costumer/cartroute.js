const express = require("express");
const getCoustmer = require("../../middlewares/getcoustmer");
const cartmodel = require("../../models/cartmodel");
const pendingordermodel = require("../../models/pendingordersmodel");
const router = express.Router();
const productsmodel = require('../../models/productsmodel');
const { body, validationResult } = require("express-validator");
const getAdmin = require("../../middlewares/getadmin");




router.get("/add-to-cart/:pid", getCoustmer, async (req, res) => {
    const productid = req.params.pid;
    const userid = req.coustmer;



    try {

        const product = await productsmodel.findById(productid);


        if (product.available <= 0) {
            return res.json({
                success: false,
                msg: "Product out of stock"
            })
        }

        // checking if the product is already in the cart

        const cartproduct = await cartmodel.findOne({ productid: productid });
        console.log(cartproduct);
        if (!cartproduct) {
            await cartmodel.create({
                categoryid: product.categoryid,
                userid: userid,
                name: product.name,
                img: product.img,
                productid: product._id,
                desc: product.desc,
                price: product.price,
                quantity: 1,
                totalprice: product.price,
            });

        } else {

            await cartmodel.findByIdAndUpdate(cartproduct._id, {
                totalprice: cartproduct.totalprice + cartproduct.price,
                quantity: cartproduct.quantity + 1,
            });

        }

        await productsmodel.findByIdAndUpdate(productid, {
            available: product.available - 1,
            sold: product.sold + 1,
        });

        res.json({
            success: true,
            msg: "Congrats !  Product is Added to CART.."
        })





    }
    catch (error) {
        console.log("error is " + error);
        return res.send("Some internal eroro" + error)
    }



});


router.get("/get-cart-items", getCoustmer, async (req, res) => {

    const userid = req.coustmer;
    try {
        const cartitem = await cartmodel.find({ userid: userid })
        let grandtotal = 0;
        cartitem.map((item) => {

            grandtotal = grandtotal + item.totalprice;

        })
        res.send({
            cartitems: cartitem,
            grandtotal: grandtotal,
        });
    } catch (error) {
        console.log("error is " + error);
        return res.send("Some internal eroro" + error)
    }
});


// checkout route

router.post("/create-pending",
    [
        body("name").notEmpty().withMessage("Name should not be empty"),
        body("contact").notEmpty().withMessage("Please enter your Contact number"),
        body("address").notEmpty().withMessage("Please enter your Address"),
        body("grandtotal").notEmpty().withMessage("grand total cannot be empty"),


    ], getCoustmer, async (req, res) => {
        const verrors = validationResult(req);
        if (!verrors.isEmpty()) {
            return res.send(verrors)
        }
        const userid = req.coustmer;

        const { name, contact, address, grandtotal } = req.body;

        try {

            const data = await cartmodel.find({ userid: userid });
            console.log(data);

            if (data.length <= 0) {
                return res.send({
                    success: false,
                    msg: "No item found in cart for this user"
                })
            }
            const products = [];

            data.map((item, index) => {
                products.push({
                    productid: item.productid,
                    quantity: item.quantity,
                });

            })

            pendingordermodel.create({
                userid: userid,
                name: name,
                contact: contact,
                address: address,
                grandtotal: grandtotal,
                products: products,
            });

            await cartmodel.deleteMany({ userid: userid });

            res.send({
                success: true,
                msg: "Your Order is placed and waiting for approval from admin"
            })



        }
        catch (error) {
            console.log("error is " + error);
            return res.send("Some internal eroro" + error)
        }












    });

router.get("/get-all-pending-orders", getAdmin, async (req, res) => {
    try {

        const data = await pendingordermodel.find({status:"pending"});
        res.send(data)


    } catch (error) {
        console.log("error is " + error);
        return res.send("Some internal eroro" + error)
    }
});
router.get("/get-all-approved-orders", getAdmin, async (req, res) => {
    try {

        const data = await pendingordermodel.find({status:"approved"});
        res.send(data)


    } catch (error) {
        console.log("error is " + error);
        return res.send("Some internal eroro" + error)
    }
});

router.get("/approve-pending-order/:id", getAdmin, async (req, res) => {
    const id = req.params.id;
    try {

        await pendingordermodel.findByIdAndUpdate(id, { status: "approved" });

        res.send({
            success: true,
            msg: "Order is Approved",
        });

    } catch (error) {
        console.log("error is " + error);
        return res.send("Some internal eroro" + error)
    }
});

module.exports = router;