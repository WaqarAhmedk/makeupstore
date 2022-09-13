const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const adminmodel = require("../../models/adminmodel");
const getAdmin = require("../../middlewares/getadmin");





//jwt secret key 
const jwt_secret = "thisis@adminsecret";




//Signup Route  Without auth required
router.post("/admin/signup",
    //validating request 
    [
        body("name").notEmpty().withMessage("name should not be empty"),
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

            //checking if the admin already exists in db 
            let admin = await adminmodel.findOne({ email: req.body.email });
            if (admin != null) {
                return res.status(400).json({ error: "email already in use" });
            }
            admin = await adminmodel.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: securepassword,

                }
            );
            res.send("admin Account is Created");
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Some Error occured in the app" })
        }
    });

//Login Route Without auth
router.post("/admin/login",
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
            let admin = await adminmodel.findOne({ email });
            if (!admin) {
                return res.status(400).send("Please provide correct Credentials");
            }
            const comparepassword = await bcrypt.compare(password, admin.password);
            //error if password doesnot match 
            if (!comparepassword) {
                return res.status(500).send("Please prvide correct credentials");
            }
            const data = {
                admin: {
                    id: admin.id,
                }
            }
            const AuthToken = jwt.sign(data, jwt_secret);
            res.json({ success: true, data: AuthToken });
        } catch (error) {
            return res.status(500).send("Some internal eroro" + error)
        }
    });

// Route for Getting logged in admin details - Login - Required

router.get("/getadmin",
    //middleware to fetch admin details with the help of token
    getAdmin,
    async (req, res) => {

        try {
            const adminid = req.admin;

            const admin = await adminmodel.findById(adminid).select("-password");
            if (!admin) {
                return res.send("No admin is found against this token");

            }
            else {
                res.send(admin);
            }

        } catch (error) {
            console.error(error);
            res.send("Some internal eroro" + error)
        }
    });

module.exports = router;