const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const getAdmin = require('../../middlewares/getadmin');
const upload = require('../../middlewares/multer/imagemiddleware');
const categorymodel = require('../../models/categorymodel');
const productsmodel = require('../../models/productsmodel');
const topcategorymodel = require('../../models/topcategoriesmodel');


router.post("/create-category",

    upload.single("img"),
    body("name").notEmpty().withMessage("Category Name should be procided"),
    getAdmin,
    async (req, res) => {



        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors);
        }
        try {

            await categorymodel.create({
                name: req.body.name,
                img: req.file.filename,
            });
            res.json({
                success: true,
                msg: "Category created",
            });

        } catch (error) {
            console.log("category create error" + error);
            res.json({
                success: false,
                msg: error
            })

        }

    });


router.post("/update-category/:id", upload.single("img"), async (req, res) => {

    const id = req.params.id;
    console.log(id);
    try {

        if (req.file == undefined) {
            await categorymodel.findByIdAndUpdate(id, { name: req.body.name });
            res.json({ succes: true, msg: "Record updated" })

        } else {
            await categorymodel.findByIdAndUpdate(id, { name: req.body.name, img: req.file.filename });
            res.json({ succes: true, msg: "Record updated" })

        }


    } catch (error) {

    }


});

router.delete("/delete-category/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Ss");
    try {


        await productsmodel.deleteMany({ categoryid: id });



        await categorymodel.findByIdAndDelete(id);
        res.json({
            success: true,
            msg: "item deleted succesfully"
        })

    } catch (error) {

    }



});


router.get("/get-all-categories", async (req, res) => {
    try {

        const categories = await categorymodel.find();
        res.json(categories);

    } catch (error) {

    }
});

router.get("/get-category/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await categorymodel.findById(id);
        res.json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log(error);

    }



});


//Top Categories routes

router.get("/create-top-categories/:id", async (req, res) => {

    const catid = req.params.id;
    console.log(catid);

    try {
        const total = await topcategorymodel.find();

        if (total.length <= 4) {
            const data = await categorymodel.findById(catid);

            if (!data) {
                return res.send({
                    success: false,
                    msg: "no Category found against this id"
                });
            }
            else {
                const item = await topcategorymodel.findOne({ categoryid: catid });

                if (!item) {


                    await topcategorymodel.create({
                        categoryid: data._id,
                        img: data.img,
                        name: data.name,

                    });

                    res.send({
                        success: true,
                        msg: "Category is added as top Category"
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
                msg: "Already 4 prdoucts are in top products Remov some to add more"
            })
        }


    }

    catch (err) {
        console.error(err.message);
        return res.json({ error: "Some Error occured in the app" })
    }

});

router.get("/get-top-categories", async (req, res) => {

    try {
        const data = await topcategorymodel.find();
        res.send(data)

    } catch (err) {
        console.error(err.message);
        return res.json({ error: "Some Error occured in the app" })
    }

});


module.exports = router;