const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const coustmermodel = require("../../models/cotumermodel");
const getCoustmer = require("../../middlewares/getcoustmer");
const pendingcoustmermodel = require("../../models/pendingcoustmers");
const { logRoles } = require("@testing-library/react");
const getAdmin = require("../../middlewares/getadmin");





//jwt secret key 
const jwt_secret = "thisis@secret";




//Signup Route  Without auth required
router.post("/signup",
    //validating request 
    [
        body("name").notEmpty().withMessage("name should not be empty"),
        body("phno").notEmpty().withMessage("Phone number  should not be empty"),

        body("email").notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Email is not correct"),
        body("password").isLength({ min: 5 }).withMessage("Password must be greater then 5 characters"),

    ],
    async (req, res) => {
        //checking for validation errors
        const verrors = validationResult(req);

        if (!verrors.isEmpty()) {
            return res.json(verrors);
        }
        try {

            //using bcrypt for password hashing and salt
            const salt = await bcrypt.genSalt(11);
            const securepassword = await bcrypt.hash(req.body.password, salt);

            //checking if the coustmer already exists in db 
            let coustmer = await coustmermodel.findOne({ email: req.body.email });
            let pending = await pendingcoustmermodel.findOne({ email: req.body.email });
            if (pending != null) {
                return res.json({ error: "Your account is pending for approval from the admin" });
            }
            if (coustmer != null) {
                return res.json({ error: "email already in use" });
            }
            coustmer = await pendingcoustmermodel.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    phno: req.body.phno,
                    password: securepassword,

                }
            );
            res.json({
                success: true,
                data: coustmer,
            })
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Some Error occured in the app" })
        }
    });

//Login Route Without auth
router.post("/login",
    //validating incoming request
    [
        body("email").notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Email is not correct"),
        body("password").notEmpty().withMessage("Please enter your password"),
    ],

    async (req, res) => {
        //object destructring

        const { email, password } = req.body;
        const verrors = validationResult(req);
        if (!verrors.isEmpty()) {
            return res.json(verrors);
        }
        try {
            let coustmer = await coustmermodel.findOne({ email });
            if (!coustmer) {
                return res.send({
                    success: false,
                    msg: "Please provide correct Credentials",
                });
            }
            const comparepassword = await bcrypt.compare(password, coustmer.password);
            //error if password doesnot match 
            if (!comparepassword) {
                return res.send({
                    success: false,
                    msg: "Please provide correct Credentials",
                });
            }
            const data = {
                coustmer: {
                    id: coustmer.id,
                }
            }
            const AuthToken = jwt.sign(data, jwt_secret);
            const studentid = coustmer.id;
            res.json({ success: true, data: AuthToken });
        } catch (error) {
            console.log("error is " + error);
            return res.send("Some internal eroro" + error)
        }
    });

// Route for Getting logged in coustmer details - Login - Required
router.get("/getcoustmer",
    //middleware to fetch coustmer details with the help of token
    getCoustmer,
    async (req, res) => {

        try {
            const coustmerid = req.coustmer;

            const coustmer = await coustmermodel.findById(coustmerid).select("-password");
            if (!coustmer) {
                return res.send("No coustmer is found against this token");

            }
            res.send(coustmer);

        } catch (error) {
            console.error(error);
            return res.status(500).send("Some internal eroro" + error)
        }
    });

//admin to get user by id
router.get("/getcoustmer/:id",
    //middleware to fetch coustmer details with the help of token
    getAdmin,
    async (req, res) => {

        try {
            const userid = req.params.id;

            const coustmer = await coustmermodel.findById(userid).select("-password");
            if (!coustmer) {
                return res.send("No coustmer is found against this token");

            }
            res.send(coustmer);

        } catch (error) {
            console.error(error);
            return res.status(500).send("Some internal eroro" + error)
        }
    });


//  from here pending user apis
router.get("/approve-coustmer/:id", getAdmin, async (req, res) => {
    const id = req.params.id;

    try {
        const coustmer = await pendingcoustmermodel.findById(id);
        if (!coustmer) {
            console.log("no coustmer found for this id");
        }
        const result = await coustmermodel.create({
            name: coustmer.name,
            email: coustmer.email,
            password: coustmer.password,
            phno: coustmer.phno,

        });
        await pendingcoustmermodel.findByIdAndDelete(coustmer.id);
        res.send("Coustmer Request accepted");



    } catch (error) {
        console.error(error);
        return res.status(500).send("Some internal eroro" + error)
    }
});

router.delete("/reject-coustmer/:id", getAdmin, async (req, res) => {
    const id = req.params.id;

    try {
        const coustmer = await pendingcoustmermodel.findById(id);
        if (!coustmer) {
            console.log("no coustmer found for this id");
        }

        await pendingcoustmermodel.findByIdAndDelete(coustmer.id);
        res.send("Coustmer Request Rejected");



    } catch (error) {
        console.error(error);
        return res.status(500).send("Some internal eroro" + error)
    }
});


router.get("/get-all-pending-coustmers", getAdmin,
    async (req, res) => {

        try {


            const result = await pendingcoustmermodel.find().select("-password");
            res.send(result)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Some internal eroro" + error)
        }
    });

router.get("/get-all-coustmers", getAdmin,
    async (req, res) => {

        try {


            const result = await coustmermodel.find().select("-password");
            res.send(result)

        } catch (error) {
            console.error(error);
            return res.status(500).send("Some internal eroro" + error)
        }
    });

// till here




module.exports = router;