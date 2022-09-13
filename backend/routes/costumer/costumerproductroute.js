const express = require('express');
const productsmodel = require('../../models/productsmodel');
const router = express.Router();



router.get("/get-all-products-bycat/:catid", async (req, res) => {

    const categoryid = req.params.catid;

    try {

        const result = await productsmodel.find({ categoryid: categoryid });

        res.send(result)

    } catch (error) {
        console.log("search by category error" + error);
        res.send("something bad happend")
    }



});



module.exports = router;