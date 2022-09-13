const jwt = require("jsonwebtoken");
const jwt_secret = "thisis@secret";

const getCoustmer = (req, res, next) => {

    try {

        const token = req.header("auth-token");
    
        if (!token) {
            res.send("please provide Auth token")
        }
        const data = jwt.verify( token ,jwt_secret);
        
        
        req.coustmer=data.coustmer.id;

        next();

    } catch (error) {
        console.log("in auth tokn middleware " +error);
        res.send("Please provide a valid auth token")

    }

 




}
module.exports=getCoustmer;