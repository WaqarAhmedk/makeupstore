const express = require('express');
const { body, validationResult } = require("express-validator");
const upload = require('../../middlewares/multer/imagemiddleware');
const categorymodel = require('../../models/categorymodel');
const productsmodel = require('../../models/productsmodel');
const topproductsmodel = require('../../models/toppredectsmodel');
const router = express.Router();

router.post("/create-product",
    upload.single("img"),
    //validating request 
    [
        body("name").notEmpty().withMessage("name should not be empty"),
        body("price").notEmpty().withMessage("Please provide price"),
        body("catid").notEmpty().withMessage("Please provide Category id"),
        body("total").notEmpty().withMessage("Please provide total itemavailable")


    ],

    async (req, res) => {


        const { name, catid, price, total, desc } = req.body;
        const filename = req.file.filename;

        //checking for validation errors
        const verrors = validationResult(req);

        if (!verrors.isEmpty()) {
            return res.json(verrors);
        }
        try {
            productsmodel.create({
                categoryid: catid,
                name: name,
                desc: desc,
                img: filename,
                price: price,
                total: total,
                available: total,
            });
            res.send("product created");

        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Some Error occured in the app" })
        }
    });


router.get("/get-all-products", async (req, res) => {
    let finalresult = [];
    try {

        const result = await productsmodel.find().populate("categoryid");
        res.send(result)












    } catch (error) {
        console.log("error" + error);
    }
});

router.post("/update-product/:id",
    upload.single("img"),
    //validating request 
    [
        body("name").notEmpty().withMessage("name should not be empty"),
        body("price").notEmpty().withMessage("Please provide price"),
        body("total").notEmpty().withMessage("Please provide total itemavailable")


    ],

    async (req, res) => {


        const { name, price, total, desc } = req.body;
        console.log(req.body);
        const id = req.params.id;
        if (req.file == undefined) {

            //checking for validation errors
            const verrors = validationResult(req);

            if (!verrors.isEmpty()) {
                return res.json(verrors);
            }
            try {
                await productsmodel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    desc: desc,
                    price: req.body.price,
                    total: req.body.total,
                })

                res.send("product updated");

            }
            catch (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Some Error occured in the app" })
            }


        } else {
            const filename = req.file.filename;

            //checking for validation errors
            const verrors = validationResult(req);

            if (!verrors.isEmpty()) {
                return res.json(verrors);
            }
            try {

                await productsmodel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    price: req.body.price,
                    desc: req.body.desc,
                    total: req.body.total,
                    img: filename,
                });
                res.send("updated")

            }
            catch (err) {
                console.error(err.message);
                return res.status(500).json({ error: "Some Error occured in the app" })
            }
        }


    });


router.get("/get-product/:id", async (req, res) => {
    const id = req.params.id;
    try {

        const result = await productsmodel.findById(id).populate("categoryid");
        console.log(result);
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log("error" + error);
    }
});


router.delete("/delete-product/:id", async (req, res) => {
    const id = req.params.id;
    try {

        await productsmodel.findByIdAndDelete(id);
        res.send("deleted");

    } catch (error) {

    }
})

//topprouct
router.get("/create-top-product/:id", async (req, res) => {
    const productid = req.params.id;
    console.log(productid);
    try {
        const total = await topproductsmodel.find();

        if (total.length <= 9) {
            const data = await productsmodel.findById(productid);
            console.log(data);
            if (!data) {
                return res.send({
                    success: false,
                    msg: "no Product found against this id"
                });
            }
            else {
                const item = await topproductsmodel.findOne({ productid: productid });

                if (!item) {


                    await topproductsmodel.create({
                        categoryid: data.id,
                        img: data.img,
                        name: data.name,
                        price: data.price,
                        productid: data._id,
                        desc: data.desc,
                    });

                    res.send({
                        success: true,
                        msg: "Item is added as top product"
                    });

                } else {
                    res.send({
                        success: false,
                        msg: "Product is alreay in top products list"
                    });

                }

            }


        } else {
            res.send({
                success: false,
                msg: "Already 9 prdoucts are in top products Remov some to add more"
            })
        }


    }

    catch (err) {
        console.error(err.message);
        return res.json({ error: "Some Error occured in the app" })
    }
});
router.delete("/delete-top-product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await topproductsmodel.findByIdAndDelete(id);
        res.send("Deeleted")

    }
    catch (err) { }
});


router.get("/get-all-topproducts", async (req, res) => {

    try {
        const products = await topproductsmodel.find();
        res.send(products)

    } catch (err) {
        console.error(err.message);
        return res.json({ error: "Some Error occured in the app" })
    }

});


module.exports = router;


